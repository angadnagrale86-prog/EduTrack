import "./Contact.css";

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been submitted to the Academic Office.");
  };

  return (
    <main className="contact-page">
      <div className="contact-header">
        <span>GET IN TOUCH</span>
        <h1>Contact Academic Office</h1>
        <p>Have a question about enrollment or records? Reach out to us.</p>
      </div>

      <div className="contact-layout">
        <div className="contact-info">
          <h2>Student Support Desk</h2>
          <p>
            Whether you need help with course registration or profile records,
            feel free to contact our administrative team.
          </p>

          <div>
            <strong>Email</strong>
            <p>support@edutrack.edu</p>
          </div>

          <div>
            <strong>Location</strong>
            <p>Nagpur, Maharashtra, India</p>
          </div>

          <div>
            <strong>Office Hours</strong>
            <p>Monday - Friday (10 AM - 5 PM)</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input placeholder="Enter your name" required />

          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Subject</label>
          <input placeholder="Enter subject" required />

          <label>Message</label>
          <textarea rows="5" placeholder="Write your message..." required />

          <button>Send Message</button>
        </form>
      </div>
    </main>
  );
}

export default Contact;
