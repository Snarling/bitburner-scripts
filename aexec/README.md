/aexec/aexec.js is the main file. It exports functions for getting an execWrapper or getting an id for a child script. Other files are just example usage.

`wrapExec(ns)` returns a function (I call it aexec) that has the same usage as ns.exec, except that it returns a promise, and that promise can resolve to a value specified by the child script. The child script must use getID.

`getID(ns)` is needed at the beginning of main for any script ran via aexec. This returns an `id`, and `id.returnVal` is what aexec's promise will resolve to when the script is finished running. ns.atExit is used to make aexec's promise resolve once the child script is finished running. If a new ns.atExit function is specified, you will need to manually include `id.resolve()` as part of the atExit callback.

Since aexec doesn't use any async ns functions, you can have multiple instances running at the same time if desired.
