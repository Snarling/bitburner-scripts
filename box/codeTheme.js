// Written for using JetBrains Mono as the font face with editor font size: 14.
// Other fonts or sizes will require a different transform:scaleX.
// Probably looks bad with most themes, this was tuned with box default theme.

import {elemFromHTML, sidebar} from "box/box";
let css=`.monaco-editor, .monaco-editor-background, .monaco-editor .margin{background:var(--bgpri)}
.monaco-editor .view-overlays .current-line{background:var(--bgsec)}
.monaco-editor .view-lines{
  font-family:var(--ff) !important;
  font-feature-settings:initial !important;
  transform-origin:top left;
  transform:scaleX(calc(11 / 12));
}
.monaco-editor .margin-view-overlays{font-family:var(--ff) !important}
.mtk1{color:var(--pri)}
.mtk10{color:var(--info)}
.mtk14{color:var(--hp)}
.mtk12{color:var(--cha)}
.mtk18{color:var(--success)}
.mtk19{color:var(--warn)}
.mtk25{color:var(--sec)}
.mtk29{color:var(--combat)}
.monaco-editor canvas{filter:contrast(1.4)}
.line-numbers{color:var(--sec) !important}
.active-line-number{color:var(--pri) !important}`
export let main=ns=>{
    let codeTheme = sidebar.querySelector("#codetheme") || sidebar.appendChild(elemFromHTML("<style id=codetheme></style>"));
    codeTheme.innerText = css;
}
