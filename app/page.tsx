import Link from "next/link";
import HeroNarrative from "../components/hero/HeroNarrative";
import IntelligenceFlow from "../components/IntelligenceFlow";
import DirectoryShowcase from "../components/DirectoryShowcase";

const offices=[
  {city:"Islamabad, Pakistan",address:"Level-1, Block-A, STP — Software Technology Park, Service Road North, I-9/3",marker:"33.6487,73.0789"},
  {city:"Toronto, Canada",address:"81 Song Meadoway, North York, Toronto",marker:"43.7615,-79.4111"},
  {city:"Melbourne, Australia",address:"Unit 1, 46 Alice Street, Clayton, Victoria",marker:"-37.9150,145.1225"}
];

export default function Home(){
  return <main id="main">
    <HeroNarrative/>

    <section className="container ecosystem">
      <div className="eyebrow">THE MFSYS INTELLIGENCE ECOSYSTEM</div>
      <h2>One intelligence core. Multiple sectors. Measurable impact.</h2>
      <div className="ecosystem-grid">
        {["Banking","Lending","Islamic Finance","Agriculture","Payments","Climate","Logistics","Agentic AI"].map((x,i)=>
          <div className="ecosystem-card card" key={x}><span>0{i+1}</span><strong>{x}</strong><p>Intelligent digital capabilities.</p></div>
        )}
      </div>
    </section>

    <IntelligenceFlow/>

    <section className="presence">
      <div className="container">
        <div className="presence-head"><div className="eyebrow">GLOBAL PRESENCE</div><h2>Local understanding. Global delivery.</h2><p>MFSYS has offices in Pakistan, Canada and Australia and a track record of technology implementations across diverse markets and challenging environments.</p></div>
        <div className="presence-grid">
          <div className="office-list">
            {offices.map((x,i)=><article className="office-card card" key={x.city}>
              <div className="office-icon">{String(i+1).padStart(2,"0")}</div>
              <div><h3>{x.city}</h3><p>{x.address}</p><a className="content-card-link" href={`https://www.openstreetmap.org/?mlat=${x.marker.split(",")[0]}&mlon=${x.marker.split(",")[1]}#map=15/${x.marker}`} target="_blank" rel="noreferrer">Open location map →</a></div>
            </article>)}
          </div>
          <div className="map-card">
            <iframe title="MFSYS global presence map" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=-150%2C-45%2C170%2C65&layer=mapnik"/>
            <div className="map-caption">MFSYS — Pakistan · Canada · Australia</div>
          </div>
        </div>
      </div>
    </section>

    <DirectoryShowcase/>

    <section className="container section">
      <div className="eyebrow">SOLUTIONS</div>
      <h2>Technology built around real-world challenges.</h2>
      <div className="ecosystem-grid">
        {["Digital Banking","Digital Lending","Islamic Finance","Agri Finance","AI Credit Intelligence","Climate & Carbon","Logistics & Supply Chain","Agentic AI"].map(x=>
          <div className="card content-card" key={x}><h3>{x}</h3><Link href="/solutions">Explore →</Link></div>
        )}
      </div>
    </section>

    <section className="container section">
      <div className="cta-panel">
        <div className="eyebrow">INTELLIGENCE FOR IMPACT</div>
        <h2>Let's shape what comes next.</h2>
        <p>From core banking and lending to AI, climate and logistics, MFSYS combines domain expertise with modern digital engineering.</p>
        <Link className="btn btn-primary" href="/contact">Talk to MFSYS →</Link>
      </div>
    </section>
  </main>;
}