import type {MetadataRoute} from "next";
import {SITE_URL} from "../lib/seo";

export default function robots():MetadataRoute.Robots{
 return{
  // Search engines and search-answer bots may discover public, indexable content.
  // Private content remains behind authentication and excluded from public crawling.
  rules:[{
   userAgent:"*",
   allow:"/",
   disallow:["/admin/","/api/admin/","/offline"]
  }],
  sitemap:SITE_URL+"/sitemap.xml",
  host:"mfsys.net"
 };
}
