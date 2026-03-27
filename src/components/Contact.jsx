// ============================================
// Contact.jsx
// Left: contact info cards
// Right: working contact form (uses Formspree
//   or any backend — currently shows success state)
// ============================================

import React, { useState } from "react";
import { personalInfo } from "../data/portfolioData";
import { useFadeIn } from "../hooks/useFadeIn";
import "./Contact.css";

// ---- ContactInfoCard: reusable info tile ----
function ContactInfoCard({ icon, label, value, href }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="contact__info-card"
    >
      <span className="contact__info-icon">{icon}</span>
      <div>
        <p className="contact__info-label">{label}</p>
        <p className="contact__info-value">{value}</p>
      </div>
    </a>
  );
}

// ---- Main Contact Section ----
function Contact() {
  const ref = useFadeIn();

  // Form state: field values + submission status
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  // Update form field on change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  // 💡 To connect a real backend, replace the setTimeout with a fetch() call.
  // For Formspree: fetch('https://formspree.io/f/YOUR_ID', { method:'POST', body: JSON.stringify(form) })
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://formspree.io/f/xaqlnvlk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="section__inner">
        <div ref={ref} className="contact__grid fade-in">
          {/* ---- Left: Info + social ---- */}
          <div className="contact__left fade-in-child">
            <p className="section__tag">Let's Connect</p>
            <h2 className="section__title">Get In Touch</h2>
            <p className="contact__intro">
              Whether you have a project idea, a question, or just want to say
              hi — my inbox is always open. I'll get back to you within 24
              hours.
            </p>

            {/* Contact info cards */}
            <div className="contact__info-list">
              <ContactInfoCard
                icon="✉️"
                label="Email"
                value={personalInfo.email}
                href={`mailto:${personalInfo.email}`}
              />
              <ContactInfoCard
                icon="📍"
                label="Location"
                value={personalInfo.location}
                href="#"
              />
              <ContactInfoCard
                icon="💼"
                label="LinkedIn"
                value="www.linkedin.com/in/hiteshree-chauhan-144543331"
                href={personalInfo.linkedin}
              />
              <ContactInfoCard
                icon="🐙"
                label="GitHub"
                value="https://github.com/Hiteshree-Chauhan-it"
                href={personalInfo.github}
              />
            </div>
          </div>

          {/* ---- Right: Contact form ---- */}
          <div className="contact__right fade-in-child">
            {status === "sent" ? (
              // Success state shown after form submit
              <div className="contact__success">
                <span className="contact__success-icon">🎉</span>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. I'll reply as soon as I can.</p>
                <button
                  className="btn btn--outline"
                  onClick={() => setStatus("idle")}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form
                className="contact__form"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Name field */}
                <div className="contact__field">
                  <label htmlFor="name" className="contact__label">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Jane Smith"
                    className="contact__input"
                  />
                </div>

                {/* Email field */}
                <div className="contact__field">
                  <label htmlFor="email" className="contact__label">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="jane@example.com"
                    className="contact__input"
                  />
                </div>

                {/* Message field */}
                <div className="contact__field">
                  <label htmlFor="message" className="contact__label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project or idea..."
                    className="contact__input contact__textarea"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn--primary contact__submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending..." : "Send Message →"}
                </button>
                {status === "error" && (
                  <p
                    style={{
                      color: "#c0392b",
                      fontSize: "0.82rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    Something went wrong. Please try emailing directly at
                    hiteshreechauhanit@gmail.com
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
