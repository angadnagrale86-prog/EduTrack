import { Link, useParams } from "react-router-dom";
import "./StudyTopic.css";

function StudyTopic() {
  const { topic } = useParams();

  const topicData = {
    "Operating Systems": {
      icon: "💻",
      title: "Operating Systems",
      description: "Core concepts for university exams and practicals.",
      sections: [
        {
          title: "Key Topics",
          items: [
            "Process Management and PCB",
            "Multithreading Models",
            "CPU Scheduling Algorithms",
            "Deadlock Prevention & Avoidance",
            "Paging and Virtual Memory",
          ],
        },
        {
          title: "Important Exam Questions",
          items: [
            "Explain process state transition diagram.",
            "Compare user-level and kernel-level threads.",
            "Explain fork() and exec() system calls.",
          ],
        },
      ],
    },
    "8051 Microcontroller": {
      icon: "🔌",
      title: "8051 Microcontroller",
      description: "Architecture, stack, and assembly programming.",
      sections: [
        {
          title: "Key Topics",
          items: [
            "Stack & Stack Pointer (SP)",
            "PUSH and POP Instructions",
            "ACALL, LCALL, and RET",
            "DJNZ Loop Control & Delay Generation",
          ],
        },
        {
          title: "Important Exam Questions",
          items: [
            "Explain the role of Stack Pointer during CALL and RET.",
            "Write an ALP to generate a time delay using nested loops.",
          ],
        },
      ],
    },
    "Industrial Robotics": {
      icon: "🤖",
      title: "Industrial Robotics",
      description: "Robot anatomy, kinematics, and economic analysis.",
      sections: [
        {
          title: "Key Topics",
          items: [
            "Cartesian, Cylindrical, Polar & Articulated Robots",
            "Forward and Inverse Kinematics",
            "2-DOF and 3-DOF Planar Manipulators",
            "Payback Period and ROI Analysis",
          ],
        },
        {
          title: "Important Exam Questions",
          items: [
            "Derive forward kinematics for a 2-DOF planar manipulator.",
            "Compare pneumatic, hydraulic, and electric drives.",
          ],
        },
      ],
    },
    "Wireless Communication": {
      icon: "📡",
      title: "Wireless Communication",
      description: "Cellular concepts and network capacity expansion.",
      sections: [
        {
          title: "Key Topics",
          items: [
            "Frequency Reuse and Co-channel Interference",
            "Cell Splitting Mechanics",
            "Repeater Isolation and Coverage",
          ],
        },
        {
          title: "Important Exam Questions",
          items: [
            "Explain how cell splitting increases system capacity.",
            "Discuss repeater isolation techniques.",
          ],
        },
      ],
    },
    "Exam Writing Tips": {
      icon: "📄",
      title: "Exam Writing Tips",
      description: "How to score high in university theory exams.",
      sections: [
        {
          title: "Answer Structure",
          items: [
            "Start with a clear definition",
            "Draw neat labeled block diagrams",
            "Write step-by-step derivations",
            "Conclude with advantages and applications",
          ],
        },
      ],
    },
    "Practical & Viva Prep": {
      icon: "🎯",
      title: "Practical & Viva Prep",
      description: "Checklist for lab submissions and oral exams.",
      sections: [
        {
          title: "Checklist",
          items: [
            "Complete and certify lab journals on time",
            "Understand algorithm logic and edge cases",
            "Revise basic definitions for viva questions",
          ],
        },
      ],
    },
  };

  const data = topicData[topic];

  if (!data) {
    return (
      <main className="study-topic-page">
        <div className="study-topic-card">
          <h1>Topic Not Found</h1>
          <p>This study topic does not exist.</p>
          <Link to="/study" className="back-study-btn">
            ← Back to Study Preparation
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="study-topic-page">
      <div className="study-topic-header">
        <div className="study-topic-icon">{data.icon}</div>
        <span>STUDY PREPARATION</span>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
      </div>

      <div className="study-topic-content">
        {data.sections.map((section) => (
          <section className="learning-section" key={section.title}>
            <h2>{section.title}</h2>
            <ul>
              {section.items.map((item) => (
                <li key={item}>
                  <span>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="study-topic-footer">
        <Link to="/study" className="back-study-btn">
          ← Back to Study Preparation
        </Link>
      </div>
    </main>
  );
}

export default StudyTopic;
