let doc=eval("document"),
	f=["CSEC","avmnite-02h","I.I.I.I","run4theh111z","w0r1d_d43m0n"],
	tprint=html=>doc.querySelector("ul>li:last-child>p").insertAdjacentHTML('beforeEnd',html);
export let main=ns=>{
	let theme=ns.ui.getTheme();
	let css=`<style id="scanCSS">.sc{white-space:pre;color:${theme.secondary};line-height:1.2}.sc .s{cursor:pointer;text-decoration:underline;color:${theme.secondary}}.sc .f{color:${theme.errordark}}.sc .r{color:${theme.primary}}.sc .r.f{color:${theme.infolight}}.sc .s::before{content:"◉";color:${theme.errordark}}.sc .r::before{color:${theme.successdark}}</style>`;
	doc.getElementById("scanCSS")&&doc.getElementById("scanCSS")["remove"]();
	doc.head.insertAdjacentHTML('beforeend',css);
	let s=["home"],p=[""],r={home:"home"},
		fName=x=>`<a class="s${f.includes(x)?" f":""}${ns.hasRootAccess(x)?" r":""}">${x}</a>`;
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
	let output=addSc().trimStart();
	setTimeout(()=>{
		tprint(`<div class="sc new">${output}</div>`);
	    doc.querySelectorAll(".sc.new .s").forEach(q=>q.addEventListener('click',tcommand.bind(null,r[q.childNodes[0].nodeValue])));
		doc.querySelector(".sc.new").classList["remove"]("new");
	},50);
};
