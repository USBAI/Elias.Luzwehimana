"use client";
import { useState } from "react";
import { companies, education, experience, person, principles, stack, work } from "@/lib/content";
import { useStory } from "./story";

export function Companies() {
  return (
    <section className="companies" aria-label="Companies">
      <div className="wrap companies-inner" data-reveal>
        <p className="companies-label">Shipped software with</p>
        <ul>
          {companies.map((c) => (
            // eslint-disable-next-line @next/next/no-img-element
            <li key={c.name}><img src={c.logo} alt={c.name} /></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Work() {
  const { open } = useStory();
  const [featured, ...rest] = work;
  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <p className="kicker">Selected work</p>
          <h2>Products I've <em>owned.</em></h2>
          <p className="section-lead">From a product I founded to platforms serving telecom, construction and field-service customers.</p>
        </div>

        <button className="feature glass-dark" data-reveal onClick={() => open({ story: featured.story })}>
          <div className="feature-copy">
            <span className="chip"><span className="pulse" />{featured.status}</span>
            <p className="kicker">{featured.type}</p>
            <h3>{featured.name}</h3>
            <p>{featured.summary}</p>
            <ul className="tags">{featured.stack.map((s) => <li key={s}>{s}</li>)}</ul>
            <span className="more">Read the case <span aria-hidden>→</span></span>
          </div>
          <div className="feature-visual" aria-hidden>
            <div className="prompt">
              <span className="prompt-dot" /><span className="prompt-text">“A booking app for my barbershop with SMS reminders”</span>
            </div>
            <div className="pipeline">
              {["Idea", "Spec", "Generate", "Deploy"].map((s, i) => (
                <div key={s} className="pipe-step" style={{ animationDelay: `${i * 0.9}s` }}><b>{String(i + 1).padStart(2, "0")}</b>{s}</div>
              ))}
            </div>
            <div className="mini-app">
              <div className="mini-bar"><i /><i /><i /></div>
              <div className="mini-body"><span /><span /><span className="short" /><div className="mini-grid"><span /><span /><span /></div></div>
            </div>
          </div>
        </button>

        <div className="work-grid">
          {rest.map((w, i) => (
            <button key={w.name} className="work-card" data-reveal style={{ transitionDelay: `${i * 80}ms` }} onClick={() => open({ story: w.story })}>
              <p className="kicker">{w.type}</p>
              <h3>{w.name}</h3>
              <p>{w.summary}</p>
              <ul className="tags">{w.stack.map((s) => <li key={s}>{s}</li>)}</ul>
              <span className="more">Read more <span aria-hidden>→</span></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Principles() {
  const [active, setActive] = useState(0);
  return (
    <section className="section principles" id="approach">
      <div className="wrap principles-grid">
        <div data-reveal>
          <p className="kicker">How I build</p>
          <h2>Ownership,<br /><em>not just output.</em></h2>
          <p className="section-lead">Fast-moving teams need engineers who can take an unclear problem and turn it into a product that works in production. Here's how I do that.</p>
        </div>
        <div className="principle-list" data-reveal>
          {principles.map((p, i) => (
            <button key={p.title} className="principle" data-active={i === active} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}>
              <span className="principle-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="principle-body">
                <span className="principle-title">{p.title}</span>
                <span className="principle-text">{p.text}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  const [active, setActive] = useState(0);
  return (
    <section className="section" id="experience">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <p className="kicker">Experience</p>
          <h2>Where I've <em>shipped.</em></h2>
        </div>
        <ol className="timeline" data-reveal>
          {experience.map((r, i) => (
            <li key={r.company + r.title} data-active={i === active}>
              <button onClick={() => setActive(i === active ? -1 : i)} aria-expanded={i === active}>
                <span className="tl-period">{r.period}</span>
                <span className="tl-company">{r.company}</span>
                <span className="tl-title">{r.title}</span>
                <span className="tl-plus" aria-hidden />
              </button>
              <div className="tl-detail"><div><p>{r.text}</p><span>{r.place}</span></div></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Stack() {
  return (
    <section className="section stack-section">
      <div className="wrap stack-grid">
        <div data-reveal>
          <p className="kicker">Stack</p>
          <h2>The <em>toolkit.</em></h2>
          <div className="education">
            <p className="kicker">Education</p>
            {education.map((e) => (
              <div key={e.school} className="edu-row"><div><b>{e.school}</b><span>{e.what}</span></div><i>{e.period}</i></div>
            ))}
          </div>
        </div>
        <div className="stack-groups" data-reveal>
          {stack.map(([group, items]) => (
            <div key={group} className="stack-group">
              <h4>{group}</h4>
              <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-inner wrap" data-reveal>
        <div>
          <p className="kicker dark">Available now</p>
          <h2>Building something<br /><em>that matters?</em></h2>
        </div>
        <div className="contact-side">
          <p>I'm looking for a founding, senior or product engineering role in a team that ships fast. The quickest way to reach me is email.</p>
          <a className="btn btn-black" href={`mailto:${person.email}`}>{person.email}</a>
          <div className="contact-links">
            <a href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={person.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={person.phoneHref}>{person.phone}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer wrap">
      <span>© {new Date().getFullYear()} Elias Luzwehimana</span>
      <span>Designed & built in Stockholm</span>
    </footer>
  );
}
