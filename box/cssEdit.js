import {doc,createBox} from "/box/box.js";
export let main=async ns=>{
  let shorthand={pri:"primary",sec:"secondary",bg:"background",err:"error",warn:"warning",lt:"light",dk:"dark"}
  let convert=(str,k,v=k?0:1)=>{
    for (let entry of Object.entries(shorthand)) str=str.replaceAll(entry[k],entry[v]);
    return str;
  }
  let box=createBox("CSS Editor", `<button>Load from File</button><button>Load from Page</button><button>Save to File</button><button>Save to Page</button><div class=resizer style="min-width:511px;height:300px"><textarea spellcheck=false></textarea></div><button>Load Theme from Game</button><button>Save Theme to Game</button><button>Minify</button><button>Beautify</button>`),
    pageCSS=doc.querySelector(`#boxCSS`),
    textArea=box.querySelector('textarea');
  let events=[
    ()=>textArea.value = ns.read("/box/css.js").replace(/^export let css=`|`;$/g, ""),
    ()=>textArea.value = pageCSS.innerHTML,
    ()=>ns.write("/box/css.js", `export let css=\`${textArea.value}\`;`, "w"),
    ()=>pageCSS.innerHTML = textArea.value,
    ()=>{
      events[6]();
      textArea.value = textArea.value.replace(/(?<=body{).*?(?=})/,Object.entries(ns.ui.getTheme()).map(([k,v])=>`--${convert(k,1)}:${v};`).join("")+`--ff:"${ns.ui.getStyles().fontFamily.replace(/,.*/,"")}"`);      
      events[7]();
    },
    ()=>{
      events[6]();
      ns.ui.setTheme((JSON.parse(convert((`{"`+textArea.value.match(/(?<=body{).*?(?=;--ff)/)[0]+`"}`).replace(/;/g,'","').replace(/--/g,"").replace(/:/g,'":"'),0))));
      events[7]();
    },
    ()=>textArea.value = textArea.value.replace(/(?<=[{:;}])\s+/g, "").replace(/\s+(?={)|;(?=})/g, ""),
    ()=>textArea.value = textArea.value.replace(/(?<=[{;}])|(?=})/g, "\n  ").replace(/\n  }\s+/g, ";\n}\n")
  ]
  Array.from(box.querySelectorAll("button")).forEach((button,i)=>button.addEventListener('click',events[i]));
  events[0]();
  while (doc.body.contains(box)) await ns.asleep(1000);
};
