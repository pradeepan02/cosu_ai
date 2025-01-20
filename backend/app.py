import os
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import Flask-CORS
from resumeparsermain import parserfn
from coverletter import generate_cover_letter
from pypdf import PdfReader
import json

# Setup Paths and FastAPI
sys.path.insert(0, os.path.abspath(os.getcwd()))
UPLOAD_PATH = "__DATA__"  # Ensure this path exists

# Initialize Flask
flask_app = Flask(__name__)
CORS(flask_app)  # Enable CORS for all routes

@flask_app.route('/')
def home():
    return "Welcome to the resume parser and cover letter generator!"
# Flask Routes for File Upload and Parsing
@flask_app.route('/process', methods=['POST'])
def ats():
    doc = request.files['pdf_doc']
    os.makedirs(UPLOAD_PATH, exist_ok=True)
    file_path = os.path.join(UPLOAD_PATH, "file.pdf")
    doc.save(file_path)
    
    data = _read_file_from_path(file_path)
    parsed_data = parserfn(data)
    
    try:
        json_data = json.loads(parsed_data)
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        return jsonify({"error": "Failed to parse JSON data"}), 400
    
    return jsonify(json_data)

def _read_file_from_path(path):
    reader = PdfReader(path)
    data = ""
    for page_no in range(len(reader.pages)):
        page = reader.pages[page_no]
        data += page.extract_text() or ""  # Avoid NoneType errors if text is missing
    return data

@flask_app.route('/generate_cover_letter', methods=['POST'])
def cover_letter():
    doc = request.files['resume']  # Get resume file from the request
    os.makedirs(UPLOAD_PATH, exist_ok=True)
    file_path = os.path.join(UPLOAD_PATH, "resume.pdf")
    doc.save(file_path)
    
    resume_text = _read_file_from_path(file_path)
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

# Run the applications
if __name__ == "__main__":
    flask_app.run(debug=True)
