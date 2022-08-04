import {getID} from "/aexec/aexec.js"
export let main=async ns=>{
  let id=getID(ns);
  
  /* in the main body, id.args needs to be used instead of ns.args. id.args can be any type.
  ** If arrays/objects are sent as args, keep in mind they are not copies of the arrays/objects sent. */
  
  id.returnVal=valueToBeReturned;
}
