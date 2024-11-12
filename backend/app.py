import os
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS  
from pypdf import PdfReader
import json
from groq import Groq
# Setup Paths and FastAPI
sys.path.insert(0, os.path.abspath(os.getcwd()))

# Initialize Flask
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
client = Groq(
    api_key="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"
)
# Flask Routes for File Upload and Parsing
@app.route('/process', methods=['POST'])
def ats():
    doc = request.files['pdf_doc']

    # Read the file directly without saving to disk
    data = _read_file_from_memory(doc)
    parsed_data = parserfn(data)
    
    try:
        json_data = json.loads(parsed_data)
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        return jsonify({"error": "Failed to parse JSON data"}), 400
    
    return jsonify(json_data)

def _read_file_from_memory(file):
    reader = PdfReader(file)
    data = ""
    for page_no in range(len(reader.pages)):
        page = reader.pages[page_no]
        data += page.extract_text() or ""  # Avoid NoneType errors if text is missing
    return data

@app.route('/generate_cover_letter', methods=['POST'])
def cover_letter():
    doc = request.files['resume']  # Get resume file from the request

    # Read the file directly without saving to disk
    resume_text = _read_file_from_memory(doc)
    parsed_resume_data = parserfn(resume_text)
    
    try:
        resume_data = json.loads(parsed_resume_data)
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        return jsonify({"error": "Failed to parse resume data"}), 400

    # Collect form data for generating the cover letter
    applicant_name = request.form.get('applicantName')
    company_name = request.form.get('companyName')
    position = request.form.get('position')
    company_address = request.form.get('companyAddress', '')

    # Generate cover letter
    cover_letter_text = generate_cover_letter(applicant_name, company_name, position, company_address, resume_data)
    print("Cover Letter:", cover_letter_text)
    return jsonify({"coverLetter": cover_letter_text})
def parserfn(message):
    result = ''
    completion = client.chat.completions.create(
        model="llama3-70b-8192",
        messages=[
            {
                "role": "system",
                "content": "You are an AI bot designed to act as a professional for parsing resumes. You are given with resume and your job is to extract the following information from the resume:\\n    and return in the same json{'Name': '', 'Role':,'','Email':'', 'PhoneNumber': '', 'Location': '', 'GitHub': '', 'LinkedIn': '', 'CareerObjective': '', 'Education': [{'Institution': '', 'Year': '', 'Degree': '', 'Results': ''}], 'Projects': [{'ProjectName': '', 'Description': ''}, {'ProjectName': '', 'Description': ''}, {'ProjectName': '', 'Description': ''}], 'ProgrammingLanguages': [], 'WebTechnologies': [], 'ToolsandFrameworks': [], 'Databases': [], 'OtherSkills': [],'AreasOfInterest':[] ,'Hobbies': [], 'Achievements':[], 'Experience': [{'Position': '', 'Company': '', 'Location': '', 'Dates': '', 'Description': ''}], 'CareerLevel': '','Certifications':[],'LeadershipQualities':[]} Classify it in 4: Fresher who have 0 to 2 years of experience, Mid-level who have 2 to 7 years of experience, and Senior-level people who have more than 7 years of experience. Calculate experience from all years work experience ,Skills & Knowledge,Responsibilities and give only the level without years, which does not cut the career.If paper presented mentioned do not add them in projects .If skills are given, classify the skills according to the given fields. If paper presentation are given, fetch them correctly and add into Achievements dont add key like 'paperpresentations'. If any courses or certificates are mentioned, add them to certifications..If the information is not present ignore it and under any circumstances do not use any fake information or dummy information and only give the json formatted data as it will be used for  json decoding purposes in order to avoid syntax errors\nDont give any insights or \"here is the extracted information in JSON format\" or something like this\n and dont add any commas,double quotes,single quotes if it contains extra commas or double quotes or single quotes remove them and give corrected json format"},
            {
                "role": "user",
                "content": message
            }
        ],
        temperature=1,
        max_tokens=1024,
        top_p=1,
        stream=True,
        stop=None,
    )
    for chunk in completion:
        result += chunk.choices[0].delta.content or ""
    result = result.strip()
    result = result.replace("Here is the extracted information in JSON format:", "")
    print("Generated result:", result)
    try:
        result = result.replace("'", '"')
        result = result.replace('}"{', '}, {')
        result = result.replace('] [', '],[')
        result = result.replace('"\n"', '","')
        result = result.replace("I'm", "I am")
        result = result.replace("I\"m", "I am")
        print("Result after replacing single quotes and fixing formatting:", result)
        json_data = json.loads(result)
        return json.dumps(json_data, indent=4) 
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        error_position = e.pos if e.pos is not None else 0
        print("Problematic JSON segment:", result[max(0, error_position-100):error_position+100])
        return result
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return result
def generate_cover_letter(applicant_name, company_name, position, company_address, resume_data):
    # Extract individual fields from parsed resume data
    programming_languages = resume_data.get('ProgrammingLanguages', 'varied programming languages')
    web_technologies = resume_data.get('WebTechnologies', 'web technologies')
    tools_and_frameworks = resume_data.get('ToolsandFrameworks', 'tools and frameworks')
    databases = resume_data.get('Databases', 'databases')
    applicant_skills = f"{programming_languages}, {web_technologies}, {tools_and_frameworks}, {databases}"
    
    # Extract experience and other details
    applicant_experience = resume_data.get('Experience', 'relevant experience in the field')
    applicant_interest = resume_data.get('AreasOfInterest', 'varied interests in the field')

    # Define the prompt
    prompt = (
        f"Create a professional cover letter for an applicant named {applicant_name} applying for the {position} "
        f"position at {company_name}. The applicant has skills in {applicant_skills} and experience in {applicant_experience} "
        f"and has interests in {applicant_interest}. "
        f"Do not use placeholder text, and give only the body part without lines like 'Cover Letter:' or the applicant's name. or Here is a professional cover letter for Sree Varshine:"
    )
    
    if company_address:
        prompt += f" The company address is {company_address}."

    # Generate the cover letter
    completion = client.chat.completions.create(
        model="llama3-70b-8192",
        messages=[
            {"role": "system", "content": "You are an AI specialized in generating professional cover letters."},
            {"role": "user", "content": prompt}
        ],
        temperature=1,
        max_tokens=1024,
        top_p=1,
        stream=True,
        stop=None,
    )

    result = ""
    for chunk in completion:
        result += chunk.choices[0].delta.content or ""

    return result.strip()

# Run the application
if __name__ == "__main__":
    app.run(port=7000, debug=True)

