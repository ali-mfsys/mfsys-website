import {NextResponse} from "next/server";
import {z} from "zod";
import {cookies} from "next/headers";
import {eq} from "drizzle-orm";
import {getDb} from "../../../../lib/db";
import {products} from "../../../../lib/db/schema";
import {verifySession} from "../../../../lib/auth";
import {seedProducts} from "../../../../lib/product-cms";

const schema=z.object({
  id:z.string().uuid().optional(),
  slug:z.string().min(1).max(120).regex(/^[a-z0-9-]+$/),
  name:z.string().min(1).max(120),
  tagline:z.string().min(1).max(240),
  description:z.string().min(1),
  capabilities:z.array(z.string()).default([]),
  status:z.enum(["DRAFT","REVIEW","APPROVED","PUBLISHED","ARCHIVED"]).optional()
});

async function guard(){
  return verifySession((await cookies()).get("mfsys_admin_session")?.value);
}

export async function GET(){
  if(!await guard()) return NextResponse.json({error:"Unauthorized"},{status:401});
  return NextResponse.json(await getDb().select().from(products));
}

export async function POST(req:Request){
  if(!await guard()) return NextResponse.json({error:"Unauthorized"},{status:401});
  const body=await req.json();
  if(body?.seed===true){
    const result=await seedProducts();
    return NextResponse.json(result,result.created?{status:201}:{status:409});
  }
  const p=schema.omit({id:true}).safeParse(body);
  if(!p.success)return NextResponse.json({error:"Invalid product payload",details:p.error.flatten()},{status:400});
  const [row]=await getDb().insert(products).values(p.data).returning();
  return NextResponse.json(row,{status:201});
}

export async function PATCH(req:Request){
  if(!await guard()) return NextResponse.json({error:"Unauthorized"},{status:401});
  const body=await req.json();
  const id=z.string().uuid().parse(body.id);
  const p=schema.omit({id:true}).partial().safeParse(body);
  if(!p.success)return NextResponse.json({error:"Invalid product payload",details:p.error.flatten()},{status:400});
  const [row]=await getDb().update(products).set({...p.data,updatedAt:new Date()}).where(eq(products.id,id)).returning();
  if(!row)return NextResponse.json({error:"Product not found"},{status:404});
  return NextResponse.json(row);
}

export async function DELETE(req:Request){
  if(!await guard()) return NextResponse.json({error:"Unauthorized"},{status:401});
  const id=z.string().uuid().parse(new URL(req.url).searchParams.get("id"));
  const [row]=await getDb().delete(products).where(eq(products.id,id)).returning({id:products.id});
  if(!row)return NextResponse.json({error:"Product not found"},{status:404});
  return NextResponse.json({ok:true});
}
