import questions from './questions.json' with { type: 'json' };
import {SINS,type Scores,type SinId} from './sins.ts';
export {questions};
export const VERSION=1;
export const CHOICES=['Very inaccurate','Moderately inaccurate','Neither accurate nor inaccurate','Moderately accurate','Very accurate'];
export function calculate(answers:readonly number[]):Scores {
 if(answers.length!==questions.length || Array.from(answers).some(a=>!Number.isInteger(a)||a<0||a>4)) throw new Error('Answer all 35 questions to see your result.');
 const totals=Object.fromEntries(SINS.map(s=>[s.id,0])) as Scores;
 questions.forEach((q,i)=>{totals[q.sin as SinId]+=q.reverse?4-answers[i]:answers[i];});
 return Object.fromEntries(SINS.map(s=>[s.id,totals[s.id]*5])) as Scores;
}
export function strongest(scores:Scores){const max=Math.max(...Object.values(scores));return SINS.filter(s=>scores[s.id]===max);}
export function resultTitle(scores:Scores){const top=strongest(scores);return top.length===1?top[0].name:top.length===2?`${top[0].name} & ${top[1].name}`:'A mixed profile';}
export function encode(scores:Scores){return `${VERSION}.${SINS.map(s=>scores[s.id]).join('.')}`;}
export function decode(raw:string):Scores|null {
 const bits=raw.split('.');if(bits.length!==8||bits[0]!==String(VERSION))return null;
 if(bits.slice(1).some(n=>!/^\d{1,3}$/.test(n)||Number(n)>100||Number(n)%5!==0))return null;
 return Object.fromEntries(SINS.map((s,i)=>[s.id,Number(bits[i+1])])) as Scores;
}
