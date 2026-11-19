import {SINS,BY_ID,type Scores,type SinId} from './sins.ts';
import {strongest} from './scoring.ts';
export const CHART_ORDER:SinId[]=['lust','pride','gluttony','envy','wrath','sloth','greed'];
export type IconImages=Partial<Record<SinId,string>>;
const iconBoxes:Record<SinId,[number,number,number,number]>={
 greed:[101,6,268,253],lust:[682,53,286,253],pride:[838,364,254,223],gluttony:[766,665,273,213],envy:[386,768,335,142],wrath:[143,594,218,268],sloth:[8,311,255,238]
};
const esc=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]!));
export function icon(id:SinId,size=24){return `<img src="/images/sins/${id}.png" alt="" width="${size}" height="${size}" class="sin-symbol" loading="lazy"/>`;}
const point=(a:number,r:number)=>[553+Math.cos(a)*r,453+Math.sin(a)*r];
const coords=(p:number[])=>p.map(n=>n.toFixed(2)).join(',');
export function wheel(scores:Scores|null,decorative=false,images:IconImages={}){
 const step=Math.PI*2/7,start=-Math.PI/2,R=288;
 let content='';
 for(let i=0;i<7;i++){
  const id=CHART_ORDER[i],sin=BY_ID[id],a=start+i*step,b=a+step,mid=(a+b)/2;
  const p=point(a,R),q=point(b,R),fraction=scores?scores[id]/100:.55;
  const fp=point(a,R*fraction),fq=point(b,R*fraction);
  const label=point(mid,289),score=point(mid,169);
  let rotation=mid*180/Math.PI+90;if(rotation>90)rotation-=180;if(rotation>90)rotation-=180;
  content+=`<defs><linearGradient id="fill-${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${sin.color}"/><stop offset="1" stop-color="${sin.pale}"/></linearGradient></defs>`;
  content+=`<path d="M553 453L${coords(fp)}L${coords(fq)}Z" fill="url(#fill-${id})"/>`;
  content+=`<path d="M553 453L${coords(p)}L${coords(q)}Z" fill="none" stroke="#111111" stroke-width="5" stroke-linejoin="round"/>`;
  content+=`<text x="${label[0]}" y="${label[1]}" transform="rotate(${rotation},${label[0]},${label[1]})" text-anchor="middle" dominant-baseline="central" fill="#080808" font-size="39" font-weight="700">${sin.name}</text>`;
  if(scores)content+=`<text x="${score[0]}" y="${score[1]}" dominant-baseline="central" text-anchor="middle" font-size="30" font-weight="700" fill="#080808">${scores[id]}%</text>`;
  const [x,y,w,h]=iconBoxes[id];content+=`<image href="${images[id]||`/images/sins/${id}.png`}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet"/>`;
 }
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 930" width="1100" height="930" font-family="Arial, sans-serif" ${decorative?'aria-hidden="true"':`role="img" aria-label="${scores?esc(SINS.map(s=>`${s.name} ${scores[s.id]} percent`).join(', ')):'Seven independently scored personality themes'}"`}>${content}</svg>`;
}
export function strongestSentence(scores:Scores){const top=strongest(scores),max=scores[top[0].id].toFixed(2);return top.length===1?`Your strongest sin is ${top[0].name.toLowerCase()} (${max}%).`:top.length===2?`Your strongest sins are ${top[0].name.toLowerCase()} and ${top[1].name.toLowerCase()} (${max}%).`:`${top.length} sins share your highest score (${max}%).`;}
export function resultArtwork(scores:Scores,hostname:string,includeHeadline=true,images:IconImages={}){
 const chart=wheel(scores,false,images).replace('<svg ','<svg x="0" y="230" width="1080" height="913" ').replace('width="1100" height="930"','');
 return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350" font-family="Arial,sans-serif"><rect width="1080" height="1350" fill="#ffffff"/>${includeHeadline?`<text x="50" y="92" font-size="69" fill="#484848" font-weight="700">7 Deadly Sins Test</text><text x="50" y="190" font-size="50" fill="#484848" font-weight="700">Results:</text>`:''}${chart}${includeHeadline?`<text x="540" y="1225" text-anchor="middle" font-size="36" fill="#484848" font-weight="700">${esc(strongestSentence(scores))}</text><text x="540" y="1310" text-anchor="middle" font-size="20" fill="#666666">${esc(hostname)}</text>`:''}</svg>`;
}
