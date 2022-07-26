import {getID} from "/aexec/aexec.js";
export let main=async ns=>{
  getID(ns); //We don't need to save a reference to it if we're not returning a value
  await ns.sleep(ns.args[0]);
};
