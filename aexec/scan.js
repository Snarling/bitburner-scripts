//Takes no args, returns list of all servers
import {getID} from "/aexec/aexec.js";
export let main=ns=>{
  let id=getID(ns);
  let s=new Set(".");s.forEach(k=>ns.scan(k).map(s.add,s));
  id.returnVal=[...s];
};
