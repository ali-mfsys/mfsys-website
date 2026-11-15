import {NextRequest,NextResponse} from "next/server";
import {z} from "zod";
export const runtime="nodejs";
const schema=z.object({name:z.string().trim().min(2).max(120),email:z.email().max(254),company:z.string().trim().max(180).optional().default(""),interest:z.string().trim().max(180).optional().default(""),message:z.string().trim().min(10).max(6000),website:z.string().max(200).optional().default("")});
const recipient=["mfsys.software@gmail.com","info@mfsys.ca"];
function escapeHtml(v:string){return v.replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]||ch))}
export async function POST(req:NextRequest){
 const origin=req.headers.get("origin");const host=req.headers.get("host");
 if(origin){try{if(new URL(origin).host!==host)return NextResponse.json({error:"Invalid request origin."},{status:403})}catch{return NextResponse.json({error:"Invalid request origin."},{status:403})}}
 if(Number(req.headers.get("content-length")||0)>12000)return NextResponse.json({error:"Request too large."},{status:413});
 let input:unknown;try{input=await req.json()}catch{return NextResponse.json({error:"Invalid request."},{status:400})}
 const parsed=schema.safeParse(input);if(!parsed.success)return NextResponse.json({error:"Please check the form fields."},{status:400});
 if(parsed.data.website)return NextResponse.json({ok:true});
 const key=process.env.RESEND_API_KEY;const from=process.env.CONTACT_FROM_EMAIL;
 if(!key||!from)return NextResponse.json({error:"Message delivery is temporarily unavailable. Please contact info@mfsys.ca."},{status:503});
 const {name,email,company,interest,message}=parsed.data;
 const rows=[["Name",name],["Email",email],["Organisation",company],["Interest",interest],["Message",message]];
 const html='<h2>New MFSYS website enquiry</h2><table cellpadding="8" style="border-collapse:collapse">'+rows.map(([k,v])=>'<tr><th align="left" valign="top">'+escapeHtml(k)+'</th><td style="white-space:pre-wrap">'+escapeHtml(v)+'</td></tr>').join("")+'</table>';
 try{
 const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{"Authorization":`Bearer ${key}`,"Content-Type":"application/json"},body:JSON.stringify({from,to:recipient,reply_to:email,subject:"MFSYS website enquiry — "+(company||name).replace(/[\r\n]/g," "),html,text:rows.map(([k,v])=>k+": "+v).join("\n\n")}),signal:AbortSignal.timeout(12000)});
 if(!response.ok){console.error("Contact email provider returned",response.status);return NextResponse.json({error:"We could not deliver your message. Please try again or email info@mfsys.ca."},{status:502})}
 return NextResponse.json({ok:true});
 }catch{console.error("Contact email delivery failed");return NextResponse.json({error:"We could not deliver your message. Please try again or email info@mfsys.ca."},{status:502})}
}
