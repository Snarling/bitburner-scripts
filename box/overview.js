import {createSidebarItem,doc,sidebar} from "box/box"
let focusFn, saveBtn=doc.querySelector('button[aria-label="save game"]'), saveFn=saveBtn[Object.keys(saveBtn)[1]].onClick, stats=["hp","money","hack","str","def","dex","agi","cha","int"];
export let main=ns=>{
  let overview=createSidebarItem("overview",`<style>.react-draggable:first-of-type{display:none}.overview .icon{position:relative}.overview{--str:var(--combat);--def:var(--combat);--dex:var(--combat);--agi:var(--combat);row-gap:2px !important;font-size:14px}.overview>.icons{border-top:1px solid var(--pri);width:100%;display:grid;grid:auto-flow 30px / repeat(auto-fit, minmax(30px, auto));place-items:center}.overview>.bar{height:3px;width:100%;margin-top:-10px;overflow:hidden;background:var(--black)}.overview>.bar>*{height:100%;transition:transform 100ms}${stats.map(stat=>`.overview .${stat}{color:var(--${stat})}.overview .bg-${stat}{background:var(--${stat})}`).join("")}</style>
  <div class="g2 overview">
    ${stats.map((stat,i)=>`<span class="${stat} l">${stat.toUpperCase()}</span><span class="${stat} r"></span>${i>1&&i<8?`<div class="f bar"><div class="bg-${stat}"></div></div>`:""}`).join("")}
    <div class="f icons"><span name=save class=icon>\ueb4b<div class=tooltip>Save Game</div></span><span name=focus class="icon hidden">\ueb4c<div class=tooltip>Focus</div></span></div>
    <div class="f misc"></div>
  </div>`,"\ueb03");
  let defaultOverview;
  stats.forEach(stat=>overview[stat]=overview.querySelector(`.${stat}.r`));
  overview.bars=overview.querySelectorAll(".bar div");
  overview.misc=overview.querySelector(".misc");
  overview.focus=overview.querySelector("[name=focus]");
  overview.focus.addEventListener("click",()=>focusFn()||updateOverview());
  overview.querySelector("[name=save]").addEventListener("click",saveFn);

  let initializeOverview=()=>{
    defaultOverview=doc.querySelector(".react-draggable:first-of-type tbody");
    if (!defaultOverview) return false;
    let tdp=defaultOverview.querySelectorAll("td p");
    stats.forEach((stat,i)=>defaultOverview[stat]=tdp[i*2]);
    defaultOverview.bars=defaultOverview.querySelectorAll("span>span[style]");
    defaultOverview._rows=defaultOverview.getElementsByTagName("tr");
    updateOverview();
    return true;
  };
  let updateOverview=()=>{
    defaultOverview=doc.querySelector(".react-draggable:first-of-type tbody");
    if (defaultOverview && defaultOverview.hp){
      stats.forEach(stat=>overview[stat].innerText=defaultOverview[stat]?.innerText||"N/A")
      overview.bars.forEach((bar,i)=>bar.style.transform=defaultOverview.bars[i].style.transform);
      let miscText=[], focus=false;
      for (let i=17;i<defaultOverview._rows.length;i++){
        let txt=defaultOverview._rows[i].innerText;
        if (txt==="Focus"){
          focus=true;
          if (focusFn) continue;
          let btn=defaultOverview._rows[i].querySelector("button");
          focusFn=btn[Object.keys(btn)[1]].onClick;
        }
        else miscText.push(txt);
      }
      overview.focus.classList[focus?"remove":"add"]("hidden");
      overview.misc.innerText=miscText.join("\n");
    } else if(!initializeOverview()) overview.misc.innerText="Welcome to the Bitverse.";
  }
  updateOverview();
  let interval=setInterval(()=>{
    if (!sidebar.contains(overview)) return clearInterval(interval);
    updateOverview();
  },500)
}
