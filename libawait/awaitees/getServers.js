//When given a list of hostnames as args and ran from an awaiter, returns an array mapping the hostnames to ns.getServer objects.
import {getAwaitee} from "/lib/await.js"

//Written as a super-condensed main function just as an example. scan.js uses a more normal structure.
export let main=ns=>getAwaitee(ns).returnVal=ns.args.map(ns.getServer);
