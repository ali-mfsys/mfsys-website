import {eq,asc} from "drizzle-orm";
import {getDb} from "../lib/db";
import {pages,sections} from "../lib/db/schema";
import {legacyPartners,legacyTeam,DirectoryItem} from "../lib/directory-data";
import DirectoryClient from "./DirectoryClient";

async function loadDirectory(){
  const fallback = {
    team: legacyTeam.map((x,i)=>({...x,id:`legacy-team-${i}`,kind:"team" as const})),
    partners: legacyPartners.map((x,i)=>({...x,id:`legacy-partner-${i}`,kind:"partner" as const}))
  };

  try{
    const db=getDb();
    const [page]=await db.select({id:pages.id}).from(pages).where(eq(pages.slug,"site-directory")).limit(1);
    if(!page) return fallback;

    const rows=await db.select().from(sections).where(eq(sections.pageId,page.id)).orderBy(asc(sections.sortOrder));
    const items=rows
      .filter(r=>r.type==="directory-team"||r.type==="directory-partner")
      .map(r=>({id:r.id,...(r.content as object),kind:r.type==="directory-team"?"team":"partner"} as DirectoryItem));

    if(!items.length) return fallback;
    return {team:items.filter(x=>x.kind==="team"),partners:items.filter(x=>x.kind==="partner")};
  }catch{
    return fallback;
  }
}

export default async function DirectoryShowcase({full=false}:{full?:boolean}){
  const data=await loadDirectory();
  return <DirectoryClient team={data.team} partners={data.partners} full={full}/>;
}
