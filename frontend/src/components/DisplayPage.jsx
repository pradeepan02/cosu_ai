import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DisplayPage.module.css'; // Import the enhanced CSS module
import Sidebar from './Sidebar';
import Layout from './Layout';

const DisplayPage = ({ resumeData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => ({
    PersonalDetails: {
      Name: resumeData?.Name || '',
      Email: resumeData?.Email || '',
      PhoneNumber: resumeData?.PhoneNumber || '',
      GitHub: resumeData?.GitHub || '',
      LinkedIn: resumeData?.LinkedIn || '',
      Role: resumeData?.Role || '',
    },
    CareerObjective: resumeData?.CareerObjective || '',
    CareerLevel: resumeData?.CareerLevel || '',
    Skills: {
      ProgrammingLanguages: Array.isArray(resumeData?.ProgrammingLanguages) ? resumeData.ProgrammingLanguages : resumeData?.ProgrammingLanguages ? [resumeData.ProgrammingLanguages] : [],
      WebTechnologies: Array.isArray(resumeData?.WebTechnologies) ? resumeData.WebTechnologies : resumeData?.WebTechnologies ? [resumeData.WebTechnologies] : [],
      OtherSkills: Array.isArray(resumeData?.OtherSkills) ? resumeData.OtherSkills : resumeData?.OtherSkills ? [resumeData.OtherSkills] : [],
      ToolsandFrameworks: Array.isArray(resumeData?.ToolsandFrameworks) ? resumeData.ToolsandFrameworks : resumeData?.ToolsandFrameworks ? [resumeData.ToolsandFrameworks] : [],
      Databases: Array.isArray(resumeData?.Databases) ? resumeData.Databases : resumeData?.Databases ? [resumeData.Databases] : [],
      AreasOfInterest: resumeData?.AreasOfInterest || [],
      LeadershipQualities: resumeData?.LeadershipQualities || []
    },
    Education: resumeData?.Education || [],
    Projects: resumeData?.Projects || [],
    Experience: resumeData?.Experience || [],
    Achievements: resumeData?.Achievements ? Object.values(resumeData.Achievements) : [],
    Certifications: resumeData?.Certifications || [],
  }));

  const [currentSection, setCurrentSection] = useState(0);
  const [newAchievement, setNewAchievement] = useState('');
  const [newCertification, setNewCertification] = useState('');
  const [newEducation, setNewEducation] = useState({
    Institution: '',
    Year: '',
    Degree: '',
    Results: '',
  });
  const [newProject, setNewProject] = useState({
    ProjectName: '',
    Description: '',
  });
  const [newExperience, setNewExperience] = useState({
    Position: '',
    Company: '',
    Location: '',
    Dates: '',
    Description: '',
  });

  useEffect(() => {
    // Optionally, handle side effects here, such as updating the resume
  }, [formData]);

  const handleChange = (e, field) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleInputChange = (e, field, section, index = null) => {
    const value = e.target.value;
    setFormData((prevData) => {
        // If section is an array (like Experience, Projects), we handle it differently.
        if (Array.isArray(prevData[section])) {
            const updatedSection = [...prevData[section]];
            updatedSection[index] = {
                ...updatedSection[index],
                [field]: value,
            };
            return {
                ...prevData,
                [section]: updatedSection,
            };
        } else {
            // If section is an object (like PersonalDetails), we can update it directly.
            return {
                ...prevData,
                [section]: {
                    ...prevData[section],
                    [field]: value,
                },
            };
        }
    });
};

const handleGenerateResume = () => {
  navigate('/template-selector', { state: { formData } });
};
  const handleAddAchievement = () => {
    if (newAchievement.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        Achievements: [...prevData.Achievements, newAchievement],
      }));
      setNewAchievement('');
    }
  };

  const handleRemoveAchievement = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      Achievements: prevData.Achievements.filter((_, i) => i !== index),
    }));
  };

  const handleAddCertification = () => {
    if (newCertification.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        Certifications: [...prevData.Certifications, newCertification],
      }));
      setNewCertification('');
    }
  };

  const handleRemoveCertification = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      Certifications: prevData.Certifications.filter((_, i) => i !== index),
    }));
  };

  const handleAddEducation = () => {
    if (Object.values(newEducation).every((field) => field.trim())) {
      setFormData((prevData) => ({
        ...prevData,
        Education: [...prevData.Education, newEducation],
      }));
      setNewEducation({ Institution: '', Year: '', Degree: '', Results: '' });
    }
  };

  const handleRemoveEducation = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      Education: prevData.Education.filter((_, i) => i !== index),
    }));
  };

  const handleAddProject = () => {
    if (newProject.ProjectName.trim() && newProject.Description.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        Projects: [...prevData.Projects, newProject],
      }));
      setNewProject({ ProjectName: '', Description: '' });
    }
  };

  const handleRemoveProject = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      Projects: prevData.Projects.filter((_, i) => i !== index),
    }));
  };

  const handleAddExperience = () => {
    if (Object.values(newExperience).every((field) => field.trim())) {
      setFormData((prevData) => ({
        ...prevData,
        Experience: [...prevData.Experience, newExperience],
      }));
      setNewExperience({ Position: '', Company: '', Location: '', Dates: '', Description: '' });
    }
  };

  const handleRemoveExperience = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      Experience: prevData.Experience.filter((_, i) => i !== index),
    }));
  };

  const sections = [
    {
      title: 'Personal Details',
      content: (
          <div className={styles.formSection}>
              <h2 className={styles.displayPageSubHeader}>Personal Details</h2>
              {['Name', 'Email', 'PhoneNumber', 'GitHub', 'LinkedIn', 'Role'].map(field => (
                  <p className={styles.displayPageParagraph} key={field}>
                      <strong>{field}:</strong>
                      <input
                          type={field === 'Email' ? 'email' : 'text'}
                          className={styles.displayPageInput}
                          value={formData.PersonalDetails[field]}
                          onChange={(e) => handleInputChange(e, field, 'PersonalDetails')}
                          placeholder={`Enter your ${field.toLowerCase()}`}
                          style={{ width: "300px" }}
                      />
                  </p>
              ))}
          </div>
      ),
  },
    {
      title: 'Career Objectives and Level',
      content: (
        <section className={styles.formSection}>
          <h2 className={styles.displayPageSubHeader}>Career Objectives and Level</h2>
          <p className={styles.displayPageParagraph}>
            <strong>Career Objective:</strong>
            <textarea
              className={styles.displayPageTextarea}
              value={formData.CareerObjective}
              onChange={(e) => handleChange(e, 'CareerObjective')}
              placeholder="Enter your career objective"
              style={{ width: "300px" }}
            />
          </p>
          <p className={styles.displayPageParagraph}>
            <strong>Career Level:</strong>
            <input
              type="text"
              className={styles.displayPageInput}
              value={formData.CareerLevel}
              onChange={(e) => handleChange(e, 'CareerLevel')}
              placeholder="Enter your career level"
              style={{ width: "300px" }}
            />
          </p>
          
        </section>
      ),
    },
    {
      title: 'Skills',
      content: (
        <section className={styles.formSection}>
          <h2 className={styles.displayPageSubHeader}>Skills</h2>
          {Object.keys(formData.Skills).map((field) => (
            <p className={styles.displayPageParagraph} key={field}>
              <strong>{field.replace(/([A-Z])/g, ' $1')}:</strong>
              <input
                type="text"
                className={styles.displayPageInput}
                value={formData.Skills[field]}
                onChange={(e) => handleChange(e, `Skills.${field}`)}
                placeholder={`Enter your ${field.toLowerCase()}`}
                style={{ width: "300px" }}
              />
            </p>
          ))}
        </section>
      ),
    },
    {
      title: 'Education and Projects',
      content: (
        <section className={styles.formSection}>
          <h2 className={styles.displayPageSubHeader}>Education</h2>
          {formData.Education.map((edu, index) => (
            <div key={index} className={styles.dynamicSection}>
              {['Institution', 'Year', 'Degree', 'Results'].map((field) => (
                <p className={styles.displayPageParagraph} key={field}>
                  <strong>{field}:</strong>
                  <input
                    type="text"
                    className={styles.displayPageInput}
                    value={edu[field]}
                    onChange={(e) => handleInputChange(e, field, 'Education', index)}
                    placeholder={`Enter ${field.toLowerCase()}`}
                  />
                </p>
              ))}
              <button 
                className={styles.displayPageButton} 
                onClick={() => handleRemoveEducation(index)} 
                style={{ width: "300px" }}
              >
                Remove Education
              </button>
            </div>
          ))}
    
          {/* New Education Input Fields */}
          <div className={styles.dynamicSection}>
            {['Institution', 'Year', 'Degree', 'Results'].map((field) => (
              <p className={styles.displayPageParagraph} key={field}>
                <strong>{field}:</strong>
                <input
                  type="text"
                  className={styles.displayPageInput}
                  value={newEducation[field]}
                  onChange={(e) => setNewEducation({ ...newEducation, [field]: e.target.value })}
                  placeholder={`Enter ${field.toLowerCase()}`}
                />
              </p>
            ))}
          </div>
    
          {/* Add Education Button */}
          <button 
            className={styles.displayPageButton} 
            onClick={handleAddEducation} 
            style={{ width: "300px" }}
          >
            Add Education
          </button>
    
          <h2 className={styles.displayPageSubHeader}>Projects</h2>
          {formData.Projects.map((proj, index) => (
            <div key={index} className={styles.dynamicSection}>
              <p className={styles.displayPageParagraph}>
                <strong>Project Name:</strong>
                <input
                  type="text"
                  className={styles.displayPageInput}
                  value={proj.ProjectName}
                  onChange={(e) => handleInputChange(e, 'ProjectName', 'Projects', index)}
                  placeholder="Enter project name"
                />
              </p>
              <p className={styles.displayPageParagraph}>
                <strong>Description:</strong>
                <textarea
                  className={styles.displayPageTextarea}
                  value={proj.Description}
                  onChange={(e) => handleInputChange(e, 'Description', 'Projects', index)}
                  placeholder="Enter project description"
                />
              </p>
              <button 
                className={styles.displayPageButton} 
                onClick={() => handleRemoveProject(index)} 
                style={{ width: "300px" }}
              >
                Remove Project
              </button>
            </div>
          ))}
    
          {/* New Project Input Fields */}
          <div className={styles.dynamicSection}>
            <p className={styles.displayPageParagraph}>
              <strong>Project Name:</strong>
              <input
                type="text"
                className={styles.displayPageInput}
                value={newProject.ProjectName}
                onChange={(e) => setNewProject({ ...newProject, ProjectName: e.target.value })}
                placeholder="Enter project name"
              />
            </p>
            <p className={styles.displayPageParagraph}>
              <strong>Description:</strong>
              <textarea
                className={styles.displayPageTextarea}
                value={newProject.Description}
                onChange={(e) => setNewProject({ ...newProject, Description: e.target.value })}
                placeholder="Enter project description"
              />
            </p>
          </div>
    
          {/* Add Project Button */}
          <button 
            className={styles.displayPageButton} 
            onClick={handleAddProject} 
            style={{ width: "300px" }}
          >
            Add Project
          </button>
        </section>
      ),
    },
    
    {
      title: 'Achievements',
      content: (
        <section className={styles.formSection}>
          <h2 className={styles.displayPageSubHeader}>Achievements</h2>
          {formData.Achievements.map((achievement, index) => (
            <div key={index} className={styles.dynamicSection}>
              <p className={styles.displayPageParagraph}>
                <strong>{achievement}</strong>
                <button 
                  className={styles.displayPageButton} 
                  onClick={() => handleRemoveAchievement(index)} 
                  style={{ width: "300px" }}
                >
                  Remove Achievement
                </button>
              </p>
            </div>
          ))}
          
          {/* New Achievement Input Field */}
          <div className={styles.dynamicSection}>
            <input
              type="text"
              className={styles.displayPageInput}
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              placeholder="Enter achievement"
            />
          </div>
    
          {/* Add Achievement Button */}
          <button 
            className={styles.displayPageButton} 
            onClick={handleAddAchievement} 
            style={{ width: "300px" }}
          >
            Add Achievement
          </button>
        </section>
      ),
    },
    
    {
      title: 'Certifications',
      content: (
        <section className={styles.formSection}>
          <h2 className={styles.displayPageSubHeader}>Certifications</h2>
          {formData.Certifications.map((certification, index) => (
            <p className={styles.displayPageParagraph} key={index}>
              <strong>{certification}</strong>
              <button
                className={styles.displayPageButton}
                onClick={() => handleRemoveCertification(index)}
                style={{ width: "300px" }}
              >
                Remove Certification
              </button>
            </p>
          ))}
          
          {/* New Certification Input Fields */}
          <div className={styles.dynamicSection}>
            <input
              type="text"
              className={styles.displayPageInput}
              value={newCertification}
              onChange={(e) => setNewCertification(e.target.value)}
              placeholder="Add new certification"
            />
          </div>
          <button
            className={styles.displayPageButton}
            onClick={handleAddCertification}
            style={{ width: "300px" }}
          >
            Add Certification
          </button>
        </section>
      ),
    },
    {
      title: 'Certifications',
      content: (
        <section className={styles.formSection}>
          <h2 className={styles.displayPageSubHeader}>Certifications</h2>
          {formData.Certifications.map((certification, index) => (
            <p className={styles.displayPageParagraph} key={index}>
              <strong>{certification}</strong>
              <button
                className={styles.displayPageButton}
                onClick={() => handleRemoveCertification(index)}
                style={{ width: "300px" }}
              >
                Remove Certification
              </button>
            </p>
          ))}
          
          {/* New Certification Input Fields */}
          <div className={styles.dynamicSection}>
            <input
              type="text"
              className={styles.displayPageInput}
              value={newCertification}
              onChange={(e) => setNewCertification(e.target.value)}
              placeholder="Add certification"
            />
          </div>
          <button
            className={styles.displayPageButton}
            onClick={handleAddCertification}
            style={{ width: "300px" }}
          >
            Add Certification
          </button>
        </section>
      ),
    },
        
  ];

  return (
    <Layout>
      
  <div className={styles.back}>
    <div className={styles.displayPageSidebar}>
    <Sidebar currentStep={currentSection + 1} totalSteps={sections.length} />
    </div>
    <div className={styles.displayPageContent}>
      <div className={styles.displayPageSection}>
          {sections[currentSection].content}
        </div>
        <div className={styles.displayPageNavigation}>
          <button
            className={styles.displayPageButton}
            disabled={currentSection === 0}
            onClick={() => setCurrentSection((prev) => prev - 1)}
          >
            Previous
          </button>
          <button
            className={styles.displayPageButton}
            disabled={currentSection === sections.length - 1}
            onClick={() => setCurrentSection((prev) => prev + 1)}
          >
            Next
          </button>
          <button
            className={styles.displayPageButton}
            disabled={currentSection!==sections.length-1}
            onClick={handleGenerateResume}
          >
            Generate Resume
          </button>
        </div>
        </div>
        </div>
      
      </Layout>
  );
};

export default DisplayPage;