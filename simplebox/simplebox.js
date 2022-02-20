//CSS styles that will be injected onto the page. 
let css=
`.simplebox{
  background:black;
  position: fixed;
  border: 1px solid lime;
  width: min-content;
  min-width: min-content;
  min-height: 20px;
  font: 14px "Lucida Console";
  resize:both;
  overflow:hidden;
}
.simplebox>.head{
  display:flex;
  background: lime;
  color: black;
  font-weight: bold;
  user-select:none;
  min-width:max-content;
  padding:2px;
  border: 1px solid black;
  cursor:move;
}
.simplebox .title{
  margin-right: auto;
}
.simplebox .close{
  margin-left:50px;
  cursor:pointer;
}
.simplebox>.body{
  color: lime;
  padding: 2px;
  overflow: scroll;
}`;

// If the styles are already on the page, just update them. Otherwise, inject a new style element.
if (document.head.querySelector("#simple-box-css")) document.head.querySelector("#simple-box-css").innerText=css;
else document.head.insertAdjacentHTML("beforeEnd", `<style id=simple-box-css>${css}</style>`)

export let createSimplebox=(title,content)=>{
  // Inject the new container onto the page, with the specified title and content
  document.body.insertAdjacentHTML("beforeEnd",
    `<div class=simplebox>`+
      `<div class=head>`+
        `<span class=title>${title}</span>`+
        `<span class=close>X<span>`+
      `</div>`+
      `<div class=body>${content}</div>`+
    `</div>`
  );

  // Get a reference to the simplebox div we just added. Since it was added before the end of body, it's the last div that is a direct child of body.
  let simplebox = document.querySelector("body>div:last-of-type")

  // Place the simplebox on the middle of the screen.
  simplebox.style.left=Math.floor(window.innerWidth/2-simplebox.offsetWidth/2)+"px";
  simplebox.style.top=Math.floor(window.innerHeight/2-simplebox.offsetHeight/2)+"px";

  /* The game's terminal input normally steals focus whenever the player starts typing.
  ** Since our simplebox might contain an input field, we don't want that. This event prevents the game from stealing focus. */
  simplebox.addEventListener('keydown',e=>e.stopPropagation());

  /* Adding a click and drag event for the head element.
  ** This works by recording initial coordinates of the simplebox and mouse when activating mousedown,
  ** Then tracking movement during a mousemouse event and moving the simplebox accordingly.
  ** Mouseup will clear the ongoing tracking. */
  simplebox.querySelector(".head").addEventListener("mousedown",e=>{
    let boxInitialX = simplebox.offsetLeft;
    let boxInitialY = simplebox.offsetTop;
    let mouseInitialX = e.clientX;
    let mouseInitialY = e.clientY;
    let mousemoveFunction=e=>{
      //For simplicity, no edge detection is done here - you can drag the box offscreen if you want. Math.max and Math.min can be used to prevent dragging off the edge.
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

  // Adding the closing function to the closing X
  simplebox.querySelector(".close").addEventListener("click",()=>simplebox.remove())

  // Return a reference to the created simplebox.
  return simplebox;
};
