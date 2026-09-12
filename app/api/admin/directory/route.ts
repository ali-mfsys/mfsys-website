import {NextResponse} from "next/server";
import {z} from "zod";
import {cookies} from "next/headers";
import {eq,asc,and} from "drizzle-orm";
import {getDb} from "../../../../lib/db";
import {pages,sections} from "../../../../lib/db/schema";
import {verifySession} from "../../../../lib/auth";
import {legacyPartners,legacyTeam} from "../../../../lib/directory-data";

const itemSchema=z.object({
  id:z.string().uuid().optional(),
  kind:z.enum(["team","partner"]),
  name:z.string().min(1).max(160),
  role:z.string().max(160).optional(),
  category:z.string().max(100).optional(),
  bio:z.string().max(500).optional(),
  imageUrl:z.string().url().optional().or(z.literal("")),
  logoUrl:z.string().url().optional().or(z.literal("")),
  featured:z.boolean().optional(),
  sortOrder:z.number().int().default(0)
});

async function guard(){
  return verifySession((await cookies()).get("mfsys_admin_session")?.value);
}

async function directoryPage(){
  const db=getDb();
  const [existing]=await db.select({id:pages.id}).from(pages).where(eq(pages.slug,"site-directory")).limit(1);
  if(existing) return existing.id;
  const [created]=await db.insert(pages).values({
    slug:"site-directory",
    title:"Team & Partners",
    seoTitle:"MFSYS Team & Partners",
    seoDescription:"MFSYS people, partners and collaborations.",
    status:"PUBLISHED",
    publishedAt:new Date()
  }).returning({id:pages.id});
  return created.id;
}

export async function GET(){
  if(!await guard()) return NextResponse.json({error:"Unauthorized"},{status:401});
  const pageId=await directoryPage();
  const rows=await getDb().select().from(sections).where(eq(sections.pageId,pageId)).orderBy(asc(sections.sortOrder));
  return NextResponse.json(rows.filter(x=>x.type==="directory-team"||x.type==="directory-partner").map(x=>({id:x.id,...(x.content as object),kind:x.type==="directory-team"?"team":"partner"})));
}

export async function POST(req:Request){
  if(!await guard()) return NextResponse.json({error:"Unauthorized"},{status:401});
  const body=await req.json();
  const pageId=await directoryPage();

  if(body?.seed===true){
    const db=getDb();
    const existing=await db.select({id:sections.id}).from(sections).where(eq(sections.pageId,pageId)).limit(1);
    if(existing.length) return NextResponse.json({message:"Directory already contains records."},{status:409});
    const records=[...legacyTeam.map((x,i)=>({pageId,type:"directory-team",sortOrder:i+1,content:x})),...legacyPartners.map((x,i)=>({pageId,type:"directory-partner",sortOrder:100+i+1,content:x}))];
    await db.insert(sections).values(records);
    return NextResponse.json({created:records.length},{status:201});
  }

  const parsed=itemSchema.safeParse(body);
  if(!parsed.success) return NextResponse.json({error:"Invalid directory item",details:parsed.error.flatten()},{status:400});
  const {id,...content}=parsed.data;
  const [row]=await getDb().insert(sections).values({
    pageId,
    type:content.kind==="team"?"directory-team":"directory-partner",
    sortOrder:content.sortOrder,
    content
  }).returning();
  return NextResponse.json({id:row.id,...content},{status:201});
}

export async function PATCH(req:Request){
  if(!await guard()) return NextResponse.json({error:"Unauthorized"},{status:401});
  const body=await req.json();
  const id=z.string().uuid().parse(body.id);
  const parsed=itemSchema.omit({id:true}).partial().parse(body);
  const existing=await getDb().select().from(sections).where(eq(sections.id,id)).limit(1);
  if(!existing.length) return NextResponse.json({error:"Not found"},{status:404});
  const nextContent={...(existing[0].content as object),...parsed};
  const [row]=await getDb().update(sections).set({content:nextContent,sortOrder:parsed.sortOrder ?? existing[0].sortOrder}).where(eq(sections.id,id)).returning();
  return NextResponse.json({id:row.id,...nextContent});
}

export async function DELETE(req:Request){
  if(!await guard()) return NextResponse.json({error:"Unauthorized"},{status:401});
  const id=z.string().uuid().parse(new URL(req.url).searchParams.get("id"));
  await getDb().delete(sections).where(eq(sections.id,id));
  return NextResponse.json({ok:true});
}
