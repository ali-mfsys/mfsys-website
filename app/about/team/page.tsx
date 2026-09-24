import type { Metadata } from "next";
import PageHero from "../../../components/PageHero";

export const metadata: Metadata = {
  title: "People & Culture | MFSYS",
  description: "Meet the multidisciplinary people and capabilities behind MFSYS Technologies.",
  alternates: { canonical: "/about/team" },
};

const disciplines = [
  ["01", "Leadership", "Experience that connects strategy, technology and impact."],
  ["02", "Technology", "Engineers and architects building secure, cloud-native platforms."],
  ["03", "Product & Design", "People who turn complex needs into simple, useful experiences."],
  ["04", "Delivery", "Cross-functional teams that move ideas from roadmap to production."],
  ["05", "Financial Services", "Deep expertise across banking, microfinance and inclusive finance."],
  ["06", "AI & Innovation", "Applied intelligence for better decisions, automation and growth."],
  ["07", "Quality & Security", "Disciplined engineering, testing, governance and resilience."],
  ["08", "Client Success", "Long-term partnerships focused on adoption and measurable value."],
];

export default function TeamPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="PEOPLE & CULTURE"
        title="People who turn complex challenges into practical technology."
        text="MFSYS brings together technology, financial services, product, delivery and domain expertise to build solutions that work in the real world."
      />

      <section className="container section">
        <div className="two-col">
          <article>
            <div className="eyebrow">HOW WE WORK</div>
            <h2>Different disciplines. One purpose.</h2>
            <p>
              Our strength comes from bringing people with different perspectives
              together around a shared outcome. Business knowledge, engineering,
              design, delivery and domain expertise work as one team from discovery
              through implementation and beyond.
            </p>
          </article>

          <article className="card content-card">
            <div className="eyebrow">OUR CULTURE</div>
            <h3>Practical. Collaborative. Impact-driven.</h3>
            <p>
              We value curiosity, accountability and continuous learning. We
              challenge assumptions, communicate openly and focus on technology
              that creates lasting value for clients and communities.
            </p>
          </article>
        </div>
      </section>

      <section className="container section" aria-labelledby="disciplines-title">
        <div className="section-heading">
          <div>
            <div className="eyebrow">OUR CAPABILITIES</div>
            <h2 id="disciplines-title">Expertise across the entire journey.</h2>
          </div>
          <p>
            A multidisciplinary model lets MFSYS combine strategic thinking,
            technical depth and delivery discipline in every engagement.
          </p>
        </div>

        <div className="about-pillars">
          {disciplines.map(([number, title, description]) => (
            <article key={number}>
              <span>{number}</span>
              <div className="about-pillar-line" />
              <small>{title.toUpperCase()}</small>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="card content-card">
          <div className="eyebrow">PEOPLE + TECHNOLOGY</div>
          <h2>Built by people. Designed for impact.</h2>
          <p>
            From financial inclusion and Islamic finance to AI, climate
            technology and connected supply chains, our teams combine lived
            experience with modern engineering to solve difficult problems
            with clarity and purpose.
          </p>
        </div>
      </section>
    </main>
  );
}
