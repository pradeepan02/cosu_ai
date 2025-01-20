from groq import Groq

client = Groq(api_key="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")

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
