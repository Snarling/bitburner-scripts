/lib/await.js is the file required for the main functionality.

exampleAwaiter shows an example script that uses an exec wrapper to await other scripts' completion and use their return value.
the examples in the awaitees folder show examples of scripts written to be ran by this exec wrapper and return a value.

When using ns.run, ns.exec, or manually running an awaitee-script, keep in mind the first argument sent is consumed as part of the awaitee-setup.
