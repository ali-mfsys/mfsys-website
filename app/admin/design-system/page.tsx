export default function DesignSystemPage(){
  const colors=[
    ["Navy","--navy","#071923","Primary brand / navigation"],
    ["Blue","--blue","#0B6FD3","Primary action / links"],
    ["Black","--black","#020617","Deep contrast / footer"],
    ["White","--white","#FFFFFF","Primary surface"],
    ["Light Grey","--grey-50","#F7F9FC","Page background"],
    ["Indigo","--indigo","#4F46E5","AI / intelligence"],
    ["Orange","--orange","#F97316","Energy / emphasis"],
    ["Green","--green","#16A34A","Growth / success"],
    ["Yellow","--yellow","#EAB308","Attention / warning"],
    ["Red","--red","#DC2626","Error / critical"]
  ];
  return <main className="admin-content">
    <div className="admin-page-title"><div><div className="admin-kicker">GLOBAL DESIGN SYSTEM</div><h1>MFSYS visual language</h1><p>A single source of truth for color, typography, interaction and visual hierarchy.</p></div></div>
    <section className="admin-panel">
      <div className="panel-head"><div><div className="admin-kicker">VISUAL HIERARCHY</div><h2>45 / 25 / 25 / 5</h2></div><span className="status-pill">MFSYS v1</span></div>
      <p className="admin-intro">Navy / Blue / Black lead the experience. White / light grey create space. Indigo / orange / green provide functional emphasis. Yellow / red are reserved for attention and critical states.</p>
      <div className="design-token-grid">{colors.map(([name,token,hex,usage])=><div className="design-token" key={name}><span className="design-swatch" style={{background:hex}}></span><strong>{name}</strong><code>{token}</code><small>{hex} · {usage}</small></div>)}</div>
    </section>
    <section className="admin-panels" style={{marginTop:16}}>
      <div className="admin-panel"><div className="admin-kicker">TYPOGRAPHY</div><h2 style={{fontSize:"3rem"}}>Intelligence for Impact</h2><p>Space Grotesk provides the editorial voice; DM Sans carries product and interface content.</p><div className="workflow"><span>Display</span><span>Heading</span><span>Body</span><span>Label</span></div></div>
      <div className="admin-panel"><div className="admin-kicker">ACTIONS</div><h2>Button language</h2><div className="workflow"><button className="admin-primary">Primary action</button><button className="admin-secondary">Secondary</button><button className="btn btn-orange">Energy</button><button className="btn btn-green">Success</button></div></div>
    </section>
  </main>;
}
