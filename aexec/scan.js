import {getID} from "/aexec/aexec.js";
export let main=ns=>{
  //getID doesn't need to be called right at the beginning, but it must be called before the end of the script and ns.args will have an extra entry until it is ran.
  let s=new Set(".");s.forEach(k=>ns.scan(k).map(s.add,s)),getID(ns).returnVal=[...s];
};
