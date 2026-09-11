export const cmsSchema={
 pages:["slug","title","seoTitle","seoDescription","ogImage","status","publishedAt"],
 sections:["pageId","type","sortOrder","content","settings"],
 products:["slug","name","tagline","description","status","seoTitle","seoDescription"],
 insights:["slug","title","type","excerpt","body","coverImage","author","publishedAt","status"],
 media:["filename","url","alt","caption","type","width","height"],
 navigation:["label","href","parentId","sortOrder","visible"],
 users:["name","email","role","status","lastLoginAt"],
 auditLogs:["userId","action","entity","entityId","createdAt"]
} as const;
export type CmsEntity=keyof typeof cmsSchema;