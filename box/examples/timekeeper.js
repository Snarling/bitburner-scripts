import { createSidebarItem, sidebar } from "/box/box.js"
/** @param {NS} ns **/
export async function main(ns) {
  let style=`<style>.f.clock{display:flex;width:247px;height:230px}.f.clock>div{flex:1 1 auto;padding:5px 7px;box-sizing:border-box;display:grid;grid-template: 1fr 1fr 1fr / 1fr 1fr;place-items:center center;grid-auto-flow:column;transform:rotate(180deg)}.f.clock>div>div{background:var(--button);height:60px;width:21px;border-radius:7px;transition:background 100ms;transform:rotate(180deg);text-align:center;vertical-align:middle;line-height:5}.f.clock>div>div.lit{background:var(--successlt);color:var(--button)}</style>`
  let item=createSidebarItem("timekeeper", `${style}<div class="f clock"><div>${"<div></div>".repeat(5)}</div>${`<div>${"<div></div>".repeat(6)}</div>`.repeat(2)}</div>`, "&#xeb7c");
  let pips = Array.from(item.querySelectorAll(".f.clock>div")).map(pipSet=>Array.from(pipSet.querySelectorAll(".f.clock>div>div")));
  let powers = [1, 2, 4, 8, 16, 32]
  let changeTime=()=>{
    if (!sidebar.contains(item)) return clearInterval(interval);
    let timeString = new Date().toLocaleTimeString("en-gb");
    let time = [Number(timeString.substring(0, 2)), Number(timeString.substring(3, 5)), Number(timeString.substring(6))];
    pips.forEach((pipSet,i)=>pipSet.forEach((pip,j)=>(time[i]&powers[j])===powers[j]?pip.classList.add("lit"):pip.classList["remove"]("lit")));
  }
  changeTime();
  let interval=setInterval(changeTime, 1000);
  let showNumbers=false;
  item.addContextItem("Toggle Numbers",()=>{
    showNumbers=!showNumbers;
    pips.forEach(pipSet=>pipSet.forEach((pip,i)=>pip.innerText=showNumbers?powers[i]:""));
  });
}