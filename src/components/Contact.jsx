import { useState } from 'react';
import { profile } from '../data/profile.js';
import DevChip from './DevChip.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate({ name, email, message }) {
  const errors = {};
  if (name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL_RE.test(email.trim())) errors.email = 'Please enter a valid email address.';
  if (message.trim().length < 10) errors.message = 'Please write at least 10 characters.';
  return errors;
}

export default function Contact() {
  const { contact } = profile;
  const endpoint = contact.formEndpoint;
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error | unconfigured

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    if (form.website) return; // honeypot: real visitors never fill this hidden field
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    if (!endpoint) {
      setStatus('unconfigured');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name.trim(), email: form.email.trim(), message: form.message.trim(), source: 'portfolio' }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('success');
      setForm({ name: '', email: '', message: '', website: '' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="section section-contact">
      <div className="container contact-grid">
        <div data-reveal>
          <p className="eyebrow">06 / Your next project</p>
          <h2 className="display section-title">
            Let’s build something <span className="accent-text">intelligent</span>.
          </h2>
          <p className="lead">
            Have a business workflow to automate, an application to build or an idea to bring to life? Let’s connect.
          </p>

          <ul className="contact-list">
            <li>
              <span className="contact-label">Location</span>
              <span>{profile.location}</span>
            </li>
            {(contact.email || import.meta.env.DEV) && (
              <li>
                <span className="contact-label">Email</span>
                {contact.email ? <a href={`mailto:${contact.email}`}>{contact.email}</a> : <DevChip>Add your email</DevChip>}
              </li>
            )}
            <li>
              <span className="contact-label">GitHub</span>
              <a href={contact.github} target="_blank" rel="noopener noreferrer">
                @{contact.githubHandle} <span aria-hidden="true">↗</span>
              </a>
            </li>
            {contact.linkedin ? (
              <li>
                <span className="contact-label">LinkedIn</span>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                  Profile <span aria-hidden="true">↗</span>
                </a>
              </li>
            ) : (
              import.meta.env.DEV && (
                <li>
                  <span className="contact-label">LinkedIn</span>
                  <DevChip>Add your LinkedIn URL</DevChip>
                </li>
              )
            )}
            {contact.instagram ? (
              <li>
                <span className="contact-label">Instagram</span>
                <a href={contact.instagram} target="_blank" rel="noopener noreferrer">
                  @{contact.instagramHandle} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        <form className="contact-form" data-reveal onSubmit={onSubmit} noValidate>
          <div className="field">
            <label htmlFor="c-name">Name</label>
            <input id="c-name" name="name" autoComplete="name" value={form.name} onChange={onChange} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'c-name-err' : undefined} />
            {errors.name && <p id="c-name-err" className="field-error">{errors.name}</p>}
          </div>

          <div className="field">
            <label htmlFor="c-email">Email</label>
            <input id="c-email" name="email" type="email" autoComplete="email" value={form.email} onChange={onChange} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'c-email-err' : undefined} />
            {errors.email && <p id="c-email-err" className="field-error">{errors.email}</p>}
          </div>

          <div className="field">
            <label htmlFor="c-message">Message</label>
            <textarea id="c-message" name="message" rows={5} value={form.message} onChange={onChange} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'c-msg-err' : undefined} />
            {errors.message && <p id="c-msg-err" className="field-error">{errors.message}</p>}
          </div>

          {/* Honeypot: hidden from people, often filled by bots. */}
          <div className="hp" aria-hidden="true">
            <label htmlFor="c-website">Website</label>
            <input id="c-website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={onChange} />
          </div>

          <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>

          <div aria-live="polite" className="form-status">
            {!endpoint && <DevChip>Set VITE_CONTACT_ENDPOINT in .env to enable sending</DevChip>}
            {status === 'unconfigured' && (
              <p className="field-error">
                Messages can’t be sent from this form yet, so nothing was sent. Please reach me on{' '}
                <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>.
              </p>
            )}
            {status === 'success' && <p className="form-ok">Thanks. Your message was received.</p>}
            {status === 'error' && (
              <p className="field-error">Your message could not be sent. Please try again, or reach me on GitHub.</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
