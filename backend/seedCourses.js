const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "1.1.1.1",
]);

const mongoose = require("mongoose");
require("dotenv").config();

const Course = require("./models/Course");

const courses = [
  {
    title: "Operating Systems & Concurrency",
    department: "Computer Engineering",
    code: "CS301",
    type: "Offline",
    duration: "1 Semester",
    credits: "4 Credits",
    skills: ["Process Management", "Multithreading", "Linux", "C"],
    description:
      "Core concepts of operating systems including process scheduling, synchronization, deadlocks, and memory management.",
  },
  {
    title: "Full Stack Web Development",
    department: "Information Technology",
    code: "IT304",
    type: "Hybrid",
    duration: "1 Semester",
    credits: "4 Credits",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    description:
      "Design and develop responsive full-stack web applications using the MERN stack.",
  },
  {
    title: "8051 Microcontroller & Embedded Systems",
    department: "Electronics & Telecom",
    code: "EC205",
    type: "Offline",
    duration: "1 Semester",
    credits: "3 Credits",
    skills: ["8051 ALP", "Timers", "Interrupts", "Interfacing"],
    description:
      "Architecture, stack organization, assembly language programming, and hardware interfacing of microcontrollers.",
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected ✅");

    await Course.deleteMany();

    await Course.insertMany(courses);

    console.log("Courses added successfully 🎉");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);

    process.exit(1);
  }
};

seedDatabase();
