import {getID} from "/aexec/aexec.js";
export let main=ns=>{
  getID(ns).returnVal=ns.args[0];
};
