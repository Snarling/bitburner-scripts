//Take array of server names as the first argument, return array of associated server objects
import {getID} from "/aexec/aexec.js";
export let main=ns=>{
  let id=getID(ns);
  id.returnVal=id.args[0].map(ns.getServer);
}
