let css=`body{--prilt:#FFF;--pri:#F8F8F2;--pridk:#FAFAEB;--successlt:#ADE146;--success:#A6E22E;--successdk:#98E104;--errlt:#FF69A0;--err:#F92672;--errdk:#D10F56;--seclt:#AAA;--sec:#888;--secdk:#666;--warnlt:#E1D992;--warn:#E6DB74;--warndk:#EDDD54;--infolt:#92E1F1;--info:#66D9EF;--infodk:#31CDED;--welllt:#444;--well:#222;--white:#fff;--black:#000;--hp:#F92672;--money:#E6DB74;--hack:#A6E22E;--combat:#75715E;--cha:#AE81FF;--int:#66D9EF;--rep:#E69F66;--disabled:#66cfbc;--bgpri:#272822;--bgsec:#1B1C18;--button:#333;--ff:"Lucida Console"}.box{position:fixed;border:1px solid var(--welllt);width:min-content;font:14px var(--ff);color:var(--pri);background:var(--bgsec)}.box *{vertical-align:middle;margin:0;font:inherit}.box>.head{display:flex;white-space:pre;user-select:none;background:var(--bgpri);padding:2px;cursor:move;border-bottom:1px solid var(--welllt)}.box>.body{padding:2px}.box .title{margin:0 auto 0 10px}.box.c>.body{display:none}.box.prompt{box-shadow:0 0 0 10000px #0007;min-width:400px}.box.prompt>.head>.icon{display:none}.icon{cursor:pointer;font:25px "codicon";line-height:0.9}.icon.ud::after{content:""}.box.c .icon.ud::after{content:""}.box :is(input,select,button,textarea){color:var(--pri);outline:none;border:none;white-space:pre}.box :is(textarea,.log){width:100%;white-space:pre-wrap;font-size:12px;background:none;padding:0px;height:100%;overflow-y:scroll}.box :is(input,select){padding:3px;background:var(--well);border-bottom:1px solid var(--prilt);transition:border-bottom 250ms}.box input:hover{border-bottom:1px solid var(--black)}.box input:focus{border-bottom:1px solid var(--prilt)}.box :is(button,input[type=checkbox]){background:var(--button);transition:background 250ms;border:1px solid var(--well)}.box :is(button,input[type=checkbox]):hover{background:var(--bgsec)}.box :is(button,input[type=checkbox]):focus, select{border:1px solid var(--secdk)}.box button{padding:6px 8px;user-select:none}.box input[type=checkbox]{appearance:none;display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px}.box input[type=checkbox]:checked::after{font:22px codicon;content:""}.g2{display:grid;grid:auto-flow auto / auto auto;gap:6px;margin:5px;place-items:center}.g2>.l{justify-self:start}.g2>.r{justify-self:end}.g2>.f{grid-column:1 / span 2;text-align:center}.resizer{width:100%;min-width:99%;resize:both;overflow:hidden}.ts{color:var(--infolt)}.hidden, .tooltip{display:none}*:hover>.tooltip{display:block;position:absolute;left:-5px;bottom:calc(100% + 5px);border:1px solid var(--welllt);background:var(--bgsec);color:var(--pri);font:14px var(--ff);padding:5px;white-space:pre}`;
Element.prototype.setStyle=function(styles){Object.assign(this.style,styles)}
export let win=globalThis, doc=win["document"], style=doc.querySelector("#boxstyles"),
  elemFromHTML=html=>new Range().createContextualFragment(html).firstElementChild,
  ts=()=>`[<span class=ts>${new Date().toLocaleTimeString("en-gb")}</span>]`,
  slp=ms=>new Promise(r=>setTimeout(r,ms));
if (!style){
  style=doc.head.appendChild(elemFromHTML(`<style id=boxstyles>${css}</style>`));
  win._boxEdgeDetect=()=>doc.querySelectorAll('.box').forEach(box=>box.setStyle({left:Math.max(Math.min(win.innerWidth-box.offsetWidth,box.offsetLeft),0)+"px",top:Math.max(Math.min(win.innerHeight-box.offsetHeight,box.offsetTop),0)+"px"}));
  win.addEventListener("resize",win._boxEdgeDetect);
}
export let createBox=(title,content,icon="\uea74",...classes)=>{
  let box=doc.body.appendChild(elemFromHTML(`<div class="${[...classes,"box"].join(" ")}"><div class="head"><a class="icon">${icon}</a><span class=title>${title}</span><a class="icon ud"></a><a class="icon close">\ueab8</a></div><div class="body">${content}</div></div>`));
  box.addEventListener('keydown',e=>e.stopPropagation());
  box.head=box.querySelector(".head");
  box.body=box.querySelector(".body");
  box.logDiv=box.querySelector(".log");
  box.log=(html, timestamp=true)=>{
    if (!box.logDiv) box.logDiv=box.body.appendChild(elemFromHTML("<div class=resizer><div class=log></div></div>")).querySelector(".log");
    let logEntry=box.logDiv.appendChild(elemFromHTML(`<p>${timestamp?ts():""} ${html}</p>`));
    box.logDiv.scrollTop=box.logDiv.scrollHeight;
    return logEntry;
  }
  box.addEventListener('mousedown',e=>box.setStyle({zIndex:zIndex()}));
  box.head.addEventListener('mousedown',headMouseDown.bind(box));
  box.head.querySelector(".close").addEventListener('click',e=>box["remove"]());
  box.head.querySelector(".ud").addEventListener('click',e=>box.classList.toggle("c")||win._boxEdgeDetect());
  box.setStyle({left:Math.floor(win.innerWidth/2-box.offsetWidth/2)+"px",top:Math.floor(win.innerHeight/2-box.offsetHeight/2)+"px",zIndex:zIndex()});
  return box;
}, createSidebarItem=createBox;
export let confirm=text=>{
  let box=createBox("Confirmation Prompt",`<div class=g2><div class=f>${text}</div><button class=r><u>Y</u>es</button><button class=l><u>N</u>o</button></div>`,"","prompt");
  box.querySelector("button").focus();
  box.addEventListener('keyup',e=>(e.key.toLowerCase()==="y"&&box.querySelector("button").click())||(e.key.toLowerCase()==="n"&&box.querySelectorAll("button")[1].click()));
  return new Promise(r=>box.querySelectorAll("button").forEach((button,i)=>button.addEventListener('click',()=>box["remove"](r(i==0)))));
};
export let prompt=text=>{
  let box=createBox("Input Prompt",`<div class=g2><div class=f>${text}</div><input class=r /><button class=l>Submit</button></div>`,"","prompt");
  box.querySelector("input").focus();
  box.querySelector("input").addEventListener('keyup',e=>e.key=='Enter'&&box.querySelector("button").click());
  return new Promise(r=>box.querySelector("button").addEventListener('click',()=>box["remove"](r(box.querySelector("input").value))));
};
export let select=(text,options)=>{
  let box=createBox("Selection Prompt",`<div class=g2><div class=f>${text}</div><select class=r>${options.map(option=>`<option value="${option}">${option}</option>`).join("")}</select><button class=l>Submit</button></div>`,"","prompt");
  box.querySelector("select").focus();
  return new Promise(r=>box.querySelector("button").addEventListener('click',()=>box["remove"](r(box.querySelector("select").value))));
};
export let alert=text=>{
  let box=createBox("Alert Message",`<div class=g2><div class=f>${text}</div><button class=f>Ok</button></div>`,"", "prompt");
  box.querySelector("button").focus();
  return new Promise(r=>box.querySelector("button").addEventListener('click',()=>r(box["remove"]())));
};
let zIndex=()=>Math.max(9000,...[...doc.querySelectorAll(".box")].map(box=>box.style.zIndex))+1;
function headMouseDown(e){
  if (e.target.tagName==="A") return;
  let x=e.clientX,y=e.clientY,l=this.offsetLeft,t=this.offsetTop;
  let boxDrag=e=>this.setStyle({left:Math.max(Math.min(win.innerWidth-this.offsetWidth,l+e.clientX-x),0)+"px",top:Math.max(Math.min(win.innerHeight-this.offsetHeight,t+e.clientY-y),0)+"px"});
  let boxDragEnd=e=>doc.removeEventListener('mouseup',boxDragEnd)||doc.removeEventListener('mousemove',boxDrag);
  doc.addEventListener('mouseup',boxDragEnd)||doc.addEventListener('mousemove',boxDrag);
};