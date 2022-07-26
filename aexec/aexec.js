globalThis.aexec??={ids:{}};
export let ids=aexec.ids;
export function wrapExec(ns){
  return (script, host="home", threads=1, ...args)=>new Promise(r=>{
    let id=Math.random();
    ids[id]={resolve:()=>{
      r(ids[id].returnVal)
      delete ids[id];
    }};
    ns.exec(script, host, threads, ...args, id);
  });
}
export let getID=ns=>{
  let id=ids[ns.args.pop()]??{resolve:()=>0};
  ns.atExit(id.resolve);
  return id;
}
