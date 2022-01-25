import {createBox, doc} from "/box/box.js"
let f=["CSEC","avmnite-02h","I.I.I.I","run4theh111z","w0r1d_d43m0n"];
export let main=ns=>{
	let css=`<style id="boxScanCSS">.box.scan .resizer{height:200px;min-width:115px}.box.scan .scroller{white-space:pre}.box.scan .s{cursor:pointer;text-decoration:underline;color:var(--sec)}.box.scan .f{color:var(--errdk)}.box.scan .r{color:var(--pri)}.box.scan .r.f{color:--var(infolt)}.box.scan .s::before{content:"◉";color:var(--errdk)}.box.scan .r::before{color:var(--successdk)}</style>`;
	doc.getElementById("boxScanCSS")||doc.head.insertAdjacentHTML('beforeend',css);
	let s=["home"],p=[""],r={home:"home"}, fName=x=>`<a class="s${f.includes(x)?" f":""}${ns.hasRootAccess(x)?" r":""}">${x}</a>`;
	let tcommand=x=>{
		let tIn=doc.getElementById("terminal-input");
		tIn.value=x;
		tIn[Object.keys(tIn)[1]].onChange({target:tIn});
		tIn[Object.keys(tIn)[1]].onKeyDown({keyCode:13,preventDefault:()=>0});
	};
	let addSc=(x=s[0],p1=["\n"],o=p1.join("")+fName(x))=>{
		for (let i=0;i<s.length;i++){
			if (p[i]!=x) continue;
			let p2=p1.slice();
			p2[p2.length-1]=p2[p2.push(p.slice(i+1).includes(p[i])?"├>":"└>")-2].replace("├>","│ ").replace("└>","  ");
			o+=addSc(s[i],p2);
		}
		return o;
	};
	for (let i=0,j;i<s.length;i++)for(j of ns.scan(s[i]))if(!s.includes(j))s.push(j),p.push(s[i]),r[j]=r[s[i]]+";connect "+j;
	let box=createBox("Scan",`<div class=resizer><div class=scroller>${addSc().trimStart()}</div></div>`,"scan");
    box.querySelectorAll(".s").forEach(q=>q.addEventListener('click',()=>tcommand(r[q.childNodes[0].nodeValue])));
};
