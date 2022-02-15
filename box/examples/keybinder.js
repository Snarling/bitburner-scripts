import { alert, createSidebarItem, doc } from "/box/box.js"
/** @param {NS} ns **/
export async function main(ns) {
  let events={ctrl:{},alt:{}};
  let item=createSidebarItem("keybinder",`<style></style><div class=g2></div><button>Close</button><button>Highlight</button><button>Add</button><div class=g2><span>ModKey:</span><select>${Object.keys(events).map(key=>`<option value=${key}>${key}</option>`).join("")}</select><span>Key:</span><input /><span>Elem:</span><input value='document.querySelectorAll("div.MuiButtonBase-root")[2]'/><span>Name:</span><input /></div>`,"&#xea65");
  let keydownEvent=e=>{
    if (e.getModifierState("Control")) return events.ctrl[e.key]&&e.preventDefault()||events.ctrl[e.key]();
    else if (e.getModifierState("Alt")) return events.alt[e.key]&&e.preventDefault()||events.alt[e.key]();
  }
  doc.addEventListener("keydown",keydownEvent);
  item.querySelector("button").addEventListener("click",()=>item["remove"](doc.removeEventListener("keydown",keydownEvent)));
  item.querySelectorAll("button")[1].addEventListener("click",()=>{
    try{
      let elem=eval(item.querySelectorAll("input")[1].value);
      elem.style.background=elem[Object.keys(elem)[1]].onClick?"var(--success)":"var(--error)";
      setTimeout(()=>elem.style.background="",1000);
    }catch(e){alert(e)}
  });
  item.querySelectorAll("button")[2].addEventListener("click",()=>{
    try{
      let elem=eval(item.querySelectorAll("input")[1].value);
      events[item.querySelector("select").value][item.querySelector("input").value]=elem[Object.keys(elem)[1]].onClick.bind(null,{isTrusted:1,target:elem,preventDefault:()=>0});
      item.querySelector(".g2").insertAdjacentHTML("beforeEnd",`<span>${item.querySelector("select").value}-${item.querySelector("input").value}:</span><span>${item.querySelectorAll("input")[2].value||elem.innerText}</span>`);
    }catch(e){alert(e)}
  });
}