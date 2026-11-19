import {questions,calculate,encode,decode,strongest,resultTitle} from './scoring';
import {SINS,interpretation,type Scores} from './sins';
import {icon,wheel,resultArtwork,strongestSentence,type IconImages} from './art';
const STORAGE='seven-sins:quiz:v1';
const $=<T extends HTMLElement=HTMLElement>(id:string)=>document.getElementById(id) as T;
const form=$<HTMLFormElement>('quiz'),heading=$('question-heading'),radios=Array.from(form.querySelectorAll<HTMLInputElement>('input[name="answer"]'));
let answers:(number|null)[]=Array(questions.length).fill(null),current=0,activeScores:Scores|null=null;
let storageAvailable=true;
try{const saved=JSON.parse(localStorage.getItem(STORAGE)||'null');if(saved&&saved.version===1&&Array.isArray(saved.answers)&&saved.answers.length===35&&saved.answers.every((v:unknown)=>v===null||(Number.isInteger(v)&&Number(v)>=0&&Number(v)<=4))){answers=saved.answers;current=Number.isInteger(saved.current)?Math.max(0,Math.min(34,saved.current)):0;}}catch{storageAvailable=false;}
function save(){try{localStorage.setItem(STORAGE,JSON.stringify({version:1,answers,current}));}catch{storageAvailable=false;}}
function scrollToQuiz(){if(window.innerWidth<701)$('quiz-area').scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
function renderQuestion(focus=false){
 $('intro').hidden=false;$('intro').classList.remove('showing-results');$('quiz-area').hidden=false;$('results').hidden=true;
 heading.textContent=questions[current].text;
 $('question-counter').innerHTML=`Question ${current+1} <span class="muted">/ ${questions.length}</span>`;
 const completed=answers.filter(a=>a!==null).length;
 $('progress').setAttribute('aria-valuenow',String(completed));Array.from($('progress-fill').querySelectorAll<HTMLElement>('i')).forEach((segment,i)=>{segment.style.width=`${Math.max(0,Math.min(5,completed-i*5))/5*100}%`;});
 radios.forEach((radio,i)=>{radio.checked=answers[current]===i;});
 $<HTMLButtonElement>('back').disabled=current===0;
 const next=$<HTMLButtonElement>('next');next.disabled=answers[current]===null;
 next.innerHTML=current===34?'See my results <span aria-hidden="true">→</span>':'Continue <span aria-hidden="true">→</span>';
 $('quiz-hint').textContent=storageAvailable?'Go with your usual self. There are no right answers.':'Progress cannot be saved in this browser. Keep this tab open to finish.';
 if(focus){heading.focus({preventScroll:true});const body=heading.closest('.question-body')!;body.classList.remove('is-changing');void (body as HTMLElement).offsetWidth;body.classList.add('is-changing');scrollToQuiz();}
}
radios.forEach((radio,i)=>radio.addEventListener('change',()=>{answers[current]=i;save();$<HTMLButtonElement>('next').disabled=false;}));
form.addEventListener('submit',event=>{event.preventDefault();if(answers[current]===null)return;if(current<34){current++;save();renderQuestion(true);}else{const firstMissing=answers.indexOf(null);if(firstMissing!==-1){current=firstMissing;renderQuestion(true);return;}save();showResults(calculate(answers as number[]),true,false);}});
$('back').addEventListener('click',()=>{if(current>0){current--;save();renderQuestion(true);}});
function status(text:string){$('action-status').textContent=text;}
function showResults(scores:Scores,focus=false,shared=false){
 activeScores=scores;$('intro').classList.add('showing-results');$('quiz-area').hidden=true;
 const top=strongest(scores),primary=top[0],max=scores[primary.id];
 const result=$('results');
 result.innerHTML=`<h2 id="result-heading" tabindex="-1">Results:</h2><div class="reference-chart-wrap"><div class="reference-chart">${wheel(scores)}</div><button class="reference-share" id="share" type="button" aria-label="Share result" title="Share result"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="m7 12 10-6M7 12l10 6"/><circle cx="6" cy="12" r="3" fill="currentColor" stroke="none"/><circle cx="18" cy="5" r="3" fill="currentColor" stroke="none"/><circle cx="18" cy="19" r="3" fill="currentColor" stroke="none"/></svg></button></div><h3 class="strongest-result" id="result-strongest">${strongestSentence(scores)}</h3><div class="result-summary"><p>${shared?'You are viewing a shared result. ':''}${top.length===1?interpretation(primary.id,max):'Your highest scores are tied. All tied themes remain visible; no single winner is chosen. Explore the explanations below to see what each theme means.'}</p><div class="share-actions"><button class="primary-button" id="download" type="button">Save result image <span aria-hidden="true">↓</span></button></div><p class="action-status" id="action-status" role="status" aria-live="polite"></p><div class="result-utilities"><button class="text-button" id="edit" type="button">${answers.some(a=>a!==null)?'Edit answers':'Take the test'}</button><button class="text-button" id="restart" type="button">Start over</button></div><div id="reset-confirm" class="reset-confirm" hidden><p>Clear your saved answers and take a fresh test?</p><div class="share-actions"><button class="primary-button" id="confirm-reset" type="button">Clear & restart</button><button class="secondary-button" id="cancel-reset" type="button">Keep my result</button></div></div></div><section class="theme-explorer" aria-labelledby="explore-heading"><h3 id="explore-heading">Explore your seven sides</h3><div class="explorer-carousel"><button class="carousel-arrow" id="themes-prev" type="button" aria-label="Previous themes">‹</button><div class="explorer-track" id="explorer-track">${SINS.map(s=>`<button class="explore-theme" type="button" data-theme="${s.id}"><span class="explore-image">${icon(s.id,160)}</span><span>${s.name} (${scores[s.id]}%)</span></button>`).join('')}</div><button class="carousel-arrow" id="themes-next" type="button" aria-label="Next themes">›</button></div></section><div class="all-scores"><h3>All seven scores</h3>${SINS.map(s=>`<div class="score-row"><span class="theme-icon">${icon(s.id,36)}</span><span>${s.name}</span><div class="score-bar" aria-hidden="true"><span style="width:${scores[s.id]}%;background:${s.color}"></span></div><strong>${scores[s.id]}%</strong></div>`).join('')}</div><div class="result-details">${SINS.map(s=>`<details id="explain-${s.id}"><summary>${s.name} · ${scores[s.id]}% — ${s.theme}</summary><p>${interpretation(s.id,scores[s.id])}</p><p><strong>Try this:</strong> ${s.tip}</p></details>`).join('')}</div><p class="under-quiz">These scores describe your answers, not your worth or a clinical condition. <a href="/methodology/">How scoring works</a>.</p>`;
 result.hidden=false;
 if(!shared)history.replaceState(null,'',`#r=${encode(scores)}`);
 $('download').addEventListener('click',download);$('share').addEventListener('click',share);
 $('themes-prev').addEventListener('click',()=>$('explorer-track').scrollBy({left:-520,behavior:'smooth'}));
 $('themes-next').addEventListener('click',()=>$('explorer-track').scrollBy({left:520,behavior:'smooth'}));
 result.querySelectorAll<HTMLButtonElement>('[data-theme]').forEach(button=>button.addEventListener('click',()=>{const detail=$<HTMLDetailsElement>(`explain-${button.dataset.theme}`);detail.open=true;detail.scrollIntoView({block:'center',behavior:'smooth'});}));
 $('edit').addEventListener('click',()=>{activeScores=null;history.replaceState(null,'',location.pathname);current=answers.indexOf(null)===-1?0:Math.max(0,answers.indexOf(null));renderQuestion(true);});
 $('restart').addEventListener('click',()=>{$('reset-confirm').hidden=false;$('confirm-reset').focus();});
 $('cancel-reset').addEventListener('click',()=>{$('reset-confirm').hidden=true;$('restart').focus();});
 $('confirm-reset').addEventListener('click',()=>{answers=Array(35).fill(null);current=0;activeScores=null;save();history.replaceState(null,'',location.pathname);renderQuestion(true);});
 if(focus){$('result-heading').focus({preventScroll:true});$('intro').scrollIntoView({block:'start',behavior:'smooth'});}
}
let cachedIconImages:IconImages|null=null;
async function loadIconImages():Promise<IconImages>{
 if(cachedIconImages)return cachedIconImages;
 const loaded:IconImages=Object.fromEntries(await Promise.all(SINS.map(async sin=>{const response=await fetch(`/images/sins/${sin.id}.png`);if(!response.ok)throw new Error('Result icon unavailable');const blob=await response.blob();const data=await new Promise<string>((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result));reader.onerror=()=>reject(new Error('Icon conversion failed'));reader.readAsDataURL(blob);});return [sin.id,data];})));
 cachedIconImages=loaded;return loaded;
}
async function makePng(scores:Scores){
 const images=await loadIconImages();
 const svg=resultArtwork(scores,location.hostname,false,images),blob=new Blob([svg],{type:'image/svg+xml;charset=utf-8'}),url=URL.createObjectURL(blob);
 try{
  const image=new Image();await new Promise<void>((resolve,reject)=>{image.onload=()=>resolve();image.onerror=()=>reject(new Error('Image rendering failed'));image.src=url;});
  const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1350;
  const context=canvas.getContext('2d');if(!context)throw new Error('Canvas unavailable');context.drawImage(image,0,0);
  await document.fonts.load('700 69px "Roboto Variable"');
  context.fillStyle='#484848';context.textAlign='left';context.font='700 69px "Roboto Variable"';context.fillText('7 Deadly Sins Test',50,92);
  context.font='700 50px "Roboto Variable"';context.fillText('Results:',50,190);
  context.font='700 38px "Roboto Variable"';const words=strongestSentence(scores).split(' '),lines:string[]=[];let line='';
  for(const word of words){const next=line?`${line} ${word}`:word;if(context.measureText(next).width>980&&line){lines.push(line);line=word;}else line=next;}lines.push(line);
  lines.forEach((text,i)=>context.fillText(text,50,1205+i*47));
  context.textAlign='center';context.font='400 18px "Roboto Variable"';context.fillStyle='#666';context.fillText(location.hostname,540,1320);
  return await new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('Export failed')),'image/png'));
 }finally{URL.revokeObjectURL(url);}
}
async function download(){if(!activeScores)return;const button=$<HTMLButtonElement>('download');button.disabled=true;button.textContent='Creating image…';status('');try{const blob=await makePng(activeScores),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='my-seven-deadly-sins.png';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);status('Your PNG is ready. Check your downloads.');}catch{status('The image could not be saved. Please try again, or share your result link.');}finally{button.disabled=false;button.innerHTML='Save result image <span aria-hidden="true">↓</span>';}}
async function share(){if(!activeScores)return;const url=new URL(location.pathname,location.origin);url.hash=`r=${encode(activeScores)}`;try{if(navigator.share){await navigator.share({title:'My 7 Deadly Sins Test result',text:`My result: ${resultTitle(activeScores)}. What’s yours?`,url:url.href});status('Result shared.');}else if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(url.href);status('Result link copied. Anyone with it can see your seven scores.');}else{status('Copy this result link:');const input=document.createElement('input');input.type='text';input.value=url.href;input.readOnly=true;input.setAttribute('aria-label','Your shareable result link');input.style.cssText='width:100%;padding:12px;border:1px solid #afa1c4;border-radius:8px;background:#fffefb';$('action-status').append(input);input.select();}}catch(error){if(error instanceof DOMException&&error.name==='AbortError'){status('Sharing canceled. Your result is still here.');}else{status('Sharing was unavailable. You can save your result image instead.');}}}
function readSharedResult(){if(!location.hash.startsWith('#r='))return false;const scores=decode(location.hash.slice(3));if(scores){showResults(scores,false,true);return true;}history.replaceState(null,'',location.pathname);return false;}
if(!readSharedResult()){if(answers.every(a=>a!==null))showResults(calculate(answers as number[]));else renderQuestion();}
window.addEventListener('hashchange',()=>{if(location.hash.startsWith('#r='))readSharedResult();});
