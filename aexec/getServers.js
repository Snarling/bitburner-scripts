//Take list of server names as args, return array of associated server objects
import {getID} from "/aexec/aexec.js";
export let main=ns=>{
  let id=getID(ns);
  id.returnVal=id.args.map(ns.getServer);
}
