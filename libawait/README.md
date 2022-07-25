/lib/await.js is the main file. It exports functions for getting an execWrapper or an awaitee. All other files are just example usage.

An execWrapper launches scripts similarly to `ns.exec`, but allows for the script being ran to return a value and signal when the script is finished by resolving a promise.

An execWrapper should only be used to run awaitee scripts, otherwise the resulting promise will never be resolved.

An execWrapper creates an additional argument as a first argument when running a script, and an awaitee consumes the first argument sent on initialization.

When an awaitee script is finished running, awaitee.returnValue is what the execWrapper's promise resolves to.
