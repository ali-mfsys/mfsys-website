import Link from "next/link";
import HeroNarrative from "../components/hero/HeroNarrative";
import IntelligenceFlow from "../components/IntelligenceFlow";
import ProductsShowcase from "../components/ProductsShowcase";
import SolutionsChallenge from "../components/SolutionsChallenge";
import AIInnovation from "../components/AIInnovation";
import ImpactCases from "../components/ImpactCases";
import AboutMFSYS from "../components/AboutMFSYS";
import FinalCTA from "../components/FinalCTA";

const offices=[
  {city:"Islamabad, Pakistan",address:"Level-1, Block-A, STP — Software Technology Park, Service Road North, I-9/3",marker:"33.6487,73.0789"},
  {city:"Toronto, Canada",address:"81 Song Meadoway, North York, Toronto",marker:"43.7615,-79.4111"},
  {city:"Melbourne, Australia",address:"Unit 1, 46 Alice Street, Clayton, Victoria",marker:"-37.9150,145.1225"}
];

export default function Home(){
  return <main id="main">
    <HeroNarrative/>

    <section className="home-proof" aria-label="MFSYS at a glance">
      <div className="container">
        <div className="home-proof-grid">
          <div className="home-proof-item"><div className="home-proof-icon">▥</div><div><strong>30+</strong><span>Financial Institutions</span></div></div>
          <div className="home-proof-item"><div className="home-proof-icon">◎</div><div><strong>12+</strong><span>Countries</span></div></div>
          <div className="home-proof-item"><div className="home-proof-icon">♧</div><div><strong>100+</strong><span>Professionals</span></div></div>
          <div className="home-proof-item"><div className="home-proof-icon">◉</div><div><strong>40%</strong><span>Female Workforce</span></div></div>
        </div>
        <div className="home-proof-tag">SOLUTIONS FOR PEOPLE, COMMUNITIES AND A SUSTAINABLE TOMORROW</div>
      </div>
    </section>

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

    <ProductsShowcase/>

    <SolutionsChallenge/>

    <AIInnovation/>

    <ImpactCases/>

    <AboutMFSYS/>

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

    <section className="proof-band">
      <div className="container">
        <div className="proof-grid">
          <div><strong>12+</strong><span>countries with MFSYS implementation experience</span></div>
          <div><strong>30+</strong><span>financial institutions served across global markets</span></div>
          <div><strong>100+</strong><span>professionals across business, banking and technology</span></div>
          <div><strong>AI</strong><span>embedded across the next generation of MFSYS products</span></div>
        </div>
      </div>
    </section>

    <section className="section proof-section">
      <div className="container">
        <div className="two-col">
          <div>
            <div className="eyebrow">CLIENT EXPERIENCE</div>
            <h2>Technology is only successful when it creates confidence.</h2>
            <p>MFSYS's legacy site highlights long-term relationships, successful core banking implementations and client satisfaction across challenging environments.</p>
          </div>
          <div className="testimonial-stack">
            <blockquote>“The technical and management people at MFSYS delivered a high quality solution on time and on budget.”<cite>Asif Lalani · MIS Manager / Consultant</cite></blockquote>
            <blockquote>“Working with MFSYS has been one of the best things for our organization because of the successful implementation of core Microfinance banking system.”<cite>Jean Louis G. Ouedraogo · Regional IT Manager</cite></blockquote>
          </div>
        </div>
      </div>
    </section>


    <FinalCTA/>
  </main>;
}