import {getExecWrapper} from "/lib/await.js";
export async function main(ns){
  let aExec=getExecWrapper(ns);//an awaitable exec that can be given a return value.
  
  let time=performance.now();
  
  //Since aExec returns a promise that resolves to a usable return value, it can be then-chained if you want.
  let servers=await aExec("/awaitees/sleep3000.js")
    .then(()=>aExec("/awaitees/scan.js")
    .then(hosts=>aExec("/awaitees/getServers.js","home",1,...hosts)));
  
  time=performance.now()-time;
  ns.tprint(`Script chain took ${time}ms to complete (includes a 3000ms sleep)`);
  console.log(servers);
}
