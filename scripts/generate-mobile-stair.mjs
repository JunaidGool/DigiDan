import { writeFileSync } from "node:fs";
const TW=34,TH=17,H=34;
const iso=(x,y,z)=>[(x-y)*TW,(x+y)*TH-z*H];
const FILLS={teal:{l:"#5DCAA5",m:"#1D9E75",d:"#147A5A"},coral:{l:"#F0997B",m:"#D85A30",d:"#A8431F"},amber:{l:"#FAC775",m:"#EF9F27",d:"#C67C10"}};
const NUM={teal:"#085041",coral:"#712B13",amber:"#633806"};
const F={top:[iso(0,0,1),iso(1,0,1),iso(1,1,1),iso(0,1,1)],right:[iso(1,0,0),iso(1,1,0),iso(1,1,1),iso(1,0,1)],left:[iso(0,1,0),iso(1,1,0),iso(1,1,1),iso(0,1,1)]};
const P=a=>a.map(p=>p.map(n=>n.toFixed(1)).join(",")).join(" ");
const cen=a=>[a.reduce((s,p)=>s+p[0],0)/a.length,a.reduce((s,p)=>s+p[1],0)/a.length];
const [cx,cy]=cen(F.top);
const steps=[["Discover","teal",1],["Design","teal",2],["Validate","amber",3],["Build","amber",4],["Integrate","amber",5],["Assure","coral",6],["Deploy and support","coral",7]];
const rowH=72, cubeW=54, cubeH=cubeW*68/68; // approx
let rows="";
steps.forEach((s,i)=>{
  const [title,fam,n]=s; const c=FILLS[fam]; const y=i*rowH;
  rows+=`<g transform="translate(20,${y+58}) scale(0.8)"><polygon points="${P(F.left)}" fill="${c.d}"/><polygon points="${P(F.right)}" fill="${c.m}"/><polygon points="${P(F.top)}" fill="${c.l}"/><text x="${cx}" y="${cy}" dominant-baseline="central" text-anchor="middle" font-size="13" font-weight="500" fill="${NUM[fam]}">${n}</text></g>`;
  rows+=`<text x="95" y="${y+40}" font-size="19" font-weight="500" fill="#26261F">${title}</text>`;
});
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="380" height="${steps.length*rowH+20}" viewBox="0 0 380 ${steps.length*rowH+20}" font-family="'Space Grotesk',Arial,sans-serif"><rect width="380" height="${steps.length*rowH+20}" fill="#FFFFFF"/>${rows}</svg>`;
writeFileSync(new URL("../preview/p5-mobile-stair.svg",import.meta.url),svg);
console.log("wrote preview/p5-mobile-stair.svg");
