let doc=eval("document");
let find=q=>{
  for(let l of doc.querySelectorAll("*")){
    let k=Object.keys(l)[1];
    let c=k?l[k].children:0;
    if(c?.props && c.props[q])return c.props[q];
    if(c instanceof Array)for(let n of c)if(n?.props&&n.props[q]) return n.props[q];
  }
};
let t=find("terminal"), p=find("player"), f=["CSEC","avmnite-02h","I.I.I.I","run4theh111z","w0r1d_d43m0n"];
export let main=ns=>{
  let theme=ns.ui.getTheme(), el=React.createElement, sc=(s,p)=>ns.scan(s).map(v=>v!=p?sc(v,s):s);
  let Style=el("style",null,`.scanLink{color:${theme.secondary};cursor:pointer;text-decoration:underline}.scanLink.f{color:${theme.errordark}}.scanLink.r{color:${theme.primary}}.scanLink.r.f{color:${theme.infolight}}.scanLink::before{content:"◉";color:${theme.errordark}}.scanLink.r::before{color:${theme.successdark}}.scanToggle{margin-left:-16px;cursor:pointer}.scanToggle::before{font-family:codicon;content:"\ueab4"}.scanToggle.hidden::before{content:"\ueab6"}.scanContainer{margin-left:16px}.scanContainer.hidden{display:none}`);
  let Link=name=>el("a",{className:`scanLink${ns.hasRootAccess(name)?" r":""}${f.includes(name)?" f":""}`, onClick:()=>t.connectToServer(p,name)},name+"\n");
  let Container=(name,contents,refs=[React.createRef(), React.createRef()])=>[el("span",{className:"scanToggle",ref:refs[0],onClick:()=>refs.forEach(ref=>ref.current.classList.toggle("hidden"))},""),Link(name),el("div",{className:"scanContainer",ref:refs[1]},contents.map(entry=>entry.length==1?Link(entry[0]):Container(entry[0],entry.slice(1))))];
  t.printRaw(el("div",{style:{marginLeft:"16px"}},Style,Container("home",sc("home"))));
}
