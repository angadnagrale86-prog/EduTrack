import "./AcademicRecords.css";

function AcademicRecords() {
  return (
    <main className="resume-page">
      <div className="simple-header">
        <span>STUDENT DOCUMENTS</span>
        <h1>Academic Records & Marksheets</h1>
        <p>Upload and manage your semester marksheets and certificates.</p>
      </div>

      <div className="resume-card">
        <div className="upload-icon">📄</div>
        <h2>Upload Academic Document</h2>
        <p>PDF, DOC or DOCX files up to 5MB.</p>

        <input type="file" accept=".pdf,.doc,.docx" />

        <div className="current-resume">
          <div>
            <strong>Semester_Marksheet.pdf</strong>
            <p>Uploaded recently</p>
          </div>

          <button>Download</button>
        </div>
      </div>
    </main>
  );
}

export default AcademicRecords;
