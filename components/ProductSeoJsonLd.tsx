import {productData} from "../lib/product-data";
import {breadcrumbSchema,softwareSchema,safeJsonLd} from "../lib/seo";

/** Honest product-level structured data: no fictional pricing, reviews or ratings. */
export default function ProductSeoJsonLd({path}:{path:string}){
 const item=productData.find(x=>x.href===path);
 if(!item)return null;
 const schema={"@context":"https://schema.org","@graph":[
  softwareSchema({name:item.name,description:item.description||item.tagline,path,category:path.includes("cargoguard")?"BusinessApplication":"FinanceApplication"}),
  breadcrumbSchema([{name:"Home",path:"/"},{name:"Products",path:"/products"},{name:item.name,path}])
 ]};
 return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:safeJsonLd(schema)}}/>;
}
