const ADMIN_PASSWORD='UmairBIM@2026',STORE='umair_portfolio_v6';
const DB_NAME='umair_portfolio',DB_STORE='portfolio',DB_VERSION=1;
const MAX_IMG_DIM=1200;          // resize images larger than this
const IMG_QUALITY=0.78;          // JPEG quality for compression
const MAX_FILE_SIZE=50*1024*1024; // keep exported static assets within a practical size

let isAdmin=false,editContext=null,pendingFiles=[];

let data={
profilePic:null,logoPic:null,
hero:{eyebrowName:'Umair Ahmad',line1:'Mechanical',line2:'BIM',line3:'Engineer',
titles:[
{id:1,icon:'🏗️',color:'blue',text:'MEP Revit Modeler & Detailer'},
{id:2,icon:'🌬️',color:'teal',text:'HVAC Ducting Modeler & Detailer'},
{id:3,icon:'🔧',color:'gold',text:'HVAC Piping Modeler & Detailer'},
{id:4,icon:'📐',color:'blue',text:'BIM Coordinator · Clash Detection Expert'}
],
desc:'Delivering precision <strong>MEP BIM models</strong>, detailed HVAC ducting & piping layouts for international projects. Based in Pakistan — open to <span class="hl">UAE · KSA · Qatar</span>.',
keywords:[{text:'Revit MEP',type:'bim'},{text:'Navisworks',type:'bim'},{text:'HVAC Ducting',type:'hvac'},{text:'Piping Systems',type:'hvac'},{text:'BIM Coordination',type:'bim'},{text:'Clash Detection',type:'hvac'},{text:'Shop Drawings',type:'bim'},{text:'LOD 300–450',type:'bim'},{text:'SolidWorks',type:'sw'},{text:'ANSYS',type:'sim'},{text:'ABAQUS',type:'sim'},{text:'COMSOL',type:'sim'},{text:'ISO 19650',type:'std'},{text:'AutoCAD',type:'hvac'}]
},
about:{eyebrow:'Who I Am',title:'About <em>Umair Ahmad</em>',desc:'A detail-driven Mechanical BIM Engineer with real international project experience.',
blocks:[{id:1,title:'Professional Profile',color:'blue',text:'I am a <strong>Mechanical BIM Engineer</strong> and <strong>MEP Revit Modeler & Detailer</strong> with hands-on experience at <strong>BIMTEQ</strong>.'},
{id:2,title:'HVAC Ducting & Piping',color:'teal',text:'Specialized in <strong>HVAC Ducting Modeling & Detailing</strong> using <strong>Autodesk Revit MEP</strong>.'},
{id:3,title:'BIM Coordination',color:'gold',text:'Using <strong>Autodesk Navisworks</strong>, I perform full multidisciplinary BIM coordination.'},
{id:4,title:'Simulation & Analysis',color:'lav',text:'Skills in <strong>SolidWorks</strong>, <strong>ANSYS</strong>, <strong>ABAQUS</strong>, and <strong>COMSOL</strong>.'}],
capabilities:[{id:1,icon:'🏗️',bg:'rgba(41,128,185,.12)',title:'MEP Revit Modeling',desc:'Full MEP system models to LOD 300–450.'},{id:2,icon:'🌬️',bg:'rgba(26,188,156,.12)',title:'HVAC Ducting',desc:'Supply, return, and exhaust duct systems.'},{id:3,icon:'🔧',bg:'rgba(230,126,34,.12)',title:'Piping Modeling',desc:'Chilled water, drainage piping systems.'},{id:4,icon:'🔍',bg:'rgba(142,68,173,.12)',title:'Clash Detection',desc:'Navisworks-based clash detection.'},{id:5,icon:'📐',bg:'rgba(192,57,43,.12)',title:'Shop Drawings',desc:'MEP shop and coordination drawings.'}],
infoPills:['📍 Peshawar, Pakistan','🎓 B.Sc. ME — UET Mardan','🌐 Open: UAE · KSA · Qatar','🗣️ English · Urdu · Pashto']},
cc:{eyebrow:'Strengths',title:'Core <em>Competence</em>',desc:'Key strengths across BIM, MEP, simulation.',
items:[{id:1,icon:'🎯',title:'Precision Modeling',desc:'Accurate LOD 400-450 BIM models.'},{id:2,icon:'🤝',title:'Team Coordination',desc:'Effective multidisciplinary collaboration.'},{id:3,icon:'⚡',title:'Fast Delivery',desc:'Quick turnaround on shop drawings.'},{id:4,icon:'🌍',title:'International Exposure',desc:'US healthcare and commercial projects.'}]},
experiences:[{id:1,role:'BIM Engineer',date:'Aug 2025 – May 2026',company:'BIMTEQ — Lahore, Pakistan · American Houston HQ (USA)',
bullets:['Developed <strong>MEP BIM models up to LOD 400–450</strong> in Revit MEP for multi-floor US healthcare and commercial projects — covering HVAC ducting, chilled water, ventilation and plumbing networks.','Performed <strong>clash detection & BIM coordination</strong> using Navisworks; identified and resolved <strong>100+ interdisciplinary MEP clashes</strong> across mechanical, electrical and plumbing systems.','Designed and optimized <strong>HVAC ducting and piping layouts</strong> in Revit & AutoCAD, ensuring compliance with project specs and international design standards.','Prepared detailed <strong>MEP shop drawings and technical documentation</strong> to support fabrication, installation and site execution.','Collaborated with <strong>multidisciplinary teams</strong> (architectural, structural, MEP) to deliver US client projects on time.'],
tags:['Revit MEP','Navisworks','HVAC Ducting','Piping Systems','Clash Detection','BIM Coordination'],files:[]}],
interns:[{id:1,title:'Pakistan Locomotive Factory, Risalpur',co:'Risalpur · Aug 2023 · 1 Month',desc:'Hands-on exposure to large-scale <strong>mechanical systems</strong> and locomotive manufacturing operations, observing machining, assembly and maintenance workflows in an industrial setting.',files:[]},{id:2,title:'Aircraft Rebuild Factory — PAC Kamra',co:'PAC Kamra · Jul–Aug 2024 · 2 Weeks',desc:'Engineering operations exposure at an aircraft rebuild facility — observed <strong>precision engineering, quality control and overhaul processes</strong> for aerospace components.',files:[]}],
projectCategories:[
{key:'bim',name:'BIM/MEP Projects',color:'#2980b9',icon:'🔵'},
{key:'sw',name:'SolidWorks Projects',color:'#e67e22',icon:'🟠'},
{key:'sim',name:'Simulation Projects',color:'#8e44ad',icon:'🟣'},
{key:'fyp',name:'Final Year Design Project',color:'#f1c40f',icon:'⭐'}
],
projects:{
bim:[{id:1,num:'BIM-01',name:'HCA Healthcare – Clearlake Campus',sub:'6-Floor Healthcare Facility · USA',desc:'Developed full <strong>MEP BIM models to LOD 400–450</strong> in Revit MEP for a 6-floor US healthcare facility. Modeled and detailed <strong>HVAC ducting, chilled water and ventilation networks, and plumbing systems</strong> across all floors. Performed multidisciplinary <strong>clash detection in Navisworks</strong> and produced coordinated <strong>MEP shop drawings</strong> for fabrication and site execution.',files:[]},{id:2,num:'BIM-02',name:'Baytown Campus – Borden Street',sub:'4-Floor Renovation · USA',desc:'Produced coordinated <strong>3D MEP renovation models</strong> for a 4-floor US campus building. Carried out <strong>clash detection</strong> across mechanical, electrical and plumbing systems and prepared <strong>HVAC, piping and electrical shop drawings</strong> with full BIM coordination to align with existing site conditions.',files:[]},{id:3,num:'BIM-03',name:'New Caney I.S.D – Elementary School',sub:'New Build · USA',desc:'Delivered <strong>HVAC and plumbing Revit modeling</strong> for a new-build US elementary school. Handled <strong>piping population, clash detection and interdisciplinary coordination</strong> strictly per the issued project drawings and international design standards.',files:[]}],
sw:[{id:1,num:'SW-01',name:'Steam Engine with Horizontal Beam',sub:'3D Assembly · Motion Study',desc:'Built a fully functional <strong>steam engine 3D assembly</strong> in SolidWorks, applying mechanical mates and running a <strong>motion study</strong> to validate the kinematics of the horizontal beam linkage.',files:[]},{id:2,num:'SW-02',name:'Four-Cylinder Engine Model',sub:'3D Assembly · Kinematics',desc:'Modeled a detailed <strong>4-cylinder engine assembly</strong> with crankshaft, pistons and connecting rods, and performed a <strong>motion study</strong> to analyze the reciprocating-to-rotary mechanism.',files:[]},{id:3,num:'SW-03',name:'6-Cylinder Radial Engine',sub:'Advanced 3D Assembly',desc:'Created an advanced <strong>6-cylinder radial engine</strong> assembly in SolidWorks with synchronized piston motion and master-rod kinematics through a full motion study.',files:[]},{id:4,num:'SW-04',name:'Hybrid Food Dehydrator 3D Model',sub:'FYDP · Fabrication Model',desc:'Produced the complete <strong>SolidWorks 3D model</strong> of the Final Year Design Project hybrid food dehydrator, used as the basis for fabrication and assembly.',files:[]},{id:5,num:'SW-05',name:'FEA on Stirling Engine',sub:'FEA · Stress Analysis',desc:'Performed <strong>finite element analysis</strong> on Stirling engine components, evaluating <strong>Von Mises stress</strong> distribution and structural integrity under operating loads.',files:[]},{id:6,num:'SW-06',name:'Shell & Tube Heat Exchanger',sub:'Design + CFD Simulation',desc:'Completed the <strong>full design of a shell & tube heat exchanger</strong> plus <strong>CFD simulation</strong> — generating temperature, velocity and pressure profiles to validate heat-transfer performance.',files:[]}],
sim:[{id:1,num:'ANSYS-01',name:'Static Structural Analysis on Beams',sub:'ANSYS Mechanical',desc:'Conducted <strong>static structural analysis</strong> on beams in ANSYS, evaluating stress distribution, deflection and factor of safety under applied loading.',files:[]},{id:2,num:'ANSYS-02',name:'Steady-State Thermal on Plates',sub:'ANSYS Thermal',desc:'Performed <strong>steady-state thermal analysis</strong> on plates to study heat distribution and temperature gradients across the geometry.',files:[]},{id:3,num:'ANSYS-03',name:'Fluid Flow in Pipes & Ducts',sub:'ANSYS CFX · CFD',desc:'Ran <strong>CFD flow analysis using ANSYS CFX</strong> for fluid flow through pipes and ducts, examining velocity fields, pressure drop and flow behavior.',files:[]},{id:4,num:'ABAQUS-01',name:'Bullet Impact Simulation',sub:'Explicit Dynamics',desc:'Simulated <strong>high-velocity bullet impact on a metal plate</strong> in Abaqus using <strong>explicit dynamics</strong> — studying stress waves, failure behavior and applying advanced meshing techniques.',files:[]},{id:5,num:'COMSOL-01',name:'Microscale Droplet Formation',sub:'Multiphase CFD',desc:'Modeled <strong>1-second transient oil/water droplet formation</strong> in COMSOL Multiphysics, analyzing pressure, velocity and volume-fraction in a multiphase microscale flow.',files:[]}],
fyp:[{id:1,num:'FYDP',name:'Design & Fabrication of Affordable Hybrid Food Dehydrator',sub:'Solar/DC/AC · IoT · Arduino & ESP8266 · SolidWorks',desc:'Designed and fabricated a low-cost <strong>hybrid food dehydrator</strong> powered by a combined <strong>Solar / DC / AC system</strong>. Integrated <strong>IoT monitoring via Arduino & ESP8266</strong> and a <strong>servo-controlled heat/shading mechanism</strong> for temperature regulation. Delivered a full <strong>SolidWorks design model</strong> followed by physical fabrication and testing.',tags:['Solar Energy','IoT','Arduino','ESP8266','Servo Control','SolidWorks'],files:[]}]
},
galleryCategories:['BIM / MEP','HVAC Ducting','Piping Systems','SolidWorks','ANSYS / Simulation','Final Year Project'],
gallery:[],
skills:{eyebrow:'Technical Arsenal',title:'Skills & <em>Software</em>',desc:'Full-spectrum mechanical engineering skill set.',
categories:[{id:1,icon:'🏗️',bg:'rgba(41,128,185,.10)',name:'BIM & MEP Tools',skills:[{text:'Revit MEP',level:'adv'},{text:'Navisworks',level:'adv'},{text:'AutoCAD',level:'int'},{text:'BIM Coordination',level:'std'},{text:'Clash Detection',level:'std'}]},
{id:2,icon:'🌬️',bg:'rgba(26,188,156,.10)',name:'HVAC & Piping',skills:[{text:'HVAC Ducting Design',level:'adv'},{text:'Piping Modeling',level:'adv'},{text:'Chilled Water Systems',level:'std'}]},
{id:3,icon:'⚙️',bg:'rgba(230,126,34,.10)',name:'CAD / Simulation',skills:[{text:'SolidWorks',level:'adv'},{text:'ANSYS',level:'adv'},{text:'ABAQUS',level:'int'},{text:'COMSOL',level:'int'}]},
{id:4,icon:'📋',bg:'rgba(142,68,173,.10)',name:'Standards & Soft Skills',skills:[{text:'ISO 19650',level:'std'},{text:'MS Excel',level:'adv'},{text:'Team Collaboration',level:'neu'}]}],
bars:[{name:'Revit MEP',pct:95},{name:'Navisworks',pct:92},{name:'HVAC Ducting',pct:90},{name:'Piping Modeling',pct:88},{name:'SolidWorks',pct:90},{name:'ANSYS',pct:85},{name:'AutoCAD',pct:78},{name:'ABAQUS / COMSOL',pct:72}]},
education:{eyebrow:'Academic Background',title:'Education & <em>Certifications</em>',
degrees:[{id:1,deg:'B.Sc. Mechanical Engineering',sch:'University of Engineering & Technology, Mardan',year:'2021 – 2025',gpa:'CGPA: 3.53 / 4.0',files:[]},{id:2,deg:'F.Sc. Pre-Engineering',sch:'Government College Peshawar',year:'2018 – 2020',gpa:'881/1100 (80%)',files:[]},{id:3,deg:'SSC — Science',sch:'Hira Public School, Peshawar',year:'2016 – 2018',gpa:'997/1100 (90.63%)',files:[]}],
certs:[{id:1,name:'2-Day Workshop — SolidWorks',year:'Aug 2022',files:[]},{id:2,name:'Mechanical Workshop Technology',year:'Sep 2022',files:[]},{id:3,name:'4th Intl Workshop — Reverse Engineering',year:'Dec 2022',files:[]},{id:4,name:'5th Intl Workshop — Reverse Engineering',year:'Dec 2023',files:[]},{id:5,name:'6th Intl Workshop — Reverse Engineering',year:'Dec 2024',files:[]},{id:6,name:'Student Volunteer — Orientation, UET Mardan',year:'Sep 2024',files:[]},{id:7,name:'Student Volunteer — Welcome Party, UET Mardan',year:'Oct 2024',files:[]}]},
contact:{eyebrow:'Get In Touch',title:"Let's <em>Connect</em>",desc:'Available for BIM Engineer · MEP Revit Modeler · HVAC roles in GCC.',
gccFlags:'🇦🇪 🇸🇦 🇶🇦',gcc:'Actively seeking opportunities in UAE · Saudi Arabia · Qatar',
cards:[{id:1,icon:'✉️',label:'Email',value:'engr.umair.ahmad111@gmail.com',link:'mailto:engr.umair.ahmad111@gmail.com'},{id:2,icon:'💬',label:'WhatsApp',value:'+92-308-8025062',link:'https://wa.me/923088025062'},{id:3,icon:'📞',label:'Phone',value:'+92-308-8025062',link:'tel:+923088025062'},{id:4,icon:'🔗',label:'LinkedIn',value:'umair-ahmad-03585b366',link:'https://www.linkedin.com/in/umair-ahmad-03585b366/'},{id:5,icon:'📍',label:'Location',value:'Peshawar, KPK, Pakistan',link:''},{id:6,icon:'🌐',label:'Open To',value:'UAE · Saudi Arabia · Qatar',link:''}]}
};

const $=id=>document.getElementById(id);
const esc=s=>{const d=document.createElement('div');d.textContent=s;return d.innerHTML};
const uid=()=>Date.now()+Math.floor(Math.random()*1000);
const getFileIcon=n=>{const e=(n||'').split('.').pop().toLowerCase();return{pdf:'📄',doc:'📝',docx:'📝',xls:'📊',xlsx:'📊',ppt:'📑',pptx:'📑',jpg:'🖼️',jpeg:'🖼️',png:'🖼️',gif:'🖼️',webp:'🖼️',svg:'🖼️'}[e]||'📁'};
const isImage=n=>{const e=(n||'').split('.').pop().toLowerCase();return['jpg','jpeg','png','gif','webp','svg','bmp'].includes(e)};
const isPdf=n=>(n||'').toLowerCase().endsWith('.pdf');
const fmtSize=b=>b<1024?b+' B':b<1048576?(b/1024).toFixed(1)+' KB':(b/1048576).toFixed(2)+' MB';

function showToast(m,t='info'){const e=$('toast');e.textContent=m;e.className=`toast toast-${t} show`;clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('show'),3800)}

// ════════ IMAGE COMPRESSION ════════
function compressImage(file){
return new Promise((resolve,reject)=>{
const reader=new FileReader();
reader.onload=e=>{
const img=new Image();
img.onload=()=>{
let{width,height}=img;
if(width>MAX_IMG_DIM||height>MAX_IMG_DIM){
if(width>height){height=Math.round(height*(MAX_IMG_DIM/width));width=MAX_IMG_DIM}
else{width=Math.round(width*(MAX_IMG_DIM/height));height=MAX_IMG_DIM}
}
const canvas=document.createElement('canvas');
canvas.width=width;canvas.height=height;
const ctx=canvas.getContext('2d');
ctx.fillStyle='#fff';ctx.fillRect(0,0,width,height);
ctx.drawImage(img,0,0,width,height);
const dataUrl=canvas.toDataURL('image/jpeg',IMG_QUALITY);
resolve({data:dataUrl,size:Math.round(dataUrl.length*0.75)});
};
img.onerror=reject;
img.src=e.target.result;
};
reader.onerror=reject;
reader.readAsDataURL(file);
});
}

function readFileRaw(file){
return new Promise((resolve,reject)=>{
const r=new FileReader();
r.onload=e=>resolve({data:e.target.result,size:file.size});
r.onerror=reject;
r.readAsDataURL(file);
});
}

async function processFile(file){
try{
let result;
if(file.type.startsWith('image/')&&!file.type.includes('svg')){
result=await compressImage(file);
}else{
if(file.size>MAX_FILE_SIZE){
showToast(`⚠️ "${file.name}" too large (${fmtSize(file.size)}). Max ${fmtSize(MAX_FILE_SIZE)}.`,'error');
return null;
}
result=await readFileRaw(file);
}
return{name:file.name,type:file.type,data:result.data,size:result.size,origSize:file.size};
}catch(e){
showToast('⚠️ Failed to process '+file.name,'error');
return null;
}
}

// ════════ STORAGE ════════
function getStorageUsage(){
try{return new Blob([JSON.stringify(data)]).size}catch{return 0}
}

function openPortfolioDB(){
return new Promise((resolve,reject)=>{
const request=indexedDB.open(DB_NAME,DB_VERSION);
request.onupgradeneeded=()=>{
const db=request.result;
if(!db.objectStoreNames.contains(DB_STORE))db.createObjectStore(DB_STORE);
};
request.onsuccess=()=>resolve(request.result);
request.onerror=()=>reject(request.error);
});
}

async function readPortfolioDB(){
const db=await openPortfolioDB();
return new Promise((resolve,reject)=>{
const tx=db.transaction(DB_STORE,'readonly');
const request=tx.objectStore(DB_STORE).get(STORE);
request.onsuccess=()=>resolve(request.result||null);
request.onerror=()=>reject(request.error);
tx.oncomplete=()=>db.close();
});
}

async function writePortfolioDB(value){
const db=await openPortfolioDB();
return new Promise((resolve,reject)=>{
const tx=db.transaction(DB_STORE,'readwrite');
tx.objectStore(DB_STORE).put(value,STORE);
tx.oncomplete=()=>{db.close();resolve()};
tx.onerror=()=>{db.close();reject(tx.error)};
tx.onabort=()=>{db.close();reject(tx.error)};
});
}

async function savePortfolio(silent=false){
try{
await writePortfolioDB(data);
const b=$('saveBtn');b.classList.add('saving');setTimeout(()=>b.classList.remove('saving'),600);
if(!silent){
const used=getStorageUsage();
showToast(`✅ Saved in browser (${fmtSize(used)}).`,'success');
}
return true;
}catch(e){
showToast('⚠️ Could not save. Your browser may be out of storage space or blocking IndexedDB.','error');
return false;
}
}

async function loadData(){
try{
// Personal edits saved in this browser always win.
const saved=await readPortfolioDB();
if(saved){data={...data,...saved};return}

// Migrate data from older versions that used the ~5 MB localStorage quota.
const legacy=localStorage.getItem(STORE);
if(legacy){
const parsed=JSON.parse(legacy);
data={...data,...parsed};
await writePortfolioDB(data);
localStorage.removeItem(STORE);
return;
}

// Otherwise, use data baked into the production HTML build.
if(window.__PORTFOLIO_DATA__){data={...data,...window.__PORTFOLIO_DATA__}}
}catch(e){
if(window.__PORTFOLIO_DATA__)data={...data,...window.__PORTFOLIO_DATA__};
console.warn('Portfolio storage is unavailable:',e);
}
}

// ════════ GENERATE PRODUCTION HTML (one-click deploy file) ════════
// Builds a standalone index.html with the current portfolio data baked in,
// then downloads it. Replace the repository index.html and redeploy to Vercel.
async function generateProductionHTML(){
if(!isAdmin)return showToast('⚠️ Enter admin mode first.','info');
showToast('⏳ Building your production index.html…','info');
try{
// Save latest edits so they are included.
await savePortfolio(true);

// Get a clean copy of this page's source.
let source='';
try{
const res=await fetch(window.location.href,{cache:'no-store'});
if(res.ok)source=await res.text();
}catch(e){/* fetch can fail on file:// — fall back below */}
if(!source||source.indexOf('__PORTFOLIO_DATA__')===-1&&source.indexOf('<body')===-1){
source='<!DOCTYPE html>\n'+document.documentElement.outerHTML;
}

// Remove any previously baked-in data block so re-generating stays clean.
source=source.replace(/<script id="portfolio-data">[\s\S]*?<\/script>\s*/i,'');

// Serialize current data (escape closing tags so it can't break the script).
const json=JSON.stringify(data).replace(/<\//g,'<\\/');
const dataScript='<script id="portfolio-data">window.__PORTFOLIO_DATA__='+json+';<\/script>\n';

// Inject right after the opening <body> tag.
if(/<body[^>]*>/i.test(source)){
source=source.replace(/(<body[^>]*>)/i,'$1\n'+dataScript);
}else{
source=dataScript+source;
}

// Strip the admin-mode class if it leaked into the markup.
source=source.replace(/(<body[^>]*class=")([^"]*)admin-mode\s*([^"]*)(")/i,'$1$2$3$4');

// Download.
const blob=new Blob([source],{type:'text/html'});
const url=URL.createObjectURL(blob);
const a=document.createElement('a');
a.href=url;a.download='index.html';
document.body.appendChild(a);a.click();a.remove();
URL.revokeObjectURL(url);
showToast('✅ index.html downloaded! Replace the project file and redeploy to Vercel.','success');
}catch(e){
showToast('⚠️ Could not generate production file. Try again.','error');
}
}

window.addEventListener('scroll',()=>{const p=(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight))*100;$('progressBar').style.width=Math.min(p,100)+'%';$('mainNav').classList.toggle('scrolled',window.scrollY>60);document.querySelectorAll('section[id]').forEach(s=>{if(window.scrollY+120>=s.offsetTop&&window.scrollY+120<s.offsetTop+s.offsetHeight)document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+s.id))})},{passive:true});
function toggleMobile(){$('mobileMenu').classList.toggle('open');$('burger').classList.toggle('open')}
function closeMobile(){$('mobileMenu').classList.remove('open');$('burger').classList.remove('open')}
function attachReveal(){const o=new IntersectionObserver(e=>e.forEach(en=>{if(en.isIntersecting)en.target.classList.add('visible')}),{threshold:.08});document.querySelectorAll('.reveal,.reveal-right').forEach(el=>o.observe(el))}

const phrases=['MEP Revit Modeler & Detailer','HVAC Ducting Specialist','BIM Coordination Expert','Clash Detection Engineer'];
let pi=0,ci=0,del=false;
function typeLoop(){const e=$('typedText');if(!e)return;const p=phrases[pi];if(!del){e.textContent=p.slice(0,++ci);if(ci===p.length){del=true;setTimeout(typeLoop,1800);return}setTimeout(typeLoop,55)}else{e.textContent=p.slice(0,--ci);if(ci===0){del=false;pi=(pi+1)%phrases.length;setTimeout(typeLoop,300);return}setTimeout(typeLoop,30)}}

function showTab(key,btn){document.querySelectorAll('.tab-pane').forEach(p=>p.classList.remove('on'));document.querySelectorAll('.ptab').forEach(b=>b.classList.remove('on'));const pane=document.getElementById('tp-'+key);if(pane)pane.classList.add('on');if(btn)btn.classList.add('on')}

function toggleAdmin(){if(isAdmin){lockAdmin();return}$('pwdOverlay').classList.add('open');setTimeout(()=>$('pwdInput').focus(),200)}
function closePwdModal(){$('pwdOverlay').classList.remove('open');$('pwdInput').value='';$('pwdError').textContent='';$('pwdInput').classList.remove('wrong')}
function checkPassword(){const i=$('pwdInput');if(i.value===ADMIN_PASSWORD){isAdmin=true;closePwdModal();document.body.classList.add('admin-mode');$('adminBar').classList.add('show');$('adminToggle').classList.add('active');$('adminToggle').textContent='🔓';$('addDegBtn').style.display='inline-flex';$('addCertBtn').style.display='inline-flex';renderAll();showToast('🔓 Admin mode activated!','success')}else{i.classList.add('wrong');$('pwdError').textContent='❌ Incorrect password.';i.value='';setTimeout(()=>{i.classList.remove('wrong');i.focus()},500)}}
function lockAdmin(){isAdmin=false;document.body.classList.remove('admin-mode');$('adminBar').classList.remove('show');$('adminToggle').classList.remove('active');$('adminToggle').textContent='🔒';$('addDegBtn').style.display='none';$('addCertBtn').style.display='none';renderAll();showToast('🔒 Admin mode locked.','info')}
function togglePwdVis(){const i=$('pwdInput'),e=$('pwdEye');if(i.type==='password'){i.type='text';e.textContent='🙈'}else{i.type='password';e.textContent='👁️'}}
$('pwdOverlay').addEventListener('click',e=>{if(e.target===$('pwdOverlay'))closePwdModal()});

// MODAL
function openEditModal(title,subtitle,fields,onSave,wide=false){
if(!isAdmin){showToast('⚠️ Enter admin mode first.','error');return}
editContext={fields,onSave};pendingFiles=[];
$('editModalTitle').textContent=title;$('editModalSubtitle').textContent=subtitle||'';
$('editModalBox').classList.toggle('wide',wide);
let h='';
fields.forEach(f=>{
if(f.type==='text')h+=`<div class="form-group"><label class="form-label">${esc(f.label)}${f.required?' <span class="req">*</span>':''}</label><input type="text" class="form-input" id="ef-${f.key}" value="${esc(f.value||'')}" placeholder="${esc(f.placeholder||'')}"></div>`;
else if(f.type==='textarea')h+=`<div class="form-group"><label class="form-label">${esc(f.label)}${f.required?' <span class="req">*</span>':''}</label><textarea class="form-textarea" id="ef-${f.key}" placeholder="${esc(f.placeholder||'')}" rows="${f.rows||4}">${esc(f.value||'')}</textarea>${f.hint?`<div class="form-hint">${esc(f.hint)}</div>`:''}</div>`;
else if(f.type==='select'){
h+=`<div class="form-group"><label class="form-label">${esc(f.label)}</label><select class="form-select" id="ef-${f.key}">${f.options.map(o=>`<option value="${esc(o.value)}" ${o.value===f.value?'selected':''}>${esc(o.label)}</option>`).join('')}</select>`;
if(f.allowCustom)h+=`<div class="cat-input-wrap" style="margin-top:8px"><input type="text" class="form-input" id="ef-${f.key}-custom" placeholder="Or type new category..."><button type="button" class="cat-add-btn" onclick="addCustomCatOption('${f.key}')">＋ Add</button></div>`;
h+=`</div>`;
}
else if(f.type==='row'){h+=`<div class="form-row">`;f.fields.forEach(sub=>{if(sub.type==='text')h+=`<div class="form-group"><label class="form-label">${esc(sub.label)}${sub.required?' <span class="req">*</span>':''}</label><input type="text" class="form-input" id="ef-${sub.key}" value="${esc(sub.value||'')}" placeholder="${esc(sub.placeholder||'')}"></div>`});h+=`</div>`}
else if(f.type==='files')h+=`<div class="form-group"><label class="form-label">${esc(f.label)}</label><div class="upload-zone" onclick="document.getElementById('hiddenMultiFileInput').click()"><div class="uz-icon">📎</div><p>Click or <span class="uz-link">drag & drop</span></p><p class="uz-sub">Images, documents and project files — multiple files</p></div><div class="upload-info">💡 <strong>Auto-compress:</strong> Images resized to ${MAX_IMG_DIM}px max & compressed to save storage. Max file size: ${fmtSize(MAX_FILE_SIZE)}.</div><div class="file-previews" id="modalFilePreviews"></div></div>`;
});
$('editModalBody').innerHTML=h;$('editOverlay').classList.add('open');
}

function addCustomCatOption(key){const inp=$('ef-'+key+'-custom');const sel=$('ef-'+key);if(!inp||!sel)return;const v=inp.value.trim();if(!v){showToast('⚠️ Enter a category name.','error');return}const opt=document.createElement('option');opt.value=v;opt.textContent=v;opt.selected=true;sel.appendChild(opt);inp.value='';showToast('✅ Category added!','success')}

function closeEditModal(){$('editOverlay').classList.remove('open');editContext=null;pendingFiles=[]}
function saveEditModal(){if(!editContext)return;const v={};editContext.fields.forEach(f=>{if(f.type==='row'){f.fields.forEach(sub=>{const e=$('ef-'+sub.key);if(e)v[sub.key]=e.value})}else if(f.type!=='files'){const e=$('ef-'+f.key);if(e)v[f.key]=e.value}});v._files=pendingFiles.slice();editContext.onSave(v);closeEditModal();savePortfolio(true)}
$('editOverlay').addEventListener('click',e=>{if(e.target===$('editOverlay'))closeEditModal()});

$('hiddenMultiFileInput').addEventListener('change',async function(){
const files=Array.from(this.files);
showToast(`⏳ Processing ${files.length} file(s)...`,'info');
for(const f of files){const res=await processFile(f);if(res){pendingFiles.push(res);renderModalFilePreviews()}}
this.value='';
showToast('✅ Files ready','success');
});

function renderModalFilePreviews(){
const c=$('modalFilePreviews');if(!c)return;
c.innerHTML=pendingFiles.map((f,i)=>{
const compressed=f.origSize&&f.size<f.origSize;
return `<div class="file-preview ${compressed?'compressed':''}">
<span class="fp-icon">${getFileIcon(f.name)}</span>
<span>${esc(f.name.length>20?f.name.slice(0,17)+'...':f.name)}</span>
<span class="fp-size">${fmtSize(f.size)}${compressed?' ✓':''}</span>
<button type="button" class="fp-remove" onclick="pendingFiles.splice(${i},1);renderModalFilePreviews()">✕</button>
</div>`;
}).join('');
}

function openFsPreview(file){
const ov=$('fsOverlay'),title=$('fsTitle'),content=$('fsContent'),dl=$('fsDownload');
title.textContent=file.name;
dl.onclick=()=>{const a=document.createElement('a');a.href=file.data;a.download=file.name;document.body.appendChild(a);a.click();a.remove()};
if(isImage(file.name)){content.innerHTML=`<img src="${file.data}" alt="${esc(file.name)}">`}
else if(isPdf(file.name)){content.innerHTML=`<iframe src="${file.data}"></iframe>`}
else{const ext=file.name.split('.').pop().toUpperCase();content.innerHTML=`<div class="fs-doc"><div class="fs-doc-icon">${getFileIcon(file.name)}</div><h3>${esc(file.name)}</h3><p>This is a ${esc(ext)} file. Browsers cannot preview Office documents directly. Click Download to view.</p><button class="fs-btn" style="background:var(--sky);color:#fff" onclick="document.getElementById('fsDownload').click()">⬇ Download File</button></div>`}
ov.classList.add('open');
}
function closeFsPreview(){$('fsOverlay').classList.remove('open');$('fsContent').innerHTML=''}
$('fsOverlay').addEventListener('click',e=>{if(e.target===$('fsOverlay'))closeFsPreview()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('fsOverlay').classList.contains('open'))closeFsPreview()});

function renderFiles(files,owner,ownerType){
if(!files||!files.length)return '';
return `<div class="attached-files">${files.map((f,i)=>`<span class="afile" onclick="previewFileByRef('${ownerType}',${owner},${i})"><span class="afile-icon">${getFileIcon(f.name)}</span><span class="afile-name">${esc(f.name)}</span><button type="button" class="afile-x" onclick="event.stopPropagation();removeAttachedFile('${ownerType}',${owner},${i})">✕</button></span>`).join('')}</div>`;
}

function previewFileByRef(type,id,idx){
let f=null;
if(type==='exp'){const o=data.experiences.find(x=>x.id===id);if(o)f=o.files[idx]}
else if(type==='int'){const o=data.interns.find(x=>x.id===id);if(o)f=o.files[idx]}
else if(type==='proj'){for(const k of Object.keys(data.projects)){const o=data.projects[k].find(x=>x.id===id);if(o){f=o.files[idx];break}}}
else if(type==='deg'){const o=data.education.degrees.find(x=>x.id===id);if(o)f=o.files[idx]}
else if(type==='cert'){const o=data.education.certs.find(x=>x.id===id);if(o)f=o.files[idx]}
else if(type==='gal'){const o=data.gallery.find(x=>x.id===id);if(o)f=o.files[idx]}
if(f)openFsPreview(f);
}

function removeAttachedFile(type,id,idx){
if(!isAdmin)return;
if(!confirm('Remove this file?'))return;
let target=null;
if(type==='exp')target=data.experiences.find(x=>x.id===id);
else if(type==='int')target=data.interns.find(x=>x.id===id);
else if(type==='proj'){for(const k of Object.keys(data.projects)){const o=data.projects[k].find(x=>x.id===id);if(o){target=o;break}}}
else if(type==='deg')target=data.education.degrees.find(x=>x.id===id);
else if(type==='cert')target=data.education.certs.find(x=>x.id===id);
else if(type==='gal')target=data.gallery.find(x=>x.id===id);
if(target&&target.files){target.files.splice(idx,1);renderAll();savePortfolio(true);showToast('🗑️ File removed','info')}
}

function adminUploadProfile(){if(!isAdmin)return showToast('⚠️ Enter admin mode.','info');const i=$('hiddenFileInput');i.onchange=async function(){const f=this.files[0];if(!f)return;showToast('⏳ Compressing...','info');const result=await compressImage(f);data.profilePic=result.data;renderProfile();savePortfolio(true);showToast('✅ Profile updated!','success');this.value=''};i.click()}
function adminUploadLogo(){if(!isAdmin)return showToast('⚠️ Enter admin mode.','info');const i=$('hiddenFileInput');i.onchange=async function(){const f=this.files[0];if(!f)return;showToast('⏳ Compressing...','info');const result=await compressImage(f);data.logoPic=result.data;renderLogo();savePortfolio(true);showToast('✅ Logo updated!','success');this.value=''};i.click()}
function renderProfile(){if(data.profilePic){$('profileImg').src=data.profilePic;$('profileImg').style.display='block';$('profileInitial').style.display='none'}else{$('profileImg').style.display='none';$('profileInitial').style.display='block'}}
function renderLogo(){if(data.logoPic){$('logoImg').src=data.logoPic;$('logoImg').style.display='block';$('logoText').style.display='none'}else{$('logoImg').style.display='none';$('logoText').style.display='block'}}

// ════════ HERO with EDITABLE TITLES ════════
function renderHero(){
$('heroTagName').textContent=data.hero.eyebrowName;$('heroLine1').textContent=data.hero.line1;$('heroLine2').textContent=data.hero.line2;$('heroLine3').textContent=data.hero.line3;$('heroDesc').innerHTML=data.hero.desc;$('navName').textContent=data.hero.eyebrowName;

// Each title now has edit/remove buttons
$('heroTitles').innerHTML=data.hero.titles.map(t=>`
<div class="hero-title-item">
<div class="hero-title-row"><span class="hticon hticon-${t.color}">${t.icon}</span><span>${esc(t.text)}</span></div>
<div class="hero-title-actions">
<button class="hta-btn hta-edit" onclick="editHeroTitle(${t.id})" title="Edit">✎</button>
<button class="hta-btn hta-rm" onclick="removeHeroTitle(${t.id})" title="Remove">✕</button>
</div>
</div>
`).join('');

$('chipWrap').innerHTML=data.hero.keywords.map((k,i)=>`<span class="chip chip-${k.type}">${esc(k.text)}<button class="chip-x" onclick="removeKeyword(${i})">✕</button></span>`).join('');

let total=0;
let statsHtml='';
data.projectCategories.forEach(cat=>{
const count=(data.projects[cat.key]||[]).length;
total+=count;
statsHtml+=`<a class="hstat" href="#projects" onclick="event.preventDefault();scrollAndTab('${cat.key}')"><div class="hstat-num">${count}</div><div class="hstat-label">${esc(cat.name)}</div></a>`;
});
statsHtml=`<a class="hstat hstat-total" href="#projects" onclick="event.preventDefault();document.querySelector('#projects').scrollIntoView({behavior:'smooth'})"><div class="hstat-num">${total}</div><div class="hstat-label">Total Projects</div></a>`+statsHtml;
const certCount=data.education.certs.length;
statsHtml+=`<a class="hstat" href="#education" onclick="event.preventDefault();document.querySelector('#education').scrollIntoView({behavior:'smooth'})"><div class="hstat-num">3.53</div><div class="hstat-label">CGPA — UET</div></a>`;
statsHtml+=`<a class="hstat" href="#education" onclick="event.preventDefault();document.querySelector('#education').scrollIntoView({behavior:'smooth'})"><div class="hstat-num">${certCount}</div><div class="hstat-label">Certifications</div></a>`;
$('heroStats').innerHTML=statsHtml;
}

function scrollAndTab(key){document.querySelector('#projects').scrollIntoView({behavior:'smooth'});setTimeout(()=>{const tab=document.querySelector(`.ptab[data-key="${key}"]`);if(tab)tab.click()},700)}

function editHero(){openEditModal('Edit Hero Section','Update main introduction',[{type:'text',key:'eyebrowName',label:'Name',value:data.hero.eyebrowName,required:true},{type:'row',fields:[{type:'text',key:'line1',label:'Line 1',value:data.hero.line1},{type:'text',key:'line2',label:'Accent',value:data.hero.line2},{type:'text',key:'line3',label:'Line 3',value:data.hero.line3}]},{type:'textarea',key:'desc',label:'Description',value:data.hero.desc,rows:5,hint:'HTML allowed'}],v=>{data.hero.eyebrowName=v.eyebrowName;data.hero.line1=v.line1;data.hero.line2=v.line2;data.hero.line3=v.line3;data.hero.desc=v.desc;renderHero()},true)}

// ════════ HERO TITLE add/edit/remove ════════
function addHeroTitle(){
if(!isAdmin)return showToast('⚠️ Enter admin mode.','info');
openEditModal('Add New Title / Role','Add a new title under your name',[
{type:'text',key:'icon',label:'Emoji Icon',value:'⚡',required:true,placeholder:'e.g. 🏗️'},
{type:'text',key:'text',label:'Title Text',required:true,placeholder:'e.g. Senior Engineer'},
{type:'select',key:'color',label:'Icon Background Color',value:'blue',options:[
{value:'blue',label:'🔵 Blue'},{value:'teal',label:'🟢 Teal'},{value:'gold',label:'🟠 Gold'},
{value:'lav',label:'🟣 Lavender'},{value:'red',label:'🔴 Red'},{value:'green',label:'💚 Green'}
]}
],v=>{
if(!v.icon||!v.text)return;
data.hero.titles.push({id:uid(),icon:v.icon,text:v.text,color:v.color});
renderHero();
})
}

function editHeroTitle(id){
const t=data.hero.titles.find(x=>x.id===id);if(!t)return;
openEditModal('Edit Title / Role','Update this title',[
{type:'text',key:'icon',label:'Emoji Icon',value:t.icon,required:true},
{type:'text',key:'text',label:'Title Text',value:t.text,required:true},
{type:'select',key:'color',label:'Icon Background Color',value:t.color,options:[
{value:'blue',label:'🔵 Blue'},{value:'teal',label:'🟢 Teal'},{value:'gold',label:'🟠 Gold'},
{value:'lav',label:'🟣 Lavender'},{value:'red',label:'🔴 Red'},{value:'green',label:'💚 Green'}
]}
],v=>{t.icon=v.icon;t.text=v.text;t.color=v.color;renderHero()})
}

function removeHeroTitle(id){
if(!isAdmin)return;
if(!confirm('Remove this title?'))return;
data.hero.titles=data.hero.titles.filter(t=>t.id!==id);
renderHero();savePortfolio(true);
showToast('🗑️ Title removed','info');
}

function addKeyword(){openEditModal('Add Keyword','Add a new expertise tag',[{type:'text',key:'text',label:'Keyword',placeholder:'e.g. Revit MEP',required:true},{type:'select',key:'type',label:'Color',value:'bim',options:[{value:'bim',label:'🔵 BIM'},{value:'hvac',label:'🟢 HVAC'},{value:'sw',label:'🟠 SolidWorks'},{value:'sim',label:'🟣 Simulation'},{value:'std',label:'🔴 Standards'}]}],v=>{if(v.text){data.hero.keywords.push({text:v.text,type:v.type});renderHero()}})}
function removeKeyword(i){if(!isAdmin)return;data.hero.keywords.splice(i,1);renderHero();savePortfolio(true)}

// ABOUT
function renderAbout(){$('aboutEy').textContent=data.about.eyebrow;$('aboutTitle').innerHTML=data.about.title;$('aboutDesc').textContent=data.about.desc;
$('aboutBlocks').innerHTML=data.about.blocks.map(b=>`<div class="about-block"><div class="about-block-header"><div class="abt-dot abt-dot-${b.color}"></div>${esc(b.title)}</div><p>${b.text}</p><div class="card-ctrl"><button class="cc-btn cc-edit" onclick="editAboutBlock(${b.id})">✎ Edit</button><button class="cc-btn cc-remove" onclick="removeAboutBlock(${b.id})">✕ Remove</button></div></div>`).join('');
$('capStack').innerHTML=data.about.capabilities.map(c=>`<div class="cap-card"><div class="cap-card-row"><div class="cap-icon" style="background:${c.bg}">${c.icon}</div><div style="flex:1"><div class="cap-title">${esc(c.title)}</div><div class="cap-desc">${esc(c.desc)}</div></div></div><div class="card-ctrl"><button class="cc-btn cc-edit" onclick="editCapability(${c.id})">✎</button><button class="cc-btn cc-remove" onclick="removeCapability(${c.id})">✕</button></div></div>`).join('')+`<div class="card-ctrl" style="border:none;padding:0"><button class="cc-btn cc-add" onclick="addCapability()" style="width:100%;padding:12px;justify-content:center">＋ Add Capability</button></div>`;
$('infoPills').innerHTML=data.about.infoPills.map((p,i)=>`<span class="info-pill">${esc(p)}<button class="ip-x" onclick="removeInfoPill(${i})">✕</button></span>`).join('')}
function addAboutBlock(){openEditModal('Add About Block','',[{type:'text',key:'title',label:'Title',required:true},{type:'select',key:'color',label:'Color',value:'blue',options:[{value:'blue',label:'🔵'},{value:'teal',label:'🟢'},{value:'gold',label:'🟠'},{value:'lav',label:'🟣'}]},{type:'textarea',key:'text',label:'Content',required:true,rows:6,hint:'HTML allowed'}],v=>{if(v.title&&v.text){data.about.blocks.push({id:uid(),title:v.title,color:v.color,text:v.text});renderAbout()}})}
function editAboutBlock(id){const b=data.about.blocks.find(x=>x.id===id);if(!b)return;openEditModal('Edit About Block','',[{type:'text',key:'title',label:'Title',value:b.title,required:true},{type:'select',key:'color',label:'Color',value:b.color,options:[{value:'blue',label:'🔵'},{value:'teal',label:'🟢'},{value:'gold',label:'🟠'},{value:'lav',label:'🟣'}]},{type:'textarea',key:'text',label:'Content',value:b.text,required:true,rows:6,hint:'HTML allowed'}],v=>{b.title=v.title;b.color=v.color;b.text=v.text;renderAbout()})}
function removeAboutBlock(id){if(!confirm('Remove?'))return;data.about.blocks=data.about.blocks.filter(x=>x.id!==id);renderAbout();savePortfolio(true)}
function addCapability(){openEditModal('Add Capability','',[{type:'text',key:'title',label:'Title',required:true},{type:'text',key:'icon',label:'Emoji',value:'🔧'},{type:'textarea',key:'desc',label:'Description',required:true,rows:3}],v=>{data.about.capabilities.push({id:uid(),icon:v.icon,bg:'rgba(41,128,185,.12)',title:v.title,desc:v.desc});renderAbout()})}
function editCapability(id){const c=data.about.capabilities.find(x=>x.id===id);if(!c)return;openEditModal('Edit Capability','',[{type:'text',key:'title',label:'Title',value:c.title,required:true},{type:'text',key:'icon',label:'Emoji',value:c.icon},{type:'textarea',key:'desc',label:'Description',value:c.desc,rows:3}],v=>{c.icon=v.icon;c.title=v.title;c.desc=v.desc;renderAbout()})}
function removeCapability(id){if(!confirm('Remove?'))return;data.about.capabilities=data.about.capabilities.filter(x=>x.id!==id);renderAbout();savePortfolio(true)}
function addInfoPill(){openEditModal('Add Info Pill','',[{type:'text',key:'text',label:'Pill Text',placeholder:'📍 City',required:true}],v=>{if(v.text){data.about.infoPills.push(v.text);renderAbout()}})}
function removeInfoPill(i){if(!isAdmin)return;data.about.infoPills.splice(i,1);renderAbout();savePortfolio(true)}

// CC
function renderCC(){$('ccEy').textContent=data.cc.eyebrow;$('ccTitle').innerHTML=data.cc.title;$('ccDesc').textContent=data.cc.desc;
$('ccGrid').innerHTML=data.cc.items.map(c=>`<div class="cc-card"><div class="cc-card-icon">${c.icon}</div><div class="cc-card-title">${esc(c.title)}</div><div class="cc-card-desc">${esc(c.desc)}</div><div class="card-ctrl"><button class="cc-btn cc-edit" onclick="editCC(${c.id})">✎</button><button class="cc-btn cc-remove" onclick="removeCC(${c.id})">✕</button></div></div>`).join('')}
function addCompetence(){openEditModal('Add Competence','',[{type:'text',key:'icon',label:'Emoji',value:'🎯',required:true},{type:'text',key:'title',label:'Title',required:true},{type:'textarea',key:'desc',label:'Description',required:true,rows:3}],v=>{data.cc.items.push({id:uid(),icon:v.icon,title:v.title,desc:v.desc});renderCC()})}
function editCC(id){const c=data.cc.items.find(x=>x.id===id);if(!c)return;openEditModal('Edit Competence','',[{type:'text',key:'icon',label:'Emoji',value:c.icon},{type:'text',key:'title',label:'Title',value:c.title,required:true},{type:'textarea',key:'desc',label:'Description',value:c.desc,rows:3}],v=>{c.icon=v.icon;c.title=v.title;c.desc=v.desc;renderCC()})}
function removeCC(id){if(!confirm('Remove?'))return;data.cc.items=data.cc.items.filter(x=>x.id!==id);renderCC();savePortfolio(true)}

// EXP
function renderExperience(){
$('expTimeline').innerHTML=data.experiences.map(x=>`<div class="exp-block"><div class="exp-card"><div class="exp-top"><div class="exp-role">${esc(x.role)}</div><div class="exp-badge">${esc(x.date)}</div></div><div class="exp-company">${esc(x.company)}</div><ul class="exp-list">${x.bullets.map(b=>`<li><span>${b}</span></li>`).join('')}</ul><div class="tag-row">${x.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div>${renderFiles(x.files,x.id,'exp')}<div class="card-ctrl"><button class="cc-btn cc-edit" onclick="editExperience(${x.id})">✎ Edit</button><button class="cc-btn cc-upload" onclick="uploadTo('exp',${x.id})">📎 Upload</button><button class="cc-btn cc-remove" onclick="removeExperience(${x.id})">✕ Remove</button></div></div></div>`).join('');
$('internRow').innerHTML=data.interns.map(x=>`<div class="intern-card"><div class="intern-title">${esc(x.title)}</div><div class="intern-co">${esc(x.co)}</div><div class="intern-desc">${esc(x.desc)}</div>${renderFiles(x.files,x.id,'int')}<div class="card-ctrl"><button class="cc-btn cc-edit" onclick="editIntern(${x.id})">✎</button><button class="cc-btn cc-upload" onclick="uploadTo('int',${x.id})">📎</button><button class="cc-btn cc-remove" onclick="removeIntern(${x.id})">✕</button></div></div>`).join('')}
function addExperience(){openEditModal('Add Experience','Add a new job',[{type:'text',key:'role',label:'Job Title',required:true},{type:'text',key:'company',label:'Company & Location',required:true},{type:'text',key:'date',label:'Date Range',required:true},{type:'textarea',key:'bullets',label:'Bullets (one per line)',required:true,rows:6,hint:'HTML allowed'},{type:'text',key:'tags',label:'Tags (comma separated)'},{type:'files',key:'files',label:'Upload Files'}],v=>{data.experiences.unshift({id:uid(),role:v.role,company:v.company,date:v.date,bullets:v.bullets.split('\n').filter(Boolean),tags:v.tags.split(',').map(s=>s.trim()).filter(Boolean),files:v._files||[]});renderAll()},true)}
function editExperience(id){const x=data.experiences.find(e=>e.id===id);if(!x)return;openEditModal('Edit Experience','',[{type:'text',key:'role',label:'Job Title',value:x.role,required:true},{type:'text',key:'company',label:'Company',value:x.company,required:true},{type:'text',key:'date',label:'Date',value:x.date,required:true},{type:'textarea',key:'bullets',label:'Bullets',value:x.bullets.join('\n'),required:true,rows:6,hint:'HTML allowed'},{type:'text',key:'tags',label:'Tags',value:x.tags.join(', ')}],v=>{x.role=v.role;x.company=v.company;x.date=v.date;x.bullets=v.bullets.split('\n').filter(Boolean);x.tags=v.tags.split(',').map(s=>s.trim()).filter(Boolean);renderExperience()},true)}
function removeExperience(id){if(!confirm('Remove?'))return;data.experiences=data.experiences.filter(x=>x.id!==id);renderAll();savePortfolio(true)}
function addIntern(){openEditModal('Add Internship','',[{type:'text',key:'title',label:'Title',required:true},{type:'text',key:'co',label:'Location & Duration',required:true},{type:'textarea',key:'desc',label:'Description',required:true,rows:4},{type:'files',key:'files',label:'Upload Files'}],v=>{data.interns.push({id:uid(),title:v.title,co:v.co,desc:v.desc,files:v._files||[]});renderExperience()})}
function editIntern(id){const x=data.interns.find(i=>i.id===id);if(!x)return;openEditModal('Edit Internship','',[{type:'text',key:'title',label:'Title',value:x.title,required:true},{type:'text',key:'co',label:'Location & Duration',value:x.co,required:true},{type:'textarea',key:'desc',label:'Description',value:x.desc,rows:4}],v=>{x.title=v.title;x.co=v.co;x.desc=v.desc;renderExperience()})}
function removeIntern(id){if(!confirm('Remove?'))return;data.interns=data.interns.filter(x=>x.id!==id);renderExperience();savePortfolio(true)}

function uploadTo(type,id){openEditModal('Upload Files','Attach images, PDFs, docs',[{type:'files',key:'files',label:'Select Files'}],v=>{
let t;if(type==='exp')t=data.experiences.find(x=>x.id===id);
else if(type==='int')t=data.interns.find(x=>x.id===id);
else if(type==='deg')t=data.education.degrees.find(x=>x.id===id);
else if(type==='cert')t=data.education.certs.find(x=>x.id===id);
else if(type==='proj'){for(const k of Object.keys(data.projects)){const f=data.projects[k].find(x=>x.id===id);if(f){t=f;break}}}
if(t){if(!t.files)t.files=[];t.files=t.files.concat(v._files||[]);renderAll();showToast(`✅ ${(v._files||[]).length} file(s) uploaded!`,'success')}})}

function renderProjectTabs(){
const tabs=$('projTabs');const panes=$('projPanes');
tabs.innerHTML=data.projectCategories.map((c,i)=>`<button class="ptab ${i===0?'on':''}" data-key="${c.key}" onclick="showTab('${c.key}',this)"><span class="ptab-dot" style="background:${c.color}"></span>${esc(c.name)}<span class="ptab-x" onclick="event.stopPropagation();removeProjectCategoryById('${c.key}')">✕</span></button>`).join('');
panes.innerHTML=data.projectCategories.map((c,i)=>{const isFyp=c.key==='fyp';return `<div class="tab-pane ${i===0?'on':''}${isFyp?' full':''}" id="tp-${c.key}"></div>`}).join('');
}
function renderProjects(){
renderProjectTabs();
data.projectCategories.forEach(cat=>{
const pane=document.getElementById('tp-'+cat.key);if(!pane)return;
const items=data.projects[cat.key]||[];
pane.innerHTML=items.map(p=>{
const isFyp=cat.key==='fyp';
return `<div class="pcard ${isFyp?'fyp-card':''}"><div class="pcard-num">${esc(p.num)}</div><div class="pcard-name">${esc(p.name)}</div>${p.sub?`<div class="pcard-sub">${esc(p.sub)}</div>`:''}<div class="pcard-desc">${p.desc}</div>${isFyp&&p.tags?`<div class="fyp-tags">${p.tags.map(t=>`<span class="fyp-tag">${esc(t)}</span>`).join('')}</div>`:''}${renderFiles(p.files,p.id,'proj')}<div class="card-ctrl"><button class="cc-btn cc-edit" onclick="editProject('${cat.key}',${p.id})">✎ Edit</button><button class="cc-btn cc-upload" onclick="uploadTo('proj',${p.id})">📎 Upload</button><button class="cc-btn cc-remove" onclick="removeProject('${cat.key}',${p.id})">✕ Remove</button></div></div>`;
}).join('');
});
}

function addProjectCategory(){openEditModal('Add Project Category','',[{type:'text',key:'name',label:'Category Name',required:true},{type:'text',key:'icon',label:'Emoji',value:'📂'},{type:'text',key:'color',label:'Color (hex)',value:'#3498db'}],v=>{if(!v.name)return;const key=v.name.toLowerCase().replace(/[^a-z0-9]/g,'_')+'_'+Date.now();data.projectCategories.push({key,name:v.name,color:v.color,icon:v.icon});data.projects[key]=[];renderAll()})}

function removeProjectCategoryModal(){if(!isAdmin)return;const opts=data.projectCategories.map(c=>({value:c.key,label:c.icon+' '+c.name}));openEditModal('Remove Project Category','⚠️ Will delete category AND all its projects',[{type:'select',key:'cat',label:'Select to Remove',value:opts[0]?.value,options:opts}],v=>{removeProjectCategoryById(v.cat)})}

function removeProjectCategoryById(key){if(!isAdmin)return;if(!confirm('Remove this category and ALL its projects?'))return;data.projectCategories=data.projectCategories.filter(c=>c.key!==key);delete data.projects[key];renderAll();savePortfolio(true);showToast('🗑️ Category removed','info')}

function addProject(){const catOpts=data.projectCategories.map(c=>({value:c.key,label:c.icon+' '+c.name}));openEditModal('Add Project','',[{type:'select',key:'cat',label:'Category',value:data.projectCategories[0]?.key||'bim',options:catOpts,allowCustom:true},{type:'text',key:'num',label:'Project Number / Tag',required:true},{type:'text',key:'name',label:'Project Name',required:true},{type:'text',key:'sub',label:'Subtitle (optional)'},{type:'textarea',key:'desc',label:'Description',required:true,rows:5,hint:'HTML allowed'},{type:'text',key:'tags',label:'Tags (for FYP — comma separated)'},{type:'files',key:'files',label:'Upload Files'}],v=>{let catKey=v.cat;const custom=$('ef-cat-custom');if(custom&&custom.value.trim()){const nm=custom.value.trim();catKey=nm.toLowerCase().replace(/[^a-z0-9]/g,'_')+'_'+Date.now();data.projectCategories.push({key:catKey,name:nm,color:'#3498db',icon:'📂'});data.projects[catKey]=[]}const p={id:uid(),num:v.num,name:v.name,sub:v.sub,desc:v.desc,files:v._files||[]};if(v.tags)p.tags=v.tags.split(',').map(s=>s.trim()).filter(Boolean);if(!data.projects[catKey])data.projects[catKey]=[];data.projects[catKey].push(p);renderAll()},true)}

function editProject(cat,id){const p=(data.projects[cat]||[]).find(x=>x.id===id);if(!p)return;const f=[{type:'text',key:'num',label:'Project Number',value:p.num,required:true},{type:'text',key:'name',label:'Project Name',value:p.name,required:true},{type:'text',key:'sub',label:'Subtitle',value:p.sub||''},{type:'textarea',key:'desc',label:'Description',value:p.desc,required:true,rows:5,hint:'HTML allowed'}];if(cat==='fyp'||p.tags)f.push({type:'text',key:'tags',label:'Tags',value:(p.tags||[]).join(', ')});openEditModal('Edit Project','',[...f],v=>{p.num=v.num;p.name=v.name;p.sub=v.sub;p.desc=v.desc;if(v.tags!==undefined)p.tags=v.tags.split(',').map(s=>s.trim()).filter(Boolean);renderAll()},true)}
function removeProject(cat,id){if(!confirm('Remove?'))return;data.projects[cat]=data.projects[cat].filter(x=>x.id!==id);renderAll();savePortfolio(true)}

function renderGallery(){const g=$('pwGrid');if(!data.gallery.length){g.innerHTML='<div class="pw-empty"><div class="pw-empty-icon">🖼️</div><p>No project images yet.<br>Click <strong>"＋ Add Project Image"</strong> to add.</p></div>';return}g.innerHTML=data.gallery.map(item=>`<div class="pw-item">${item.img?`<div class="pw-img-wrap" onclick="openFsPreview({name:'${esc(item.title)}.jpg',data:'${item.img}'})"><img class="pw-item-img" src="${item.img}" alt="${esc(item.title)}" loading="lazy"></div>`:'<div class="pw-placeholder">🖼️</div>'}<div class="pw-item-body"><div class="pw-item-cat">${esc(item.cat)}</div><div class="pw-item-title">${esc(item.title)}</div>${item.desc?`<div class="pw-item-desc">${esc(item.desc)}</div>`:''}</div>${renderFiles(item.files,item.id,'gal')}<div class="card-ctrl"><button class="cc-btn cc-edit" onclick="editGalleryItem(${item.id})">✎ Edit</button><button class="cc-btn cc-upload" onclick="uploadToGallery(${item.id})">📎 Upload</button><button class="cc-btn cc-remove" onclick="removeGalleryItem(${item.id})">✕ Remove</button></div></div>`).join('')}

function uploadToGallery(id){openEditModal('Upload Files to Gallery','',[{type:'files',key:'files',label:'Select Files'}],v=>{const t=data.gallery.find(x=>x.id===id);if(t){if(!t.files)t.files=[];t.files=t.files.concat(v._files||[]);renderAll()}})}
function addGalleryItem(){if(!isAdmin)return showToast('⚠️ Admin mode required.','error');const catOpts=data.galleryCategories.map(c=>({value:c,label:c}));openEditModal('Add Project to Gallery','',[{type:'text',key:'title',label:'Project Title',required:true},{type:'select',key:'cat',label:'Category',value:data.galleryCategories[0]||'Other',options:catOpts,allowCustom:true},{type:'textarea',key:'desc',label:'Description',rows:3},{type:'files',key:'files',label:'Upload Images & Files (multiple)'}],v=>{if(!v.title)return;let cat=v.cat;const custom=$('ef-cat-custom');if(custom&&custom.value.trim()){cat=custom.value.trim();if(!data.galleryCategories.includes(cat))data.galleryCategories.push(cat)}const firstImg=(v._files||[]).find(f=>f.type&&f.type.startsWith('image/'));data.gallery.unshift({id:uid(),title:v.title,cat,desc:v.desc,img:firstImg?firstImg.data:null,files:v._files||[]});renderGallery()})}
function removeGalleryCategoryModal(){if(!isAdmin)return;const opts=data.galleryCategories.map(c=>({value:c,label:c}));openEditModal('Remove Gallery Category','',[{type:'select',key:'cat',label:'Select Category',value:opts[0]?.value,options:opts}],v=>{const used=data.gallery.some(g=>g.cat===v.cat);if(used&&!confirm('Some items use this category. Remove anyway?'))return;data.galleryCategories=data.galleryCategories.filter(c=>c!==v.cat);showToast('🗑️ Category removed','info')})}
function editGalleryItem(id){const x=data.gallery.find(g=>g.id===id);if(!x)return;const catOpts=data.galleryCategories.map(c=>({value:c,label:c}));openEditModal('Edit Gallery Item','',[{type:'text',key:'title',label:'Title',value:x.title,required:true},{type:'select',key:'cat',label:'Category',value:x.cat,options:catOpts,allowCustom:true},{type:'textarea',key:'desc',label:'Description',value:x.desc,rows:3}],v=>{x.title=v.title;let cat=v.cat;const custom=$('ef-cat-custom');if(custom&&custom.value.trim()){cat=custom.value.trim();if(!data.galleryCategories.includes(cat))data.galleryCategories.push(cat)}x.cat=cat;x.desc=v.desc;renderGallery()})}
function removeGalleryItem(id){if(!isAdmin||!confirm('Remove?'))return;data.gallery=data.gallery.filter(x=>x.id!==id);renderGallery();savePortfolio(true)}

function renderSkills(){$('skEy').textContent=data.skills.eyebrow;$('skTitle').innerHTML=data.skills.title;$('skDesc').textContent=data.skills.desc;
$('skillsGrid').innerHTML=data.skills.categories.map(c=>`<div class="scat-card"><div class="scat-head"><div class="scat-icon" style="background:${c.bg}">${c.icon}</div><div class="scat-name">${esc(c.name)}</div></div><div class="spills">${c.skills.map((s,si)=>`<span class="sp sp-${s.level}">${esc(s.text)}<button class="sp-x" onclick="removeSkill(${c.id},${si})">✕</button></span>`).join('')}</div><div class="card-ctrl"><button class="cc-btn cc-add" onclick="addSkill(${c.id})">＋ Skill</button><button class="cc-btn cc-edit" onclick="editSkillCat(${c.id})">✎</button><button class="cc-btn cc-remove" onclick="removeSkillCat(${c.id})">✕</button></div></div>`).join('');
$('sbarGrid').innerHTML=`<div>${data.skills.bars.slice(0,Math.ceil(data.skills.bars.length/2)).map((b,i)=>sbarH(b,i)).join('')}</div><div>${data.skills.bars.slice(Math.ceil(data.skills.bars.length/2)).map((b,i)=>sbarH(b,i+Math.ceil(data.skills.bars.length/2))).join('')}</div>`;
setTimeout(()=>document.querySelectorAll('.sbar-fill').forEach(f=>f.style.width=f.dataset.w+'%'),100)}
function sbarH(b,i){return `<div class="sbar"><div class="sbar-header"><span class="sbar-name">${esc(b.name)}</span><span class="sbar-pct">${b.pct}%</span></div><div class="sbar-track"><div class="sbar-fill" data-w="${b.pct}"></div></div><div class="card-ctrl"><button class="cc-btn cc-edit" onclick="editSkillBar(${i})">✎</button><button class="cc-btn cc-remove" onclick="removeSkillBar(${i})">✕</button></div></div>`}
function addSkillCategory(){openEditModal('Add Skill Category','',[{type:'text',key:'icon',label:'Emoji',value:'⚙️',required:true},{type:'text',key:'name',label:'Name',required:true}],v=>{data.skills.categories.push({id:uid(),icon:v.icon,name:v.name,bg:'rgba(41,128,185,.10)',skills:[]});renderSkills()})}
function editSkillCat(id){const c=data.skills.categories.find(x=>x.id===id);if(!c)return;openEditModal('Edit Skill Category','',[{type:'text',key:'icon',label:'Emoji',value:c.icon},{type:'text',key:'name',label:'Name',value:c.name,required:true}],v=>{c.icon=v.icon;c.name=v.name;renderSkills()})}
function removeSkillCat(id){if(!confirm('Remove?'))return;data.skills.categories=data.skills.categories.filter(x=>x.id!==id);renderSkills();savePortfolio(true)}
function addSkill(cid){openEditModal('Add Skill','',[{type:'text',key:'text',label:'Skill Name',required:true},{type:'select',key:'level',label:'Proficiency',value:'std',options:[{value:'adv',label:'🔵 Advanced'},{value:'int',label:'🟠 Intermediate'},{value:'std',label:'🟢 Standard'},{value:'neu',label:'⚪ Neutral'}]}],v=>{const c=data.skills.categories.find(x=>x.id===cid);if(c){c.skills.push({text:v.text,level:v.level});renderSkills()}})}
function removeSkill(cid,si){if(!isAdmin)return;const c=data.skills.categories.find(x=>x.id===cid);if(c){c.skills.splice(si,1);renderSkills();savePortfolio(true)}}
function addSkillBar(){openEditModal('Add Skill Bar','',[{type:'text',key:'name',label:'Skill Name',required:true},{type:'text',key:'pct',label:'Percentage (0-100)',value:'80',required:true}],v=>{const p=parseInt(v.pct);if(isNaN(p))return;data.skills.bars.push({name:v.name,pct:Math.max(0,Math.min(100,p))});renderSkills()})}
function editSkillBar(i){const b=data.skills.bars[i];if(!b)return;openEditModal('Edit Skill Bar','',[{type:'text',key:'name',label:'Name',value:b.name,required:true},{type:'text',key:'pct',label:'Percentage',value:String(b.pct),required:true}],v=>{b.name=v.name;b.pct=Math.max(0,Math.min(100,parseInt(v.pct)||0));renderSkills()})}
function removeSkillBar(i){if(!confirm('Remove?'))return;data.skills.bars.splice(i,1);renderSkills();savePortfolio(true)}

function renderEducation(){
$('eduEy').textContent=data.education.eyebrow;$('eduTitle').innerHTML=data.education.title;
$('degList').innerHTML=data.education.degrees.map(d=>`<div class="edu-card"><div class="edu-deg">${esc(d.deg)}</div><div class="edu-sch">${esc(d.sch)}</div><div class="edu-meta"><span>${esc(d.year)}</span><span class="edu-gpa">${esc(d.gpa)}</span></div>${renderFiles(d.files,d.id,'deg')}<div class="card-ctrl"><button class="cc-btn cc-edit" onclick="editDegree(${d.id})">✎ Edit</button><button class="cc-btn cc-upload" onclick="uploadTo('deg',${d.id})">📎 Files</button><button class="cc-btn cc-remove" onclick="removeDegree(${d.id})">✕ Remove</button></div></div>`).join('');
$('certList').innerHTML=data.education.certs.map(c=>`<div class="cert-item"><div class="cert-head"><span class="cert-name">${esc(c.name)}</span><span class="cert-yr">${esc(c.year)}</span></div>${renderFiles(c.files,c.id,'cert')}<div class="card-ctrl"><button class="cc-btn cc-edit" onclick="editCert(${c.id})">✎ Edit</button><button class="cc-btn cc-upload" onclick="uploadTo('cert',${c.id})">📎 Files</button><button class="cc-btn cc-remove" onclick="removeCert(${c.id})">✕ Remove</button></div></div>`).join('')}
function addDegree(){openEditModal('Add Degree','',[{type:'text',key:'deg',label:'Degree',required:true},{type:'text',key:'sch',label:'School / University',required:true},{type:'row',fields:[{type:'text',key:'year',label:'Year',required:true},{type:'text',key:'gpa',label:'GPA / Grade'}]},{type:'files',key:'files',label:'Upload Images & Files (multiple)'}],v=>{data.education.degrees.push({id:uid(),deg:v.deg,sch:v.sch,year:v.year,gpa:v.gpa,files:v._files||[]});renderAll()})}
function editDegree(id){const d=data.education.degrees.find(x=>x.id===id);if(!d)return;openEditModal('Edit Degree','',[{type:'text',key:'deg',label:'Degree',value:d.deg,required:true},{type:'text',key:'sch',label:'School',value:d.sch,required:true},{type:'row',fields:[{type:'text',key:'year',label:'Year',value:d.year,required:true},{type:'text',key:'gpa',label:'GPA',value:d.gpa}]},{type:'files',key:'files',label:'Upload More Files (multiple)'}],v=>{d.deg=v.deg;d.sch=v.sch;d.year=v.year;d.gpa=v.gpa;if(v._files&&v._files.length){if(!d.files)d.files=[];d.files=d.files.concat(v._files)}renderEducation()})}
function removeDegree(id){if(!confirm('Remove?'))return;data.education.degrees=data.education.degrees.filter(x=>x.id!==id);renderAll();savePortfolio(true)}
function addCert(){openEditModal('Add Certificate','Add certification or workshop',[{type:'text',key:'name',label:'Certificate Name',required:true},{type:'text',key:'year',label:'Year / Date',required:true,placeholder:'e.g. Dec 2024'},{type:'files',key:'files',label:'Upload Images & Files (multiple)'}],v=>{data.education.certs.push({id:uid(),name:v.name,year:v.year,files:v._files||[]});renderAll()})}
function editCert(id){const c=data.education.certs.find(x=>x.id===id);if(!c)return;openEditModal('Edit Certificate','',[{type:'text',key:'name',label:'Certificate Name',value:c.name,required:true},{type:'text',key:'year',label:'Year / Date',value:c.year,required:true},{type:'files',key:'files',label:'Upload More Files (multiple)'}],v=>{c.name=v.name;c.year=v.year;if(v._files&&v._files.length){if(!c.files)c.files=[];c.files=c.files.concat(v._files)}renderAll()})}
function removeCert(id){if(!confirm('Remove?'))return;data.education.certs=data.education.certs.filter(x=>x.id!==id);renderAll();savePortfolio(true)}

// CONTACT - now with editable GCC banner
function renderContact(){$('ctEy').textContent=data.contact.eyebrow;$('ctTitle').innerHTML=data.contact.title;$('ctDesc').textContent=data.contact.desc;$('ctGcc').textContent=data.contact.gcc;$('gccFlags').textContent=data.contact.gccFlags||'🇦🇪 🇸🇦 🇶🇦';
$('contactGrid').innerHTML=data.contact.cards.map(c=>`<div class="ccard">${c.link?`<a href="${esc(c.link)}" target="${c.link.startsWith('http')?'_blank':'_self'}" style="display:block">`:''}<div class="ccard-icon">${c.icon}</div><div class="ccard-label">${esc(c.label)}</div><div class="ccard-val">${esc(c.value)}</div>${c.link?'</a>':''}<div class="card-ctrl" style="justify-content:center"><button class="cc-btn cc-edit" onclick="editContactCard(${c.id})">✎</button><button class="cc-btn cc-remove" onclick="removeContactCard(${c.id})">✕</button></div></div>`).join('')}

// ════════ GCC Banner edit ════════
function editGccBanner(){
if(!isAdmin)return showToast('⚠️ Enter admin mode.','info');
openEditModal('Edit GCC Banner','Update flags and message',[
{type:'text',key:'flags',label:'Flag Emojis',value:data.contact.gccFlags||'🇦🇪 🇸🇦 🇶🇦',hint:'Separate flags with spaces'},
{type:'text',key:'text',label:'Banner Text',value:data.contact.gcc,required:true,placeholder:'Actively seeking opportunities in...'}
],v=>{data.contact.gccFlags=v.flags;data.contact.gcc=v.text;renderContact()})
}

function addContactCard(){openEditModal('Add Contact Card','',[{type:'text',key:'icon',label:'Emoji',value:'📧',required:true},{type:'text',key:'label',label:'Label',required:true},{type:'text',key:'value',label:'Value',required:true},{type:'text',key:'link',label:'Link (optional)'}],v=>{data.contact.cards.push({id:uid(),icon:v.icon,label:v.label,value:v.value,link:v.link});renderContact()})}
function editContactCard(id){const c=data.contact.cards.find(x=>x.id===id);if(!c)return;openEditModal('Edit Contact Card','',[{type:'text',key:'icon',label:'Emoji',value:c.icon},{type:'text',key:'label',label:'Label',value:c.label,required:true},{type:'text',key:'value',label:'Value',value:c.value,required:true},{type:'text',key:'link',label:'Link',value:c.link}],v=>{c.icon=v.icon;c.label=v.label;c.value=v.value;c.link=v.link;renderContact()})}
function removeContactCard(id){if(!confirm('Remove?'))return;data.contact.cards=data.contact.cards.filter(x=>x.id!==id);renderContact();savePortfolio(true)}

function editSectionHeader(key){const map={about:{o:data.about},cc:{o:data.cc},exp:{o:{eyebrow:$('expEy').textContent,title:$('expTitle').innerHTML,desc:$('expDesc').textContent}},proj:{o:{eyebrow:$('projEy').textContent,title:$('projTitle').innerHTML,desc:$('projDesc').textContent}},pw:{o:{eyebrow:$('pwEy').textContent,title:$('pwTitleEl').innerHTML,desc:$('pwDesc').textContent}},sk:{o:data.skills},edu:{o:data.education},ct:{o:data.contact}};const m=map[key];if(!m)return;openEditModal('Edit Section Header','',[{type:'text',key:'eyebrow',label:'Eyebrow',value:m.o.eyebrow},{type:'text',key:'title',label:'Title (HTML)',value:m.o.title,hint:'Use <em> for accent'},{type:'textarea',key:'desc',label:'Description',value:m.o.desc,rows:3}],v=>{m.o.eyebrow=v.eyebrow;m.o.title=v.title;m.o.desc=v.desc;renderAll()})}

// ════════ CONTACT FORM — FormSubmit AJAX (delivers straight to inbox) ════════
const CONTACT_EMAIL='engr.umair.ahmad111@gmail.com';
function sendMessage(){
const n=$('cfName').value.trim(),em=$('cfEmail').value.trim(),sub=$('cfSubject').value.trim(),msg=$('cfMessage').value.trim();
const st=$('cfStatus'),btn=$('cfSubmitBtn');

if(!n||!em||!msg){st.className='cf-status error';st.textContent='⚠️ Please fill Name, Email, and Message.';return}
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){st.className='cf-status error';st.textContent='⚠️ Please enter a valid email address.';return}

st.className='cf-status loading';st.textContent='⏳ Sending your message...';
btn.disabled=true;btn.style.opacity='.7';

const payload={
name:n,
email:em,
message:msg,
_subject:sub?('Portfolio Contact: '+sub):('New Portfolio Message from '+n),
_template:'table',
_captcha:'false',
_replyto:em
};

// FormSubmit AJAX endpoint — returns JSON, delivers the message to CONTACT_EMAIL.
// NOTE: the very first submission triggers a one-time confirmation email to the
// owner's inbox; once confirmed, all future messages arrive automatically.
fetch('https://formsubmit.co/ajax/'+CONTACT_EMAIL,{
method:'POST',
headers:{'Content-Type':'application/json','Accept':'application/json'},
body:JSON.stringify(payload)
})
.then(r=>r.json())
.then(d=>{
const ok=String(d.success)==='true'||/sent|success/i.test(d.message||'');
if(!ok)throw new Error(d.message||'Send failed');
st.className='cf-status success';
st.innerHTML='✅ Thank you! Your message has been sent — Umair will reply to your email soon.';
$('cfName').value='';$('cfEmail').value='';$('cfSubject').value='';$('cfMessage').value='';
showToast('✅ Message delivered successfully','success');
})
.catch(err=>{
// Robust fallback: open the user's email client pre-filled to CONTACT_EMAIL.
st.className='cf-status error';
st.innerHTML='⚠️ Couldn\u2019t send automatically — opening your email app as a backup…';
const body=`Name: ${n}\nEmail: ${em}\n\n${msg}`;
setTimeout(()=>{window.location.href=`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(sub||'Portfolio Contact')}&body=${encodeURIComponent(body)}`},900);
})
.finally(()=>{btn.disabled=false;btn.style.opacity='1'});
}

function renderAll(){renderProfile();renderLogo();renderHero();renderAbout();renderCC();renderExperience();renderProjects();renderGallery();renderSkills();renderEducation();renderContact();attachReveal()}

async function bootstrap(){
await loadData();
renderAll();
setTimeout(typeLoop,800);
}

bootstrap();
