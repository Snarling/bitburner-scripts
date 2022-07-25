import {enableAwaiter} from "/lib/await.js";
export async function main(ns){
  let aExec=enableAwaiter(ns);//an awaitable exec that can be given a return value.
  
  let time=performance.now();
  
  //Since aExec returns a promise that resolves to a usable return value, it can be then-chained if you want.
  let servers=await aExec("/awaitees/scan.js").then(hosts=>aExec("/awaitees/getServers.js","home",1,...hosts));
  
  time=performance.now()-time;
  ns.tprint(`Chained 2 scripts in sequence in ${time}ms`);
  console.log(servers);
}
