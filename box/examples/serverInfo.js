import {doc, createBox} from "/box/box.js";
export let main=async ns=>{
    for (var sv=["home"],i=0;i<sv.length;i++)sv.push(...ns.scan(sv[i]).filter(n=>!sv.includes(n)));
	sv.sort((a,b)=>ns.getServerMaxMoney(b)-ns.getServerMaxMoney(a));
    let target = ns.args[0]||"home";
    let box=createBox("Server Info",`<div class=g2><span>Server:</span><select>${sv.map(s=>`<option value="${s}">${s}</option>`).join("")}</select><span>Security:</span><span class=sec></span><span>Money:</span><span class=mon></span></div>`);	
    let select=box.querySelector("select");

	if (sv.includes(target)) box.querySelector(`option[value="${target}"]`).selected=true;
 
    while (doc.body.contains(box)){
        target = select.value;
        box.querySelector(".sec").innerText = ns.getServerSecurityLevel(target).toFixed(1) + " / min " + ns.getServerMinSecurityLevel(target).toFixed(1);
        box.querySelector(".mon").innerText = ns.nFormat(ns.getServerMoneyAvailable(target),"$0.00a") + " / " + ns.nFormat(ns.getServerMaxMoney(target),"$0.00a");
        await ns.asleep(100);
    }
};
