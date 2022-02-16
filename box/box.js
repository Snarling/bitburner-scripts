let css=`body{--prilt:#FFF;--pri:#F8F8F2;--pridk:#FAFAEB;--successlt:#ADE146;--success:#A6E22E;--successdk:#98E104;--errlt:#FF69A0;--err:#F92672;--errdk:#D10F56;--seclt:#AAA;--sec:#888;--secdk:#666;--warnlt:#E1D992;--warn:#E6DB74;--warndk:#EDDD54;--infolt:#92E1F1;--info:#66D9EF;--infodk:#31CDED;--welllt:#444;--well:#222;--white:#fff;--black:#000;--hp:#F92672;--money:#E6DB74;--hack:#A6E22E;--combat:#75715E;--cha:#AE81FF;--int:#66D9EF;--rep:#E69F66;--disabled:#66cfbc;--bgpri:#272822;--bgsec:#1B1C18;--button:#333;--ff:"JetBrains Mono"}body{overflow:hidden;display:flex}#root{flex:1 1 calc(100vw - 248px);overflow:scroll}.sb{font:14px var(--ff);color:var(--pri);background:var(--bgsec);box-sizing:border-box;overflow:hidden scroll;width:248px;min-height:100%;border-left:1px solid var(--welllt);transition:width 250ms}.sb *{vertical-align:middle;margin:0;font:inherit}.sb.c{width:45px}.sb .item{transition:color 200ms;border-top:1px solid var(--welllt);background:var(--bgsec);line-height:1.5}.sb .box{position:fixed;border:1px solid var(--welllt);width:min-content}.sb .head{direction:rtl;display:flex;white-space:pre;cursor:pointer;user-select:none;padding:8px 0px}.sb .item.c{color:var(--sec)}.box>.head{direction:ltr;background:var(--bgpri);padding:2px;cursor:move;border-bottom:1px solid var(--welllt)}.box>.body{padding:2px}.sb .title{margin:0px auto}.box .title{margin-left:10px;margin-right:auto}.sb .close:not(.box *){display:none}.sb>:not(.box)>.body{resize:vertical;overflow:hidden;transition:height 250ms;font-size:12px}.sb :is(.c .body):not(.box *){height:0px !important}.box.c>.body{display:none}.box.prompt{box-shadow:0 0 0 10000px #0007;min-width:400px}.sb .contextMenu{opacity:0.95;border-radius:5px;background:var(--bgpri)}.sb .contextMenu .head{display:none}.sb .icon{cursor:pointer;font:25px "codicon";line-height:0.9}.head>.icon:not(.box *){padding:0px 10px}.sb .icon.lr::after{content:""}.sb.c .icon.lr::after{content:""}.sb .icon.ud::after{content:""}.sb .c .icon.ud::after{content:""}.sb :is(input,select,button,textarea){color:var(--pri);outline:none;border:none}.sb :is(textarea,.log){width:100%;white-space:pre-wrap;font-size:12px;background:none;padding:0px;height:100%;overflow-y:scroll}.sb :is(input,select){padding:3px;background:var(--well);border-bottom:1px solid var(--prilt);transition:border-bottom 250ms}.sb input:hover{border-bottom:1px solid var(--black)}.sb input:focus{border-bottom:1px solid var(--prilt)}.sb :is(button,input[type=checkbox]){background:var(--button);transition:background 250ms;border:1px solid var(--well)}.sb :is(button,input[type=checkbox]):hover{background:var(--bgsec)}.sb :is(button,input[type=checkbox]):focus, .sb select{border:1px solid var(--secdk)}.sb button{padding:6px 8px;user-select:none}.sb .ts{color:var(--infolt)}.sb input[type=checkbox]{appearance:none;display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px}.sb input[type=checkbox]:checked::after{font:22px codicon;content:""}.sb .g2{display:grid;grid:auto-flow auto / auto auto;gap:6px;margin:5px;place-items:center}.g2>.l{justify-self:start}.g2>.r{justify-self:end}.sb .f{grid-column:1 / span 2;text-align:center}.sb .resizer{width:100%;min-width:99%;resize:both;overflow:hidden}.hidden{display:none}.tooltip{display:none}*:hover>.tooltip{display:block;position:absolute;left:-5px;bottom:calc(100% + 5px);border:1px solid var(--welllt);background:var(--bgsec);color:var(--pri);font:14px var(--ff);padding:5px;white-space:pre}`;
Element.prototype.setStyle=function(styles){Object.assign(this.style,styles)}
export let win=globalThis, doc=win["document"], sidebar=doc.querySelector(".sb"),
  elemFromHTML=html=>new Range().createContextualFragment(html).firstElementChild,
  ts=()=>`[<span class=ts>${new Date().toLocaleTimeString("en-gb")}</span>]`,
  slp=ms=>new Promise(r=>setTimeout(r,ms));
if (!sidebar){
  sidebar = doc.body.appendChild(elemFromHTML(`<div class="sb"><style></style><div class="head"><a class="icon lr"></a><span class=title>box.sidebar v1.0</span></div>`));
  sidebar.querySelector("style").innerHTML=css.replace(/\\/g,"\\\\");
  sidebar.addEventListener('keydown',e=>e.stopPropagation());
  sidebar.addEventListener('contextmenu',e=>e.preventDefault());
  sidebar.querySelector('.head').addEventListener('click',()=>{
    sidebar.classList.toggle('c');
    setTimeout(()=>doc.querySelector(".monaco-editor")?.setStyle({width:"0px"}),255);
  });
  win._boxEdgeDetect=()=>doc.querySelectorAll('.sb .box').forEach(box=>box.setStyle({left:Math.max(Math.min(win.innerWidth-box.offsetWidth,box.offsetLeft),0)+"px",top:Math.max(Math.min(win.innerHeight-box.offsetHeight,box.offsetTop),0)+"px"})), win.addEventListener("resize",win._boxEdgeDetect);
}
export let createSidebarItem=(title,content,icon="",...classes)=>{
  let item=sidebar.appendChild(elemFromHTML(`<div class="${[...classes,"item"].join(" ")}"><div class="head"><a class="icon">${icon}</a><span class=title>${title}</span><a class="icon ud"></a><a class="icon close">\ueab8</a></div><div class="body">${content}</div></div>`));
  item.head=item.querySelector(".head");
  item.body=item.querySelector(".body");
  item.logDiv=item.querySelector(".log");
  item.toSide=()=>{
    item.classList["remove"]("box");
    item.body.style.height=Math.max(item.body.offsetHeight,100)+"px";
    item.setStyle({zIndex:"",left:"",top:""});
  };
  item.toBox=()=>{
    item.classList.add("box");
    item.body.style.height="";
    item.setStyle({left:Math.floor(win.innerWidth/2-item.offsetWidth/2)+"px",top:Math.floor(win.innerHeight/2-item.offsetHeight/2)+"px",zIndex:zIndex()});
    return item;
  };
  item.log=(html, timestamp=true)=>{
    if (!item.logDiv) item.logDiv=item.body.appendChild(elemFromHTML("<div class=resizer><div class=log></div></div>")).querySelector(".log");
    let logEntry=item.logDiv.appendChild(elemFromHTML(`<p>${timestamp?ts():""} ${html}</p>`));
    item.logDiv.scrollTop=item.logDiv.scrollHeight;
    return logEntry;
  }
  item.addEventListener('mousedown',e=>item.style.zIndex&&(e.button||item.setStyle({zIndex:zIndex()})));
  item.head.addEventListener('mousedown',headMouseDown.bind(item));
  item.contextItems={
    "Remove Item":{fn:()=>item["remove"](),cFn:()=>1},
    "Cancel":{fn:()=>0,cFn:()=>1},
    "Move to Top":{fn:()=>sidebar.querySelector(".head").insertAdjacentElement("afterEnd",item),cFn:()=>!item.style.zIndex},
    "Move to Bottom":{fn:()=>sidebar.appendChild(item),cFn:()=>!item.style.zIndex},
    "-> sidebar":{fn:item.toSide,cFn:()=>item.style.zIndex},
    "box <-":{fn:item.toBox,cFn:()=>!item.style.zIndex}
  };
  item.addContextItem=(name,fn,cFn=()=>1)=>item.contextItems[name]={fn:fn,cFn:cFn};
  item.head.querySelector(".close").addEventListener('click',e=>item["remove"]());
	item.head.querySelector(".ud").addEventListener('click',e=>item.style.zIndex&&item.classList.toggle("c")||win._boxEdgeDetect());
  item.body.style.height=Math.max(item.body.offsetHeight,100)+"px";
  if (item.classList.contains("prompt")) item.head.querySelectorAll(".icon").forEach(icon=>icon["remove"]());
  return item;
};
export let createBox=(...args)=>createSidebarItem(...args).toBox();
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
let contextMenu=(item,x,y)=>{
  if (item.classList.contains("prompt")) return;
  let options = Object.entries(item.contextItems).filter(([name,entry])=>entry.cFn());
	let box=createBox("",`<div class=g2><div class=f>${item.querySelector(".title").innerText}.context</div>${options.map(([name,entry])=>`<button class=n>${name}</button>`).join("")}</div>`,"", "contextMenu");
	box.querySelector("button").focus();
  box.setStyle({left:Math.max(Math.min(win.innerWidth-box.offsetWidth/2,x),box.offsetWidth/2)+"px",top:Math.max(Math.min(win.innerHeight-box.offsetHeight/2,y),box.offsetHeight/2)+"px",transform:"translate(-50%, -50%)"});
  box.querySelectorAll("button").forEach(button=>button.addEventListener("click",()=>box["remove"](item.contextItems[button.innerText].fn())));
  box.addEventListener("mousedown",e=>e.stopPropagation());
  let docFunction=()=>box["remove"](doc.removeEventListener("mousedown",docFunction));
  setTimeout(()=>doc.addEventListener("mousedown",docFunction),10);
};
let zIndex=()=>Math.max(9000,...[...doc.querySelectorAll(".sb .box")].map(box=>box.style.zIndex))+1;
function headMouseDown(e){
  if (e.button) return contextMenu(this,e.clientX,e.clientY);
  if(!this.style.zIndex) return this.classList.toggle("c");
  if (e.target.tagName==="A") return;
  let x=e.clientX,y=e.clientY,l=this.offsetLeft,t=this.offsetTop;
  let boxDrag=e=>this.setStyle({left:Math.max(Math.min(win.innerWidth-this.offsetWidth,l+e.clientX-x),0)+"px",top:Math.max(Math.min(win.innerHeight-this.offsetHeight,t+e.clientY-y),0)+"px"});
  let boxDragEnd=e=>doc.removeEventListener('mouseup',boxDragEnd)||doc.removeEventListener('mousemove',boxDrag);
  doc.addEventListener('mouseup',boxDragEnd)||doc.addEventListener('mousemove',boxDrag);
};