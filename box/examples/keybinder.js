import {alert,createSidebarItem,doc} from "/box/box.js"
export let main=ns=>{
  let events={ctrl:{},alt:{}};
  let item=createSidebarItem("keybinder",`<style></style><div class=g2></div><div class=g2><button class=r>Add</button><button class=l>Highlight</button><span class=r>ModKey:</span><select class=l>${Object.keys(events).map(key=>`<option value=${key}>${key}</option>`).join("")}</select><span class=r>Key:</span><input class=l /><span class=r>Elem:</span><input class=l value='document.querySelectorAll("div.MuiButtonBase-root")[2]'/><span class=r>Name:</span><input class=l /></div>`,"\uea65");
  let keydownEvent=e=>{
    if (!doc.contains(item)) return document.removeEventListener("keydown",keydownEvent);
    if (e.key=="Alt"||e.key=="Control") return;
    if (e.getModifierState("Control")) return events.ctrl[e.key]&&e.preventDefault()||events.ctrl[e.key]();
    else if (e.getModifierState("Alt")) return events.alt[e.key]&&e.preventDefault()||events.alt[e.key]();
  }
  doc.addEventListener("keydown",keydownEvent);
  item.querySelector("button").addEventListener("click",()=>{
    try{
      let elem=eval(item.querySelectorAll("input")[1].value);
      events[item.querySelector("select").value][item.querySelector("input").value]=elem[Object.keys(elem)[1]].onClick.bind(null,{isTrusted:1,target:elem,preventDefault:()=>0});
      item.querySelector(".g2").insertAdjacentHTML("beforeEnd",`<span class=r>${item.querySelector("select").value}-${item.querySelector("input").value}:</span><span class=l>${item.querySelectorAll("input")[2].value||elem.innerText}</span>`);
    }catch(e){alert(e)}
  });
  item.querySelectorAll("button")[1].addEventListener("click",()=>{
    try{
      let elem=eval(item.querySelectorAll("input")[1].value);
      elem.style.background=elem[Object.keys(elem)[1]].onClick?"var(--success)":"var(--error)";
      setTimeout(()=>elem.style.background="",1000);
    }catch(e){alert(e)}
  });
  item.addContextItem("Clear Keybinds",()=>{
    item.querySelector(".g2").innerHTML="";
    events={ctrl:{},alt:{}};
  })
}