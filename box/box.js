import {css} from "/box/css.js";
export let doc=eval("document"), win=globalThis;
let zIndex=()=>Math.max(9000,...Array.from(doc.querySelectorAll(".box")).map(box=>box.style.zIndex))+1;
if (!win._boxEdgeDetect) win._boxEdgeDetect=()=>Array.from(doc.querySelectorAll(".box")).forEach(box=>Object.assign(box.style,{left:Math.max(Math.min(win.innerWidth-box.offsetWidth,box.offsetLeft),0)+"px",top:Math.max(Math.min(win.innerHeight-box.offsetHeight,box.offsetTop),0)+"px"})), win.addEventListener("resize",win._boxEdgeDetect);
let boxDragStart=(box,e)=>{
  e.preventDefault();
  let x=e.clientX,y=e.clientY,l=box.offsetLeft,t=box.offsetTop;
  let boxDrag=e=>Object.assign(box.style,{left:Math.max(Math.min(win.innerWidth-box.offsetWidth,l+e.clientX-x),0)+"px",top:Math.max(Math.min(win.innerHeight-box.offsetHeight,t+e.clientY-y),0)+"px"});
  let boxDragEnd=e=>doc.removeEventListener('mouseup',boxDragEnd)||doc.removeEventListener('mousemove',boxDrag);
  doc.addEventListener('mouseup',boxDragEnd)||doc.addEventListener('mousemove',boxDrag);
};
export let createBox=(title,mainContent,...extraClasses)=>{
  doc.getElementById("boxCSS")||doc.head.insertAdjacentHTML('beforeend',`<style id='boxCSS'>${css}</style>`);
  let box=doc.body.appendChild(new Range().createContextualFragment(`<div class=${extraClasses.length>0?`"box ${extraClasses.join(" ")}"`:"box"} style=z-index:${zIndex()}><div class=title><span>${title}</span><a class=toggle></a><a class=close></a></div>${mainContent}</div>`).firstElementChild);
	Object.assign(box.style,{left:Math.floor(win.innerWidth/2-box.offsetWidth/2)+"px",top:Math.floor(win.innerHeight/2-box.offsetHeight/2)+"px"});
	box.querySelector(".title").addEventListener('mousedown',e=>e.target.tagName!="A"&&boxDragStart(box,e));
	box.querySelector(".close").addEventListener('click',e=>box["remove"]());
	box.querySelector(".toggle").addEventListener('click',e=>win._boxEdgeDetect(box.classList.toggle("min")));
	box.addEventListener('mousedown',()=>box.style.zIndex=zIndex());
	box.addEventListener('keydown',e=>e.stopPropagation());
	box.addLogDiv=width=>box.insertAdjacentHTML('beforeEnd',`<div class=resizer style=min-width:${width}px><div class=log></div></div>`);
	box.log=(html,ts=true,elem=box.querySelector(".log"))=>{
		elem.insertAdjacentHTML('beforeEnd',`${elem.innerText?"<br />":""}${ts?`[<span class=timestamp>${new Date().toLocaleTimeString("en-gb")}</span>] `:""}${html}`);
		elem.scrollTop=elem.scrollHeight;
	}
	box.stripTitleButtons=()=>Array.from(box.querySelectorAll(".title a")).forEach(span=>span["remove"]());
	return box;
};
export let confirm=text=>{
	let box=createBox("Confirmation Prompt",`<center>${text}</center><div class=g2><button><u>Y</u>es</button><button><u>N</u>o</button></div>`, "prompt");
	box.stripTitleButtons();
	box.querySelector("button").focus();
	box.addEventListener('keyup',e=>(e.key.toLowerCase()==="y"&&box.querySelector("button").click())||(e.key.toLowerCase()==="n"&&box.querySelectorAll("button")[1].click()));
	return new Promise(r=>box.querySelectorAll("button").forEach((button,i)=>button.addEventListener('click',()=>box["remove"](r(i==0)))));
};
export let prompt=text=>{
	let box=createBox("Input Prompt",`<center>${text}</center><div class=g2><input/><button>Submit</button></div>`, "prompt");
	box.stripTitleButtons();
	box.querySelector("input").focus();
	box.querySelector("input").addEventListener('keyup',e=>e.key=='Enter'&&box.querySelector("button").click());
	return new Promise(r=>box.querySelector("button").addEventListener('click',()=>box["remove"](r(box.querySelector("input").value))));
};
export let select=(text,options)=>{
	let box=createBox("Selection Prompt",`<center>${text}</center><div class=g2><select>${options.map(option=>`<option value="${option}">${option}</option>`).join("")}</select><button>Submit</button></div>`, "prompt");
	box.stripTitleButtons();
	box.querySelector("select").focus();
	return new Promise(r=>box.querySelector("button").addEventListener('click',()=>box["remove"](r(box.querySelector("select").value))));
};
export let alert=(text)=>{
	let box=createBox("Alert Message",`<center>${text}<br /><br /><button>Ok</button></center>`, "prompt");
	box.stripTitleButtons();
	box.querySelector("button").focus();
	return new Promise(r=>box.querySelector("button").addEventListener('click',()=>r(box["remove"]())));
};
