import {describe,expect,it} from "vitest";
import {insightEntries,insightSections} from "../lib/insight-content";
import {buildInsightEntry,insightDraftSchema,insightSlug,validateInsightCollection} from "../lib/insights-authoring";

const legacyIds=[
 "inclusive-credit","client-data","credit-union-future","inclusive-policy","fmfb-syria","ebdaa",
 "kcbl","sama","akf","digitalkisaan","carboncap","modern-core","sacco","ai-lending","reporting",
 "findex","woccu","cgap-guide","bis-ai","news-cgap","news-woccu","news-agfin","news-temenos"
];
const sample={
 title:"How Credit Unions Can Evaluate Loan Origination Software",
 type:"ARTICLE" as const,
 category:"Credit Unions & SACCOs",
 excerpt:"A practical original analysis of loan origination system choices for credit unions and member-based lenders.",
 takeaway:"Choose an origination workflow that fits real member and loan policies.",
 body:"Loan officers need clear application records and approval handoffs.\n\n## A responsible approach\n\nInstitutions should evaluate identity verification, credit rules, maker-checker controls, and accountable approval paths before adopting new software. The selection should focus on operational fit rather than generic claims."
};

describe("canonical MFSYS Insights publishing",()=>{
 it("preserves all existing published Insight IDs and URLs",()=>{
  expect(insightEntries).toHaveLength(23);
  expect(insightEntries.map(x=>x.id)).toEqual(legacyIds);
  expect(validateInsightCollection(insightEntries)).toBe(true);
  expect(new Set(insightEntries.map(x=>x.section+"/"+x.id)).size).toBe(23);
  expect(insightSections.map(x=>x.slug)).toEqual(["research","case-studies","articles","reports","news"]);
 });
 it("creates a valid article that can appear in the same canonical library",()=>{
  const item=buildInsightEntry(sample,new Date("2026-11-19T10:00:00Z"));
  expect(item.section).toBe("articles");
  expect(item.kind).toBe("MFSYS perspective");
  expect(item.id).toBe("how-credit-unions-can-evaluate-loan-origination-software");
  expect(item.body).toContain("## A responsible approach");
  expect(item.date).toBe("November 2026");
  expect(item.source).toBeUndefined();
  expect(validateInsightCollection([item,...insightEntries])).toBe(true);
 });
 it("requires an attributed HTTPS source for news and research",()=>{
  expect(insightDraftSchema.safeParse({...sample,type:"NEWS"}).success).toBe(false);
  expect(insightDraftSchema.safeParse({...sample,type:"NEWS",sourceUrl:"http://example.org/story",sourceName:"Publisher"}).success).toBe(false);
  const item=buildInsightEntry({...sample,type:"NEWS",sourceUrl:"https://www.bis.org/",sourceName:"BIS"});
  expect(item.section).toBe("news");
  expect(item.source).toBe("https://www.bis.org/");
 });
 it("rejects reused IDs and invalid slugs",()=>{
  expect(()=>validateInsightCollection([insightEntries[0],insightEntries[0]])).toThrow("duplicated");
  expect(insightSlug("AI, Banking & Finance: Practical Guide!")).toBe("ai-banking-finance-practical-guide");
 });
});
