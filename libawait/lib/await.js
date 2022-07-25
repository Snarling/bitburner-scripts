globalThis.awaitees??={};
export function getExecWrapper(ns){
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
export let getAwaitee=ns=>{
  let awaitee=awaitees[ns.args.shift()]??{resolve:()=>0};
  ns.atExit(awaitee.resolve);
  return awaitee;
}
