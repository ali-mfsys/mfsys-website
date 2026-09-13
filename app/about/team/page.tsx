import PageHero from "../../../components/PageHero";
import DirectoryShowcase from "../../../components/DirectoryShowcase";

export default function TeamPage(){
  return <main id="main">
    <PageHero
      eyebrow="MFSYS / PEOPLE & PARTNERS"
      title="The people and relationships behind the platform."
      text="Explore the MFSYS team, technology ecosystem and long-term collaborations. Profiles and partner records are managed through the MFSYS Content Studio."
    />
    <section className="container team-photo-section" aria-labelledby="team-photo-title">
      <div className="team-photo-copy">
        <div className="eyebrow">OUR TEAM</div>
        <h2 id="team-photo-title">People behind the intelligence.</h2>
        <p>Our team brings together technology, financial services, product, delivery and domain expertise to turn complex challenges into practical solutions.</p>
      </div>
      <figure className="team-photo-frame">
        <img src="/mfsys-team.jpg" alt="MFSYS team gathered outside the Islamabad office" loading="eager" />
        <figcaption>MFSYS Technologies — our team in Islamabad</figcaption>
      </figure>
    </section>
    <DirectoryShowcase full />
  </main>;
}