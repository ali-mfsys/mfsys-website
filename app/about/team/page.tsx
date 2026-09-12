import PageHero from "../../../components/PageHero";
import DirectoryShowcase from "../../../components/DirectoryShowcase";

export default function TeamPage(){
  return <main id="main">
    <PageHero
      eyebrow="MFSYS / PEOPLE & PARTNERS"
      title="The people and relationships behind the platform."
      text="Explore the MFSYS team, technology ecosystem and long-term collaborations. Profiles and partner records are managed through the MFSYS Content Studio."
    />
    <DirectoryShowcase full />
  </main>;
}
