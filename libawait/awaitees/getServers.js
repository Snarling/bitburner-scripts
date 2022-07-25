//When given a list of hostnames as args and ran from an awaiter, returns an array mapping the hostnames to ns.getServer objects.
import {enableAwaitee} from "/lib/await.js"

//Written as a super-condensed main function just as an example.
export let main=(ns)=>enableAwaitee(ns).returnVal=ns.args.map(ns.getServer);
