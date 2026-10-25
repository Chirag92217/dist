const $=s=>document.querySelector(s);
const data=window.portfolio;
const themes=['auto','light','dark'];let theme='auto';try{theme=localStorage.getItem('theme')||'auto'}catch{}
function setTheme(t){theme=themes.includes(t)?t:'auto';if(theme==='auto')delete document.documentElement.dataset.theme;else document.documentElement.dataset.theme=theme;$('#theme span').textContent=theme[0].toUpperCase()+theme.slice(1);$('#theme').setAttribute('aria-label',`Theme: ${theme}. Change theme`);try{localStorage.setItem('theme',theme)}catch{}}
setTheme(theme);$('#theme').onclick=()=>setTheme(themes[(themes.indexOf(theme)+1)%3]);

if($('#portrait')&&data.photo){const im=document.createElement('img');im.src=data.photo;im.alt='Portrait of Chirag';$('#portrait').replaceChildren(im)}
document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));let n=0;document.querySelectorAll('.project-card').forEach(c=>{c.hidden=b.dataset.filter!=='all'&&c.dataset.category!==b.dataset.filter;if(!c.hidden)n++});$('#filter-count').textContent=`${n} project${n===1?'':'s'}`});
const modes={rgb:['01 / COLOUR & APPEARANCE','Texture, colour, and visual context.'],depth:['02 / DISTANCE & STRUCTURE','Distance and shape provide another perspective.'],fusion:['03 / COMBINED PERSPECTIVES','Complementary inputs for spatial and temporal modelling.']};
document.querySelectorAll('button[data-mode]').forEach(b=>b.onclick=()=>{document.querySelectorAll('button[data-mode]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));$('.experiment').dataset.mode=b.dataset.mode;$('#mode-label').textContent=modes[b.dataset.mode][0];$('#mode-caption').textContent=modes[b.dataset.mode][1]});
document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-answer]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));$('#sample-answer').textContent=b.dataset.answer});
document.querySelectorAll('[data-subject]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-subject]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));const url='mailto:chirag.92217@gmail.com?subject='+encodeURIComponent(b.dataset.subject);$('#email-link').href=url;$('#email-button').href=url});
if($('#copy'))$('#copy').onclick=async()=>{try{await navigator.clipboard.writeText('chirag.92217@gmail.com');$('#copy-status').textContent='Email copied — ready when you are.'}catch{$('#copy-status').textContent='chirag.92217@gmail.com'}};
// Full-size personal photos, with native Escape handling and focus restoration.
if(document.querySelector('.photo-open')){
 const dlg=document.createElement('dialog');dlg.className='photo-dialog';dlg.setAttribute('aria-label','Photo viewer');
 const close=document.createElement('button');close.className='close';close.textContent='✕';close.setAttribute('aria-label','Close photo');
 const full=document.createElement('img');dlg.append(close,full);document.body.append(dlg);
 close.onclick=()=>dlg.close();dlg.addEventListener('click',e=>{if(e.target===dlg){const r=dlg.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dlg.close()}});
 document.querySelectorAll('.photo-open').forEach(b=>b.onclick=()=>{full.src=b.dataset.photo;full.alt=b.querySelector('img').alt;dlg.showModal()});
}
