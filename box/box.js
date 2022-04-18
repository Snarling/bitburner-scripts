let css=`body{--prilt:#fd0;--pri:#fd0;--pridk:#fd0;--successlt:#ce5;--success:#ce5;--successdk:#ce5;--errlt:#c04;--err:#c04;--errdk:#c04;--seclt:#28c;--sec:#28c;--secdk:#28c;--warnlt:#f70;--warn:#f70;--warndk:#f70;--infolt:#3ef;--info:#3ef;--infodk:#3ef;--welllt:#146;--well:#222;--white:#fff;--black:#000;--hp:#c04;--money:#fc7;--hack:#ce5;--combat:#f70;--cha:#b8f;--int:#3ef;--rep:#b8f;--disabled:#888;--bgpri:#000;--bgsec:#111;--button:#146;--ff:"Lucida Console";overflow:hidden;display:flex}#root{flex:1 1 calc(100vw - 248px);overflow:scroll}.sb{font:12px var(--ff);color:var(--pri);background:var(--bgsec);overflow:hidden scroll;width:247px;min-height:100%;border-left:1px solid var(--welllt)}.sb *{vertical-align:middle;margin:0;font:inherit}.sb.c{width:45px}.sb.t, .sb.t>div{transition:height 200ms, width 200ms, color 200ms}.sbitem,.box{overflow:hidden;min-height:28px;max-height:90%}.sbitem{border-top:1px solid var(--welllt);resize:vertical;width:unset !important}.sbitem.c{color:var(--sec)}.box{position:fixed;width:min-content;min-width:min-content;resize:both;background:var(--bgsec)}.box.c{height:unset !important;width:unset !important;background:none}.head{display:flex;white-space:pre;font-weight:bold;user-select:none;height:28px;align-items:center}:is(.sb,.sbitem)>.head{direction:rtl;cursor:pointer;padding:3px 0px}.box>.head{background:var(--pri);color:var(--bgpri);padding:0px 3px;cursor:move}.body{font-size:12px;flex-direction:column;height:calc(100% - 31px)}.flex,:not(.noflex)>.body{display:flex}.flex>*,.body>*{flex:1 1 auto}.box>.body{border:1px solid var(--welllt)}.sb .title{margin:0 auto;font-size:14px;line-height:}.sbitem .close{display:none}.c:not(.sb),.c>.sbitem{height:28px !important;resize:none}.box.c>.body{display:none}.box.prompt{box-shadow:0 0 0 10000px #0007;min-width:400px}.box.prompt>.head>.icon{display:none}.sb .contextMenu{opacity:0.95;resize:none;background:var(--bgpri)}.sb .contextMenu .head{display:none}.sb .contextMenu .body{height:unset;border-radius:5px}.sb .icon{cursor:pointer;font:25px "codicon";line-height:0.9;display:flex;align-items:center}.sb .icon span{display:inline-block;font:25px -ff;width:25px;text-align:center}.sb .icon svg{height:21px;width:21px;margin:2px}:is(.sb,.sbitem)>.head>.icon{padding:0px 10px}.c>.head>.collapser{transform:rotate(180deg)}.sb :is(input,select,button,textarea){color:var(--pri);outline:none;border:none;white-space:pre}.sb :is(textarea,.log){white-space:pre-wrap;background:none;padding:0px;overflow-y:scroll}.sb :is(input,select){padding:3px;background:var(--well);border-bottom:1px solid var(--prilt);transition:border-bottom 250ms}.sb input:hover{border-bottom:1px solid var(--black)}.sb input:focus{border-bottom:1px solid var(--prilt)}.sb :is(button,input[type=checkbox]){background:var(--button);transition:background 250ms;border:1px solid var(--well)}.sb :is(button,input[type=checkbox]):hover{background:var(--bgsec)}.sb :is(button,input[type=checkbox]):focus, .sb select{border:1px solid var(--sec)}.sb button{padding:3px 6px;user-select:none}.sb .ts{color:var(--infolt)}.sb input[type=checkbox]{appearance:none;display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px}.sb input[type=checkbox]:checked::after{font:22px codicon;content:""}.g2{display:grid;grid:auto-flow auto / auto auto;gap:6px;margin:5px;place-items:center}.g2>.l{justify-self:start}.g2>.r{justify-self:end}.g2>.f{grid-column:1 / span 2;text-align:center}.hidden, .tooltip{display:none}*:hover>.tooltip{display:block;position:absolute;left:-5px;bottom:calc(100% + 5px);border:1px solid var(--welllt);background:var(--bgsec);color:var(--pri);font:14px var(--ff);padding:5px;white-space:pre}.nogrow{flex:0 1 auto !important}`;
export let win=globalThis, doc=win["document"], sidebar=doc.querySelector(".sb"),
  ts=()=>`[<span class=ts>${new Date().toLocaleTimeString("en-gb")}</span>]`,
  slp=ms=>new Promise(r=>setTimeout(r,ms)),
  elemFromHTML=html=>new Range().createContextualFragment(html).firstElementChild;
if (!sidebar){
  sidebar=doc.body.appendChild(elemFromHTML(`<div class="sb"><style>${css}</style><div class="head"><a class="icon collapser">\ueab6</a><span class=title>box.sidebar v1.1</span></div>`));
  sidebar.addEventListener('keydown',e=>e.stopPropagation());
  sidebar.querySelector('.head').addEventListener('click',()=>{
    transition(()=>sidebar.classList.toggle('c'));
    setTimeout(()=>doc.querySelector(".monaco-editor")&&Object.assign(doc.querySelector(".monaco-editor").style,{width:"0px"}),255);
  });
  win._boxEdgeDetect=()=>doc.querySelectorAll('.sb .box').forEach(box=>Object.assign(box.style,{left:Math.max(Math.min(win.innerWidth-box.offsetWidth,box.offsetLeft),0)+"px",top:Math.max(Math.min(win.innerHeight-box.offsetHeight,box.offsetTop),0)+"px"}));
  win.addEventListener("resize",win._boxEdgeDetect);
}
let createItem=(title, content, icon, ...classes)=>{
  let item=sidebar.appendChild(elemFromHTML(`<div class="${classes.join(" ")}"><div class="head"><a class="icon">${icon}</a><span class=title>${title}</span><a class="icon collapser">\ueab7</a><a class="icon close">\ueab8</a></div><div class="body">${content}</div></div>`));
  Object.assign(item,{
    head:item.querySelector(".head"),
    body:item.querySelector(".body"),
    toggleType:()=>["box","sbitem"].forEach(cl=>item.classList.toggle(cl)),
    logTarget:item.querySelector(".log"),
    log:(html, timestamp=true)=>{
      if (!item.logTarget || !doc.contains(item.logTarget)) item.logTarget=item.body.appendChild(elemFromHTML("<div class=log></div>"));
      let logEntry=item.logTarget.appendChild(elemFromHTML(`<p>${timestamp?ts():""} ${html}</p>`));
      item.logTarget.scrollTop=item.logTarget.scrollHeight;
      return logEntry;
    },
    recalcHeight:()=>{item.style.height="";item.style.height=item.offsetHeight+"px"},
    contextItems:{},
    addContextItem:(name,fn,cFn=()=>1)=>item.contextItems[name]={fn:fn,cFn:cFn},
  });

  [["Remove Item",()=>item["remove"]()],
  ["Cancel",()=>0],
  ["Float to Top",()=>sidebar.querySelector(".head").insertAdjacentElement("afterEnd",item),()=>item.classList.contains("sbitem")],
  ["Sink to Bottom",()=>sidebar.appendChild(item),()=>item.classList.contains("sbitem")],
  ["Toggle Type",()=>item.toggleType()],
  ["Recalculate Height",item.recalcHeight]].forEach(args=>item.addContextItem(...args));
    
  item.addEventListener('mousedown',e=>item.classList.contains("box")&&Object.assign(item.style,{zIndex:zIndex()}));
  item.head.addEventListener('mousedown',e=>{
    if(item.classList.contains("sbitem")) return e.button||transition(()=>item.classList.toggle("c"));
    if (e.target.tagName==="A") return;
    let x=e.clientX,y=e.clientY,l=item.offsetLeft,t=item.offsetTop;
    let boxDrag=e=>Object.assign(item.style,{left:Math.max(Math.min(win.innerWidth-item.offsetWidth,l+e.clientX-x),0)+"px",top:Math.max(Math.min(win.innerHeight-item.offsetHeight,t+e.clientY-y),0)+"px"});
    let boxDragEnd=e=>doc.removeEventListener('mouseup',boxDragEnd)||doc.removeEventListener('mousemove',boxDrag);
    doc.addEventListener('mouseup',boxDragEnd)||doc.addEventListener('mousemove',boxDrag);
  });
  item.head.querySelector(".close").addEventListener('click',e=>item["remove"]());
  item.head.querySelector(".collapser").addEventListener('click',e=>item.classList.contains("box")&&transition(()=>item.classList.toggle("c")||win._boxEdgeDetect()));
  item.head.addEventListener("contextmenu",e=>e.preventDefault()||contextMenu(item,e.clientX,e.clientY));
  Object.assign(item.style,{left:Math.floor(win.innerWidth/2-item.offsetWidth/2)+"px",top:Math.floor(win.innerHeight/2-item.offsetHeight/2)+"px",height:(item.offsetHeight||200)+"px",width:(item.offsetWidth||200)+"px",zIndex:zIndex()});
  return item;
};
export let createBox=(title, content, icon="\uea74", ...classes)=>createItem(title, content, icon, ...classes, "box");
export let createSidebarItem=(title, content, icon="\uea74", ...classes)=>createItem(title, content, icon, ...classes, "sbitem");
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
  Object.assign(box.style,{left:Math.max(Math.min(win.innerWidth-box.offsetWidth/2,x),box.offsetWidth/2)+"px",top:Math.max(Math.min(win.innerHeight-box.offsetHeight/2,y),box.offsetHeight/2)+"px",transform:"translate(-50%, -50%)"});
  box.querySelectorAll("button").forEach(button=>button.addEventListener("click",()=>box["remove"](item.contextItems[button.innerText].fn())));
  box.addEventListener("mousedown",e=>e.stopPropagation());
  let docFunction=()=>box["remove"](doc.removeEventListener("mousedown",docFunction));
  setTimeout(()=>doc.addEventListener("mousedown",docFunction),10);
};
let transition=fn=>{
  sidebar.classList.add("t");
  fn();
  setTimeout(()=>sidebar.classList["remove"]("t"),200);
}
let zIndex=()=>Math.max(9000,...[...doc.querySelectorAll(".sb .box")].map(box=>box.style.zIndex))+1;
