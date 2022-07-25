//when ran via an awaiter, returns a scan of all servers.
import {enableAwaitee} from "/lib/await.js"
export let main=(ns)=>{
  let awaitee=enableAwaitee(ns);
  
  let s=new Set(".");s.forEach(k=>ns.scan(k).map(s.add,s)),awaitee.returnVal=[...s];
};
