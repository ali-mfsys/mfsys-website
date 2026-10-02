import type {MetadataRoute} from "next";

export default function manifest():MetadataRoute.Manifest{
  return {
    name:"MFSYS Technologies",
    short_name:"MFSYS",
    description:"AI-powered financial, banking, lending, climate and enterprise technology solutions.",
    start_url:"/",
    scope:"/",
    display:"standalone",
    orientation:"portrait-primary",
    background_color:"#FFF7ED",
    theme_color:"#0B3555",
    lang:"en",
    dir:"ltr",
    icons:[
      {src:"/icon.svg",sizes:"any",type:"image/svg+xml",purpose:"any maskable"}
    ],
    categories:["business","finance","technology"],
    shortcuts:[
      {name:"Solutions",short_name:"Solutions",url:"/solutions"},
      {name:"Products",short_name:"Products",url:"/products"},
      {name:"Insights",short_name:"Insights",url:"/insights"},
      {name:"Contact MFSYS",short_name:"Contact",url:"/contact"}
    ]
  };
}
