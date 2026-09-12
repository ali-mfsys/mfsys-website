import {NextResponse} from "next/server";
import {z} from "zod";
import {cookies} from "next/headers";
import {getDb} from "../../../../lib/db";
import {auditLogs,pages,users} from "../../../../lib/db/schema";
import {eq} from "drizzle-orm";
import {verifySession} from "../../../../lib/auth";

const pageSchema=z.object({
  slug:z.string().min(1).max(120).regex(/^[a-z0-9-]+$/),
  title:z.string().min(1).max(180),
  seoTitle:z.string().max(180).optional(),
  seoDescription:z.string().max(320).optional()
});

async function session(){
  return verifySession((await cookies()).get("mfsys_admin_session")?.value);
}

async function guard(){
  const s=await session();
  return s?null:NextResponse.json({error:"Unauthorized"},{status:401});
}

export async function GET(){
  const denied=await guard();
  if(denied)return denied;
  return NextResponse.json(await getDb().select().from(pages));
}

export async function POST(req:Request){
  const denied=await guard();
  if(denied)return denied;

  const s=await session();
  const parsed=pageSchema.safeParse(await req.json());
  if(!parsed.success)return NextResponse.json({error:"Invalid content payload"},{status:400});

  const [row]=await getDb().insert(pages).values(parsed.data).returning();

  if(s){
    const [user]=await getDb().select({id:users.id}).from(users).where(eq(users.email,s.email));
    if(user){
      await getDb().insert(auditLogs).values({
        userId:user.id,
        action:"CREATE",
        entity:"PAGE",
        entityId:row.id
      });
    }
  }

  return NextResponse.json(row,{status:201});
}

export async function PATCH(req:Request){
  const denied=await guard();
  if(denied)return denied;

  const body=await req.json();
  const id=z.string().uuid().parse(body.id);
  const data=pageSchema.partial().parse(body);
  delete (data as any).id;

  const [row]=await getDb().update(pages)
    .set({...data,updatedAt:new Date()})
    .where(eq(pages.id,id))
    .returning();

  return NextResponse.json(row);
}
