'use client';
import {useEffect} from "react";

export default function ServiceWorker(){
  useEffect(()=>{
    if(process.env.NODE_ENV!=="production" || !("serviceWorker" in navigator))return;
    const register=()=>{
      navigator.serviceWorker.register("/sw.js",{
        scope:"/",
        updateViaCache:"none"
      }).catch(()=>{
        // Offline registration failure must never interrupt normal navigation.
      });
    };
    // Hydration may finish after window.load; register in either case.
    if(document.readyState==="complete")register();
    else window.addEventListener("load",register,{once:true});
    return ()=>window.removeEventListener("load",register);
  },[]);
  return null;
}
