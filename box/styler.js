import {createBox,doc,sidebar,slp} from "/box/box.js"
export let main=async ns=>{
  let shorthand={pri:"primary",sec:"secondary",bg:"background",err:"error",warn:"warning",lt:"light",dk:"dark"}
  let convert=(str,k,v=k?0:1)=>{
    for (let entry of Object.entries(shorthand)) str=str.replaceAll(entry[k],entry[v]);
    return str;
  }
  let box=createBox('styler', `<div class="flex nogrow"><button>Hard Load</button><button>Soft Load</button><button>Hard Save</button><button>Soft Save</button></div><textarea spellcheck=false></textarea><div class="flex nogrow"><button>Theme Load</button><button>Theme Save</button><button>Minify</button><button>Beautify</button></div>`,"\ueb5c"),
    pageCSS=sidebar.querySelector('style'),
    textArea=box.querySelector('textarea'),
    minify=css=>css.replace(/(?<=[{:;}])\s+/g, "").replace(/\s+(?={)|;(?=})/g, ""),
    beautify=css=>css.replace(/(?<=[{;}])|(?=})/g, "\n  ").replace(/\n  }\s+/g, ";\n}\n").trim();
  box.style.height="400px";
  let fn={
    "Hard Load":()=>textArea.value = beautify(/(?<=let css=`)[\s\S]*?(?=`)/.exec(ns.read("/box/box.js"))[0]),
    "Soft Load":()=>textArea.value = beautify(pageCSS.innerHTML),
    "Hard Save":()=>ns.write("/box/box.js", ns.read("/box/box.js").replace(/(?<=let css=`)[\s\S]*?(?=`)/, minify(textArea.value)), "w"),
    "Soft Save":()=>pageCSS.innerHTML = minify(textArea.value),
    "Theme Load":()=>textArea.value = beautify(minify(textArea.value).replace(/(?<=body{).*?(?=;overflow)/,Object.entries(ns.ui.getTheme()).map(([k,v])=>`--${convert(k,1)}:${v};`).join("")+`--ff:"${ns.ui.getStyles().fontFamily.replace(/,.*/,"")}"`)),
    "Theme Save":()=>ns.ui.setTheme((JSON.parse(convert((`{"`+minify(textArea.value).match(/(?<=body{).*?(?=;--ff)/)[0]+`"}`).replace(/;/g,'","').replace(/--/g,"").replace(/:/g,'":"'),0)))),
    "Minify":()=>textArea.value = minify(textArea.value),
    "Beautify":()=>textArea.value = beautify(minify(textArea.value))
  }
  box.querySelectorAll("button").forEach((button,i)=>button.addEventListener('click',fn[button.innerText]));
  fn["Soft Load"]();
  while (doc.body.contains(box)) await slp(1000);  
}
