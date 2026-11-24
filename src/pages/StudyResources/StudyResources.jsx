import { useNavigate } from "react-router-dom";
import "./StudyResources.css";

function StudyResources() {
  const navigate = useNavigate();

  const topics = [
    ["💻", "Operating Systems", "Revise processes, threads, and scheduling."],
    ["🔌", "8051 Microcontroller", "Study ALP, stack, timers, and subroutines."],
    ["🤖", "Industrial Robotics", "Prepare kinematics, sensors, and drives."],
    ["📡", "Wireless Communication", "Learn cell splitting and repeaters."],
    ["📄", "Exam Writing Tips", "Structure 10-mark answers with diagrams."],
    ["🎯", "Practical & Viva Prep", "Prepare lab experiments with confidence."],
  ];

  const handleLearning = (title) => {
    navigate(`/study/${encodeURIComponent(title)}`);
  };

  return (
    <main className="study-page">
      <div className="simple-header">
        <span>ACADEMIC GROWTH</span>
        <h1>Study & Exam Preparation</h1>
        <p>Build strong conceptual clarity for semester exams and practicals.</p>
      </div>

      <div className="study-grid">
        {topics.map(([icon, title, description]) => (
          <div className="study-card" key={title}>
            <div>{icon}</div>
            <h2>{title}</h2>
            <p>{description}</p>
            <button onClick={() => handleLearning(title)}>
              Start Learning →
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default StudyResources;
