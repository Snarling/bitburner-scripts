import {wrapExec} from "/aexec/aexec.js";
export async function main(ns){
  let aExec=wrapExec(ns);
  
  let time=performance.now();
  
  //awaiting a script without a return value
  await aExec("/aexec/sleep.js","home",1,3000);
  
  //normal way to use a script's return value
  let number3 = await aExec("/aexec/sendItBack.js","home",1,3);
  
  //return value can also be used for a then-chain.
  let servers=await aExec("/aexec/scan.js")
    .then(hosts=>aExec("/aexec/getServers.js","home",1,...hosts));
  
  time=performance.now()-time;
  
  ns.tprint(`Script chain of 4 scripts took ${time}ms to complete (includes a 3000ms sleep)`);
  ns.tprint(`${number3}.`);
  ns.tail();
  ns.print(servers);
  await aExec("fileThatDoesntExist.js","home",1,3000);
}
