import {css} from "/box/css.js";
Element.prototype.setStyle=function(styles){Object.assign(this.style,styles)}
export let win=globalThis,doc=win["document"],sidebar=doc.querySelector(".sb"),elemFromHTML=html=>new Range().createContextualFragment(html).firstElementChild;
if (!sidebar){
  sidebar = doc.body.appendChild(elemFromHTML(`<div class="sb"><div class="head"><a class="icon lr"></a><span class=title>box.sidebar v0.10</span></div>`));
  sidebar.addEventListener('keydown',e=>e.stopPropagation());
  sidebar.querySelector('.head').addEventListener('click',()=>{
    sidebar.classList.toggle('c');
    setTimeout(()=>doc.querySelector(".monaco-editor")?.setStyle({width:"0px"}),255);
  });
  win._boxEdgeDetect=()=>doc.querySelectorAll('.sb .box').forEach(box=>box.setStyle({left:Math.max(Math.min(win.innerWidth-box.offsetWidth,box.offsetLeft),0)+"px",top:Math.max(Math.min(win.innerHeight-box.offsetHeight,box.offsetTop),0)+"px"})), win.addEventListener("resize",win._boxEdgeDetect);
  sidebar.insertAdjacentHTML('afterBegin',`<style>${css}</style>`);
}
export let createSidebarItem=(title,content,icon="",...classes)=>{
  let item=sidebar.appendChild(elemFromHTML(`<div class="${classes.concat(["item"]).join(" ")}"><div class="head"><a class="icon">${icon}</a><span class=title>${title}</span><a class="icon ud"></a><a class="icon close">&#xeab8</a></div><div class="body">${content}</div></div>`));
  Object.assign(item,{
    head:item.querySelector(".head"),
    body:item.querySelector(".body"),
    isBox:false,
    toSide:()=>{
      item.isBox=false;
      item.classList["remove"]("box");
      item.body.style.height=Math.max(item.body.offsetHeight,100)+"px",item.style.zIndex="";
    },
    toBox:()=>{
      item.isBox=true;
      item.classList.add("box");
      item.body.style.height="";
      item.setStyle({left:Math.floor(win.innerWidth/2-item.offsetWidth/2)+"px",top:Math.floor(win.innerHeight/2-item.offsetHeight/2)+"px",zIndex:zIndex()});
      return item;
    }
  });
  item.contextItems=[
    ["Remove Item",()=>item["remove"]()],
    ["Cancel",()=>0],
    ["Move to Top",()=>sidebar.querySelector(".head").insertAdjacentElement("afterEnd",item),()=>!item.isBox],
    ["Move to Bottom",()=>sidebar.appendChild(item),()=>!item.isBox],
    ["-> sidebar",item.toSide,()=>item.isBox],
    ["box <-",item.toBox,()=>!item.isBox]
  ];
  item.head.addEventListener('mousedown',headMouseDown.bind(item));
  item.head.querySelector(".close").addEventListener('click',e=>item["remove"]());
	item.head.querySelector(".ud").addEventListener('click',e=>item.isBox&&win._boxEdgeDetect(item.classList.toggle("c")));
  item.addEventListener('mousedown',e=>item.isBox&&e.button||item.setStyle({zIndex:zIndex()}));
  item.body.style.height=item.body.offsetHeight+"px";
  return item;
};
export let createBox=(...args)=>createSidebarItem(...args).toBox();
export let confirm=text=>{
	let box=createBox("Confirmation Prompt",`<div class=full>${text}</div><div class=g2><button><u>Y</u>es</button><button><u>N</u>o</button></div>`,"","prompt");
	box.querySelector("button").focus();
	box.addEventListener('keyup',e=>(e.key.toLowerCase()==="y"&&box.querySelector("button").click())||(e.key.toLowerCase()==="n"&&box.querySelectorAll("button")[1].click()));
	return new Promise(r=>box.querySelectorAll("button").forEach((button,i)=>button.addEventListener('click',()=>box["remove"](r(i==0)))));
};
export let prompt=text=>{
	let box=createBox("Input Prompt",`<div class=full>${text}</div><div class=g2><input/><button>Submit</button></div>`,"","prompt");
	box.querySelector("input").focus();
	box.querySelector("input").addEventListener('keyup',e=>e.key=='Enter'&&box.querySelector("button").click());
	return new Promise(r=>box.querySelector("button").addEventListener('click',()=>box["remove"](r(box.querySelector("input").value))));
};
export let select=(text,options)=>{
	let box=createBox("Selection Prompt",`<div class=full>${text}</div><div class=g2><select>${options.map(option=>`<option value="${option}">${option}</option>`).join("")}</select><button>Submit</button></div>`,"","prompt");
	box.querySelector("select").focus();
	return new Promise(r=>box.querySelector("button").addEventListener('click',()=>box["remove"](r(box.querySelector("select").value))));
};
export let alert=text=>{
	let box=createBox("Alert Message",`<div class=full>${text}</div><div class=full><button>Ok</button></div>`,"", "prompt");
	box.querySelector("button").focus();
	return new Promise(r=>box.querySelector("button").addEventListener('click',()=>r(box["remove"]())));
};
let contextMenu=(item,x,y)=>{
  if (item.classList.contains("prompt")) return;
  let options=item.contextItems.filter(entry=>entry.length<3||entry[2]());
	let box=createBox("",`<div class=full>${item.querySelector(".title").innerText}.context</div><div class=g2>${options.map(entry=>`<button>${entry[0]}</button>`).join("")}</div>`,"", "contextMenu");
	box.querySelector("button").focus();
  box.setStyle({left:Math.max(Math.min(win.innerWidth-box.offsetWidth/2,x),box.offsetWidth/2)+"px",top:Math.max(Math.min(win.innerHeight-box.offsetHeight/2,y),box.offsetHeight/2)+"px",transform:"translate(-50%, -50%)"});
  box.querySelectorAll("button").forEach((button,i)=>button.addEventListener("click",()=>box["remove"](options[i][1]())));
  box.addEventListener("mousedown",e=>e.stopPropagation());
  let docFunction=()=>box["remove"](doc.removeEventListener("mousedown",docFunction));
  setTimeout(()=>doc.addEventListener("mousedown",docFunction),10);
};
let zIndex=()=>Math.max(9000,...Array.from(doc.querySelectorAll(".sb .box")).map(box=>box.style.zIndex))+1;
function headMouseDown(e){
  if (e.button) return contextMenu(this,e.clientX,e.clientY);
  if(!this.isBox) return this.classList.toggle("c");
  if (e.target.tagName==="A") return;
  let x=e.clientX,y=e.clientY,l=this.offsetLeft,t=this.offsetTop;
  let boxDrag=e=>this.setStyle({left:Math.max(Math.min(win.innerWidth-this.offsetWidth,l+e.clientX-x),0)+"px",top:Math.max(Math.min(win.innerHeight-this.offsetHeight,t+e.clientY-y),0)+"px"});
  let boxDragEnd=e=>doc.removeEventListener('mouseup',boxDragEnd)||doc.removeEventListener('mousemove',boxDrag);
  doc.addEventListener('mouseup',boxDragEnd)||doc.addEventListener('mousemove',boxDrag);
};
