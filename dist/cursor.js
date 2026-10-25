// Shared effect renderer: full-page pointer trail and three live comparison canvases.
(() => {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(pointer: fine)');
  const names={smoke:'Soft ink',ribbon:'Silk ribbons',stars:'Constellation',off:'Off'};
  const palettes=[[83,145,110],[70,145,160],[175,139,83]];
  let choice='smoke';try{choice=localStorage.getItem('cursorStyle')||choice}catch{}
  const query=new URLSearchParams(location.search).get('cursor');if(query&&names[query])choice=query;if(!names[choice])choice='smoke';
  let dark=false;const colourObserver=new MutationObserver(updateColour);colourObserver.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  function updateColour(){dark=getComputedStyle(document.documentElement).colorScheme==='dark'}updateColour();matchMedia('(prefers-color-scheme: dark)').addEventListener('change',updateColour);
  class Effect {
    constructor(canvas,mode,preview=false){this.canvas=canvas;this.ctx=canvas.getContext('2d');this.mode=mode;this.preview=preview;this.particles=[];this.points=[];this.previous=null;this.w=0;this.h=0;this.resize()}
    resize(){const r=this.preview?this.canvas.getBoundingClientRect():{width:innerWidth,height:innerHeight};this.w=r.width;this.h=r.height;const d=Math.min(devicePixelRatio||1,1.5);this.canvas.width=this.w*d;this.canvas.height=this.h*d;this.ctx?.setTransform(d,0,0,d,0,0);this.clear()}
    clear(){this.particles=[];this.points=[];this.previous=null;this.ctx?.clearRect(0,0,this.w,this.h)}
    feed(x,y,time){if(!this.ctx||this.mode==='off')return;const prev=this.previous||{x,y,time};let dx=x-prev.x,dy=y-prev.y;this.previous={x,y,time};if(time-prev.time>200||Math.hypot(dx,dy)>Math.max(this.w,this.h)*.5){dx=dy=0}
      const distance=Math.hypot(dx,dy);if(distance<1)return;
      if(this.mode==='ribbon'){this.points.push({x,y,life:1});if(this.points.length>60)this.points.shift();return}
      const count=Math.min(this.mode==='stars'?3:5,Math.ceil(distance/10));
      for(let i=0;i<count;i++){const t=(i+1)/count,life=this.mode==='stars'?1.2+Math.random()*.5:1.3+Math.random()*.7;
        this.particles.push({x:x-dx*(1-t),y:y-dy*(1-t),vx:Math.max(-75,Math.min(75,dx*2)),vy:Math.max(-75,Math.min(75,dy*2)),life,total:life,age:0,phase:Math.random()*6.28,r:12+Math.random()*12,colour:palettes[Math.floor(time/850)%3]});}
      if(this.particles.length>90)this.particles.splice(0,this.particles.length-90);
    }
    draw(dt){const c=this.ctx;if(!c)return;c.clearRect(0,0,this.w,this.h);const palette=dark?[[135,203,163],[123,201,219],[219,188,126]]:palettes;
      if(this.mode==='ribbon'){
        this.points=this.points.filter(p=>(p.life-=dt/.85)>0);if(this.points.length<2)return;
        for(let k=0;k<3;k++){for(let i=1;i<this.points.length;i++){const a=this.points[i-1],b=this.points[i];const offset=(k-1)*6*Math.sin(i*.14);c.strokeStyle=`rgba(${palette[k]},${Math.min(a.life,b.life)*.5})`;c.lineWidth=(k===1?3:1.5)*Math.min(1,b.life*2);c.lineCap='round';c.beginPath();c.moveTo(a.x+offset,a.y-offset);c.quadraticCurveTo(a.x+offset,a.y-offset,(a.x+b.x)/2+offset,(a.y+b.y)/2-offset);c.stroke()}}
        return;
      }
      this.particles=this.particles.filter(p=>p.life>0);
      for(const p of this.particles){p.life-=dt;p.age+=dt;const turn=Math.sin(p.age*3+p.phase)*16;p.x+=(p.vx+Math.cos(p.phase+p.age*2)*turn)*dt;p.y+=(p.vy+Math.sin(p.phase+p.age*2)*turn-4)*dt;p.vx*=Math.exp(-dt*2);p.vy*=Math.exp(-dt*2);const fade=Math.max(0,p.life/p.total);
        if(this.mode==='stars'){c.fillStyle=`rgba(${palette[1]},${fade*.8})`;c.beginPath();c.arc(p.x,p.y,1.2+fade,0,Math.PI*2);c.fill();continue}
        const r=p.r+p.age*23,opacity=fade*Math.min(1,p.age*18)*(dark?.13:.10);const g=c.createRadialGradient(p.x,p.y,0,p.x,p.y,r);g.addColorStop(0,`rgba(${p.colour},${opacity})`);g.addColorStop(.35,`rgba(${p.colour},${opacity*.7})`);g.addColorStop(1,`rgba(${p.colour},0)`);c.fillStyle=g;c.fillRect(p.x-r,p.y-r,r*2,r*2);
      }
      if(this.mode==='stars')for(let i=0;i<this.particles.length;i++){const a=this.particles[i];for(let j=i+1;j<Math.min(i+5,this.particles.length);j++){const b=this.particles[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<65){c.strokeStyle=`rgba(${palette[0]},${Math.max(0,Math.min(a.life,b.life))*.16*(1-d/65)})`;c.lineWidth=.8;c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.stroke()}}}
    }
    get active(){return this.particles.length>0||this.points.length>0}
  }
  const canvas=document.createElement('canvas');canvas.id='cursor-atmosphere';canvas.setAttribute('aria-hidden','true');document.body.prepend(canvas);const main=new Effect(canvas,choice);
  const picker=document.createElement('details');picker.className='cursor-picker';picker.innerHTML=`<summary>✳ <span>Cursor style</span></summary><div class="cursor-picker-panel"><p>Try a different effect</p>${Object.entries(names).map(([id,name])=>`<button data-select-cursor="${id}" aria-pressed="false">${name}</button>`).join('')}<a href="cursor-lab.html">Compare all three ↗</a></div>`;document.body.append(picker);
  const previews=[...document.querySelectorAll('[data-preview]')].map(c=>new Effect(c,c.dataset.preview,true));let playing=!reduced.matches,raf=0,last=0;
  const play=document.querySelector('#preview-motion');
  function updateButtons(){document.querySelectorAll('[data-select-cursor]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.selectCursor===choice)));const s=document.querySelector('#cursor-status');if(s)s.textContent=reduced.matches?'Reduced motion is on. Effects are paused.':`${names[choice]} selected. Move your cursor or try it on the home page.`;if(play){play.textContent=playing?'Pause samples':'Play samples';play.setAttribute('aria-pressed',String(playing));play.disabled=reduced.matches}}
  function select(mode){choice=mode;main.mode=mode;main.clear();try{localStorage.setItem('cursorStyle',mode)}catch{}updateButtons()}
  document.querySelectorAll('[data-select-cursor]').forEach(b=>b.onclick=()=>select(b.dataset.selectCursor));updateButtons();
  function start(){if(!raf&&!document.hidden&&!reduced.matches){last=performance.now();raf=requestAnimationFrame(tick)}}
  function tick(now){raf=0;const dt=Math.min(.04,(now-last)/1000||.016);last=now;if(document.hidden||reduced.matches)return;main.draw(dt);
    for(const e of previews){if(playing&&!e.hover){const t=now/1050; e.feed(e.w*(.5+.32*Math.sin(t)),e.h*(.5+.25*Math.sin(t*1.65)),now)}e.draw(dt)}
    if(main.active||previews.some(e=>e.active)||playing&&previews.length)raf=requestAnimationFrame(tick);
  }
  addEventListener('pointermove',e=>{if(reduced.matches||!fine.matches||e.pointerType==='touch'||document.hidden||e.target.closest('.cursor-preview'))return;main.feed(e.clientX,e.clientY,performance.now());start()},{passive:true});
  for(const e of previews){e.canvas.addEventListener('pointerenter',()=>{e.hover=true;e.previous=null});e.canvas.addEventListener('pointerleave',()=>{e.hover=false;e.previous=null});e.canvas.addEventListener('pointermove',p=>{if(reduced.matches)return;const r=e.canvas.getBoundingClientRect();e.feed(p.clientX-r.left,p.clientY-r.top,performance.now());start()},{passive:true})}
  if(play)play.onclick=()=>{playing=!playing;updateButtons();start()};
  function reset(){cancelAnimationFrame(raf);raf=0;main.clear();previews.forEach(e=>e.clear())}
  document.addEventListener('visibilitychange',()=>{reset();if(!document.hidden)start()});document.addEventListener('pointerleave',()=>{main.previous=null});
  reduced.addEventListener('change',()=>{reset();playing=!reduced.matches;updateButtons();start()});fine.addEventListener('change',()=>main.clear());addEventListener('resize',()=>{main.resize();previews.forEach(e=>e.resize())},{passive:true});start();
})();
