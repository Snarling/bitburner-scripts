/lib/await.js is the file required for the main functionality.

exampleAwaiter shows an example script that awaits other scripts and uses their return value.
the examples in the awaitees folder show examples of scripts written to be ran by an awaiter.

The awaiter creates a new first argument for the executed script, and the awaitee consumes this first argument during setup. Keep this in mind if using `ns.run` or `ns.exec` for running an awaitee script (or manually runnning).
