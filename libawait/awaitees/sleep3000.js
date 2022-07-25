import {getAwaitee} from "/lib/await.js"
export let main=async ns=>{
  getAwaitee(ns); //We don't need to save a reference to it if we're not returning a value
  await ns.sleep(3000);
};
