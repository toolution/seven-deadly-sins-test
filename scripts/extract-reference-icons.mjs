import sharp from 'sharp';
import fs from 'node:fs/promises';
const source=process.argv[2];
if(!source)throw new Error('Pass the user-provided reference PNG path as the first argument.');
const crops=[
{id:'greed',left:148,top:292,width:285,height:264,keep:1},
{id:'lust',left:729,top:338,width:302,height:265,keep:1},
{id:'pride',left:890,top:649,width:267,height:238,keep:2},
{id:'gluttony',left:808,top:951,width:296,height:226,keep:3},
{id:'envy',left:430,top:1055,width:357,height:163,keep:1},
{id:'wrath',left:189,top:879,width:237,height:284,keep:1},
{id:'sloth',left:54,top:594,width:269,height:259,keep:3}
];
await fs.mkdir('public/images/sins',{recursive:true});
for(const c of crops){
 const {data,info}=await sharp(source).extract({left:c.left,top:c.top,width:c.width,height:c.height}).removeAlpha().raw().toBuffer({resolveWithObject:true});
 const w=info.width,h=info.height,labels=new Int32Array(w*h),components=[];let label=0;
 const foreground=i=>data[i*3]<238||data[i*3+1]<238||data[i*3+2]<238;
 for(let i=0;i<w*h;i++){
  if(labels[i]||!foreground(i))continue;
  label++;let list=[i],count=0,minX=w,minY=h,maxX=0,maxY=0;labels[i]=label;
  for(let q=0;q<list.length;q++){const p=list[q],x=p%w,y=Math.floor(p/w);count++;minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);
   for(const [nx,ny] of [[x-1,y],[x+1,y],[x,y-1],[x,y+1]]){if(nx<0||ny<0||nx>=w||ny>=h)continue;const n=ny*w+nx;if(!labels[n]&&foreground(n)){labels[n]=label;list.push(n);}}
  }
  components.push({label,count,minX,minY,maxX,maxY});
 }
 components.sort((a,b)=>b.count-a.count);const keep=new Set(components.slice(0,c.keep).map(x=>x.label));
 // Preserve white details enclosed by each retained silhouette, remove outer white and stray text.
 const rgba=Buffer.alloc(w*h*4);const outside=new Uint8Array(w*h),queue=[];
 const solid=i=>keep.has(labels[i]);
 for(let x=0;x<w;x++)for(const y of [0,h-1]){let i=y*w+x;if(!solid(i)&&!outside[i]){outside[i]=1;queue.push(i);}}
 for(let y=0;y<h;y++)for(const x of [0,w-1]){let i=y*w+x;if(!solid(i)&&!outside[i]){outside[i]=1;queue.push(i);}}
 for(let q=0;q<queue.length;q++){let i=queue[q],x=i%w,y=Math.floor(i/w);for(const [nx,ny] of [[x-1,y],[x+1,y],[x,y-1],[x,y+1]]){if(nx<0||ny<0||nx>=w||ny>=h)continue;let n=ny*w+nx;if(!solid(n)&&!outside[n]){outside[n]=1;queue.push(n);}}}
 for(let i=0;i<w*h;i++){rgba[i*4]=data[i*3];rgba[i*4+1]=data[i*3+1];rgba[i*4+2]=data[i*3+2];rgba[i*4+3]=outside[i]?0:255;}
 await sharp(rgba,{raw:{width:w,height:h,channels:4}}).trim().png().toFile(`public/images/sins/${c.id}.png`);
 console.log(c.id,JSON.stringify(components.slice(0,6)));
}
// A contact sheet for inspection, on white.
const tiles=await Promise.all(crops.map(async(c,i)=>({input:await sharp(`public/images/sins/${c.id}.png`).resize(190,190,{fit:'contain',background:'#fff'}).png().toBuffer(),left:(i%4)*220+15,top:Math.floor(i/4)*230+15})));
await sharp({create:{width:880,height:460,channels:3,background:'#fff'}}).composite(tiles).png().toFile('work/reference-icons-contact.png');
