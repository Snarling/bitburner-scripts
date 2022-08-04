globalThis.aexec??={ids:{}};
let ids=aexec.ids;
export function wrapExec(ns, safe=false){
  return (script, host="home", threads=1, ...args)=>new Promise(r=>{
    let i=Math.random(),id;
    while (ids[i]) i++; //guarantee unique - probably only needed if player is overwriting Math.random
    ids[i]=id={resolve:()=>{
      r(id.returnVal)
      delete ids[i];
    }};
    id.args=args;
    if (!ns.exec(script, host, threads, i)){
      delete ids[i];
      if (safe) return r("FAILED"); //For cases where silently failing is desired instead of erroring
      throw `aexec: Failed to execute script ${script} on ${host} with ${threads} threads.`
    }
  });
}
export let getID=ns=>{
  let id=ids[ns.args[0]]??{resolve:()=>0};
  ns.atExit(id.resolve)
  return id;
}
