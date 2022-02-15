import { createSidebarItem, doc, sidebar } from "/box/box.js"
let slp=ms=>new Promise(r=>setTimeout(r,ms));
export let main=ns=>{
  let item=createSidebarItem("overview</span><span class=icon name=save>\ueb4b</span>",`<style>.react-draggable:first-of-type{display:none}.sb .overview{padding:10px;font-size:14px}.sb .overview table{display:table}</style><div class=overview>${doc.querySelector(".react-draggable:first-of-type table").outerHTML}</div>`,"&#xeb03");
  item.querySelector("[name=save]").addEventListener("mousedown",e=>e.stopPropagation()||doc.querySelector('button[aria-label="save game"]')?.click());
  let overview=item.querySelector(".overview");
  (async ()=>{while(sidebar.contains(item)){
    overview.innerHTML=doc.querySelector(".react-draggable:first-of-type table").outerHTML;
    await slp(1000);
  }})();
}