"use client";
import {useEffect,useRef,useState} from "react";
import s from "./LiveChatLauncher.module.css";

declare global {interface Window {Tawk_API?:{onLoad?:()=>void;maximize?:()=>void;showWidget?:()=>void;hideWidget?:()=>void;onChatMinimized?:()=>void;onChatEnded?:()=>void};Tawk_LoadStart?:Date}}
const SCRIPT_URL="https://embed.tawk.to/6af9b2f58e6f59d4de494ee8/1k7fm64e9";
export default function LiveChatLauncher(){
 const [loading,setLoading]=useState(false);
 const [opened,setOpened]=useState(false);
 const requested=useRef(false);
 useEffect(()=>{return()=>{requested.current=false}},[]);
 const openChat=()=>{
  if(window.Tawk_API?.maximize){window.Tawk_API.showWidget?.();window.Tawk_API.maximize();setOpened(true);return;}
  if(requested.current)return;
  requested.current=true;setLoading(true);
  window.Tawk_API=window.Tawk_API||{};
  window.Tawk_API.onLoad=()=>{window.Tawk_API?.showWidget?.();window.Tawk_API?.maximize?.();setLoading(false);setOpened(true)};
  window.Tawk_LoadStart=new Date();
  const script=document.createElement("script");script.async=true;script.src=SCRIPT_URL;script.charset="UTF-8";script.setAttribute("crossorigin","*");
  script.onerror=()=>{requested.current=false;setLoading(false);setOpened(false)};
  document.body.appendChild(script);
 };
 if(opened)return null;
 return <button type="button" className={s.launcher} onClick={openChat} disabled={loading} aria-label={loading?"Loading live chat":"Open MFSYS live chat"} title="Chat with MFSYS"><svg viewBox="0 0 24 24" width="27" height="27" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5 8 8 0 0 1-3.2-.7L4 20l1.7-5.3A8 8 0 1 1 20 11.5Z"/><path d="M9 12h.01M12 12h.01M15 12h.01"/></svg>{loading&&<span className={s.srOnly}>Loading chat…</span>}</button>
}
