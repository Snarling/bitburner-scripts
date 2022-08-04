import {wrapExec} from "aexec/aexec.js";
export let main=async ns=>{
  let aexec=wrapExec(ns);
  
  let allServerNames = await aexec("/aexec/scan.js");
  let allServerObjects = await aexec("/aexec/getServer.js","home",1,allServerNames); //Array can be sent directly as an argument.
  
  ns.tprint(allServerObjects[0]);
};
