import {createSidebarItem,doc,sidebar} from "/box/box.js"
let focusFn, saveBtn=doc.querySelector('button[aria-label="save game"]'), saveFn=saveBtn[Object.keys(saveBtn)[1]].onClick;
export let main=ns=>{
  let item=createSidebarItem("overview</span><span class=icon name=save>\ueb4b",`<style>.react-draggable:first-of-type{display:none}.sb .overview{padding:10px;font-size:14px}.sb .overview table{display:table}</style><div class=overview>${doc.querySelector(".react-draggable:first-of-type table").outerHTML}</div>`,"\ueb03");
  item.querySelector("[name=save]").addEventListener("mousedown",e=>e.stopPropagation()||saveFn());
  let overview=item.querySelector(".overview");
  let interval=setInterval(()=>{
    if (!sidebar.contains(item)) return clearInterval(interval);
    overview.innerHTML=doc.querySelector(".react-draggable:first-of-type table").outerHTML;
    let focusBtn=overview.querySelector("button");
    if (focusBtn){
      if (focusFn) return focusBtn.addEventListener("click",focusFn);
      let f=doc.querySelector(".react-draggable:first-of-type tbody tr:last-of-type button");
      focusFn=f[Object.keys(f)[1]].onClick;
      focusBtn.addEventListener("click",focusFn)
    }
  },500);
}