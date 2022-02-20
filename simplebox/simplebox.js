let css=`.simplebox{background:black;position:fixed;border:1px solid lime;width:min-content;min-width:min-content;min-height: 0px;font:14px "Lucida Console";resize:both;overflow:hidden}.simplebox>.head{display:flex;background: lime;color: black;font-weight: bold;user-select:none;min-width:max-content;padding:2px;border: 1px solid black;cursor:move}.simplebox .title{margin-right: auto}.simplebox .close{margin-left:50px;cursor:pointer}.simplebox>.body{color: lime;padding: 2px;overflow: scroll}`;
if (document.head.querySelector("#simple-box-css")) document.head.querySelector("#simple-box-css").innerText=css;
else document.head.insertAdjacentHTML("beforeEnd", `<style id=simple-box-css>${css}</style>`)

export let createSimplebox=(title,content)=>{
  document.body.insertAdjacentHTML("beforeEnd",`<div class=simplebox><div class=head><span class=title>${title}</span><span class=close>X<span></div><div class=body>${content}</div></div>`);
  let simplebox = document.querySelector("body>div:last-of-type")
  simplebox.style.left=Math.floor(window.innerWidth/2-simplebox.offsetWidth/2)+"px";
  simplebox.style.top=Math.floor(window.innerHeight/2-simplebox.offsetHeight/2)+"px";
  simplebox.addEventListener('keydown',e=>e.stopPropagation());
  simplebox.querySelector(".head").addEventListener("mousedown",e=>{
    let boxInitialX = simplebox.offsetLeft;
    let boxInitialY = simplebox.offsetTop;
    let mouseInitialX = e.clientX;
    let mouseInitialY = e.clientY;
    let mousemoveFunction=e=>{
      simplebox.style.left = (boxInitialX + e.clientX - mouseInitialX) + "px"; 
      simplebox.style.top = (boxInitialY + e.clientY - mouseInitialY) + "px";
    };
    let mouseupFunction=e=>{
      document.removeEventListener("mousemove",mousemoveFunction);
      document.removeEventListener("mouseup",mouseupFunction);
    };
    document.addEventListener("mousemove",mousemoveFunction);
    document.addEventListener("mouseup",mouseupFunction);
  });
  simplebox.querySelector(".close").addEventListener("click",()=>simplebox.remove())
  return simplebox;
};
