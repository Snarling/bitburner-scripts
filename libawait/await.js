globalThis.awaitees??={};
export function enableAwaiter(ns){
  return (script, host="home", threads=1, ...args)=>new Promise(r=>{
    debugger;
    let id=Math.random();
    awaitees[id]={resolve:()=>{
      r(awaitees[id].returnVal)
      delete awaitees[id];
    }};
    ns.exec(script, host, threads, id, ...args);
  });
}
export let enableAwaitee=ns=>{
  let awaitee=awaitees[ns.args.shift()];
  ns.atExit(awaitee.resolve);
  return awaitee;
}