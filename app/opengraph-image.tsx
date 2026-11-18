import {ImageResponse} from "next/og";

export const size={width:1200,height:630};
export const contentType="image/png";
export const alt="MFSYS Technologies — Core Banking, Microfinance & Digital Financial Solutions";

/** Brand-led 1200x630 sharing card; no third-party images or remote fonts. */
export default function OpenGraphImage(){
 return new ImageResponse(
  <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",position:"relative",overflow:"hidden",background:"linear-gradient(130deg,#061d32 0%,#123b60 72%,#0e5270 100%)",padding:"64px 78px",fontFamily:"Arial, sans-serif",color:"#fff"}}>
   <div style={{position:"absolute",right:-180,top:-300,width:790,height:790,border:"1px solid rgba(133,219,231,.23)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>
    <div style={{width:590,height:590,borderRadius:"50%",border:"1px solid rgba(133,219,231,.18)"}}/>
   </div>
   <div style={{display:"flex",alignItems:"center",gap:20}}>
    <div style={{width:49,height:49,background:"#43b8d1",borderRadius:13,display:"flex",justifyContent:"center",alignItems:"center",fontWeight:900,fontSize:27}}>M</div>
    <div style={{display:"flex",flexDirection:"column",gap:3}}>
     <span style={{fontWeight:900,fontSize:30,letterSpacing:1}}>MFSYS</span>
     <span style={{fontSize:15,color:"#d1e7f0",letterSpacing:2}}>TECHNOLOGIES</span>
    </div>
   </div>
   <div style={{display:"flex",flexDirection:"column",gap:17,maxWidth:1000,zIndex:2}}>
    <div style={{fontSize:15,letterSpacing:3,color:"#7bd5d3",fontWeight:700}}>BUILDING SMARTER FINANCIAL FUTURES</div>
    <div style={{display:"flex",flexDirection:"column",fontSize:66,lineHeight:1.14,letterSpacing:-2.2,fontWeight:800}}>
     <span>Core Banking &</span><span>Digital Financial Solutions</span>
    </div>
    <div style={{fontSize:22,lineHeight:1.5,color:"#c9e0ec",maxWidth:900}}>Microfinance · Digital Banking · Lending · Payments · Islamic Finance · AI</div>
   </div>
   <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:20,fontWeight:600,color:"#d4ecf3"}}>
    <span>Technology built around institutions and people.</span>
    <span style={{color:"#ffc78b",fontWeight:800}}>mfsys.net</span>
   </div>
  </div>,
  size
 );
}
