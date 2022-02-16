import {createBox,doc,slp} from "/box/box.js"
export let main=async ns=>{
  let shorthand={pri:"primary",sec:"secondary",bg:"background",err:"error",warn:"warning",lt:"light",dk:"dark"}
  let convert=(str,k,v=k?0:1)=>{
    for (let entry of Object.entries(shorthand)) str=str.replaceAll(entry[k],entry[v]);
    return str;
  }
  let box=createBox('styler', `<button>Load from File</button><button>Load from Page</button><button>Save to File</button><button>Save to Page</button><div class=resizer style="height:300px"><textarea spellcheck=false></textarea></div><button>Load Theme from Game</button><button>Save Theme to Game</button><button>Minify</button><button>Beautify</button>`,"&#xeb5c"),
    pageCSS=doc.querySelector('#boxstyles'),
    textArea=box.querySelector('textarea'),
    minify=css=>css.replace(/(?<=[{:;}])\s+/g, "").replace(/\s+(?={)|;(?=})/g, ""),
    beautify=css=>css.replace(/(?<=[{;}])|(?=})/g, "\n  ").replace(/\n  }\s+/g, ";\n}\n").trim();
  box.style.width="max-content";
  let fn={
    "Load from File":()=>textArea.value = beautify(/(?<=let css=`)[\s\S]*?(?=`)/.exec(ns.read("/box/box.js"))[0]),
    "Load from Page":()=>textArea.value = beautify(pageCSS.innerHTML),
    "Save to File":()=>ns.write("/box/box.js", ns.read("/box/box.js").replace(/(?<=let css=`)[\s\S]*?(?=`)/, minify(textArea.value)), "w"),
    "Save to Page":()=>pageCSS.innerHTML = minify(textArea.value),
    "Load Theme from Game":()=>textArea.value = beautify(minify(textArea.value).replace(/(?<=body{).*?(?=})/,Object.entries(ns.ui.getTheme()).map(([k,v])=>`--${convert(k,1)}:${v};`).join("")+`--ff:"${ns.ui.getStyles().fontFamily.replace(/,.*/,"")}"`)),
    "Save Theme to Game":()=>ns.ui.setTheme((JSON.parse(convert((`{"`+minify(textArea.value).match(/(?<=body{).*?(?=;--ff)/)[0]+`"}`).replace(/;/g,'","').replace(/--/g,"").replace(/:/g,'":"'),0)))),
    "Minify":()=>textArea.value = minify(textArea.value),
    "Beautify":()=>textArea.value = beautify(minify(textArea.value))
  }
  box.querySelectorAll("button").forEach((button,i)=>button.addEventListener('click',fn[button.innerText]));
  fn["Load from File"]();
  while (doc.body.contains(box)) await slp(1000);  
}