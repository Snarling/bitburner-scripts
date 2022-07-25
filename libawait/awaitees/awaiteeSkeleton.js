import {getAwaitee} from "/lib/await.js"
export let main=async ns=>{
  let awaitee=getAwaitee(ns);
  
  //normal script code goes here

  awaitee.returnVal="";//Whatever you want to return
}
