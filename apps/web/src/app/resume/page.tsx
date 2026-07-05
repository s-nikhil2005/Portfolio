"use client";

import * as React from "react";

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="page-wrapper">
      <style>{`
        .page-wrapper {
          background-color: #f4f4f5;
          min-height: 100vh;
          font-family: "Times New Roman", Times, Baskerville, Georgia, serif;
          color: #111111;
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Top control bar */
        .control-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 800px;
          margin-bottom: 20px;
          padding: 12px 24px;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          box-sizing: border-box;
        }
        .back-link {
          color: #555555;
          text-decoration: none;
          font-size: 0.9rem;
          font-family: system-ui, -apple-system, sans-serif;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
        }
        .back-link:hover {
          color: #111111;
        }
        .print-btn {
          background: #50b484;
          color: #ffffff;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 2px 4px rgba(80, 180, 132, 0.2);
        }
        .print-btn:hover {
          background: #409b6f;
        }

        /* A4 document layout */
        .resume-container {
          background: #ffffff;
          width: 100%;
          max-width: 800px;
          padding: 50px 60px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border-radius: 4px;
          box-sizing: border-box;
          line-height: 1.45;
        }

        /* Resume Content Styling */
        header {
          text-align: center;
          margin-bottom: 24px;
        }
        h1 {
          font-size: 2.2rem;
          margin: 0 0 6px 0;
          font-weight: normal;
          letter-spacing: 0.5px;
        }
        .contact-info {
          font-size: 0.95rem;
          margin: 4px 0;
          color: #333333;
        }
        .contact-links {
          font-size: 0.95rem;
          margin: 4px 0;
        }
        .contact-links a {
          color: #111111;
          text-decoration: underline;
          margin: 0 4px;
        }

        section {
          margin-bottom: 20px;
        }
        h2 {
          font-size: 1.05rem;
          font-weight: bold;
          text-transform: uppercase;
          margin: 20px 0 6px 0;
          border-bottom: 1.2px solid #111111;
          padding-bottom: 2px;
          letter-spacing: 0.8px;
        }
        
        .section-item {
          margin-bottom: 12px;
        }
        .item-header {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
          font-size: 0.98rem;
          margin-bottom: 3px;
        }
        .item-date {
          font-weight: normal;
        }
        .item-subtitle {
          font-style: italic;
          color: #444444;
          margin-bottom: 6px;
        }
        
        p.objective {
          font-size: 0.98rem;
          margin: 0;
          text-align: justify;
        }

        ul {
          margin: 0 0 8px 0;
          padding-left: 20px;
        }
        li {
          font-size: 0.96rem;
          margin-bottom: 4px;
          text-align: justify;
        }
        
        .skills-list {
          font-size: 0.96rem;
          margin: 0;
        }
        .skills-list strong {
          font-weight: bold;
        }

        /* Print Override */
        @media print {
          .no-print {
            display: none !important;
          }
          .page-wrapper {
            background: #ffffff !important;
            padding: 0 !important;
            min-height: auto !important;
          }
          .resume-container {
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
          }
        }

        @media (max-width: 640px) {
          .resume-container {
            padding: 30px 24px;
          }
          .item-header {
            flex-direction: column;
            gap: 2px;
          }
          .item-date {
            font-size: 0.9rem;
            color: #555555;
          }
        }
      `}</style>

      {/* Control bar */}
      <div className="control-bar no-print">
        <a href="/" className="back-link">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Portfolio
        </a>
        <button onClick={handlePrint} className="print-btn">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          Print / Save PDF
        </button>
      </div>

      {/* Printable Resume Container */}
      <main className="resume-container">
        <header>
          <h1>Nikhil Singh</h1>
          <div className="contact-info">+91 91374 78067 | Mumbai, India</div>
          <div className="contact-links">
            <a href="mailto:nikhilsingh76666@gmail.com">
              nikhilsingh76666@gmail.com
            </a>{" "}
            |
            <a
              href="https://www.linkedin.com/in/nikhil-singh-580845284/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>{" "}
            |
            <a
              href="https://github.com/s-nikhil2005"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>{" "}
            |
            <a
              href="https://leetcode.com/u/Nikhil_Singh2005/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LeetCode
            </a>
          </div>
        </header>

        <section>
          <h2>Career Objective</h2>
          <p className="objective">
            Full-Stack Developer skilled in MERN Stack with a strong foundation
            in Data Structures and Algorithms. Interested in building scalable
            web applications, solving real-world problems, and continuously
            improving problem-solving and development skills.
          </p>
        </section>

        <section>
          <h2>Education</h2>
          <div className="section-item">
            <div className="item-header">
              <span>Bachelor of Science (B.Sc.) in Information Technology</span>
              <span className="item-date">2023 – 2026</span>
            </div>
            <div className="item-subtitle">University of Mumbai</div>
            <ul>
              <li>Cumulative Grade Point Average (CGPA): 8.70</li>
            </ul>
          </div>
          <div className="section-item" style={{ marginTop: "10px" }}>
            <div className="item-header">
              <span>Higher Secondary Certificate (HSC)</span>
              <span className="item-date">2021 – 2023</span>
            </div>
            <div className="item-subtitle">Maharashtra State Board</div>
          </div>
        </section>

        <section>
          <h2>Technical Skills</h2>
          <div
            className="skills-list"
            style={{ display: "flex", flexDirection: "column", gap: "6px" }}
          >
            <div>
              <strong>Programming Languages:</strong> C++, JavaScript,
              TypeScript
            </div>
            <div>
              <strong>Frontend:</strong> HTML, CSS, React.js, Redux, Tailwind
              CSS
            </div>
            <div>
              <strong>Backend:</strong> Node.js, Express.js
            </div>
            <div>
              <strong>Databases:</strong> MongoDB, MySQL, Redis
            </div>
            <div>
              <strong>Tools & Technologies:</strong> Git, GitHub, Postman,
              Docker, VS Code
            </div>
            <div>
              <strong>Core Concepts:</strong> Data Structures & Algorithms,
              Object-Oriented Programming, REST APIs, JWT Authentication, MVC
              Architecture
            </div>
          </div>
        </section>

        <section>
          <h2>Projects</h2>
          <div className="section-item">
            <div className="item-header">
              <span>Voys – Travel Booking Platform | MERN Stack</span>
              <span className="item-date">2026</span>
            </div>
            <ul>
              <li>
                Built a full-stack travel booking system with authentication,
                package browsing, booking management, and reviews.
              </li>
              <li>
                Implemented JWT-based authentication and role-based access
                control.
              </li>
              <li>
                Designed modular REST APIs and structured MongoDB database
                schemas ensuring data integrity.
              </li>
              <li>
                Integrated frontend and backend using Axios for seamless user
                experience.
              </li>
            </ul>
          </div>
          <div className="section-item">
            <div className="item-header">
              <span>
                StudyLoop – Peer-to-Peer Learning Platform | MERN Stack
              </span>
              <span className="item-date">2026 – Ongoing</span>
            </div>
            <ul>
              <li>
                Developing a peer-to-peer collaboration platform for skill
                exchange and academic interaction.
              </li>
              <li>
                Designed structured dashboards for "Skills I Know" and "Skills I
                Want to Learn."
              </li>
              <li>
                Implementing secure authentication and scalable backend APIs for
                future real-time features.
              </li>
              <li>
                Focused on modular architecture and reusable React components.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2>Activities</h2>
          <ul>
            <li>
              Junior Developer, Coding Club – Backend contributor, mentored
              juniors, participated in coding contests.
            </li>
          </ul>
        </section>

        <section>
          <h2>Hobbies</h2>
          <ul>
            <li>Reading about technology and startup culture</li>
            <li>Video editing and content creation</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
