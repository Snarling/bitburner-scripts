import {confirm, prompt, select, alert} from "/box/box.js";
/** @param {NS} ns **/
export async function main(ns) {
  ns.tprint(await confirm("This is a yes/no confirmation prompt, which returns a promise that resolves to true/false depending on your selection.<br /><br />Y and N can be used to select an option."));
  await ns.asleep(100);
  ns.tprint(await prompt("This is a text input prompt, which returns a promise that resolves to the string you type into the input field.<br /><br />In addition to the button, it can be submitted by pressing enter."))
  await ns.asleep(100);
  ns.tprint(await select("This is a selection prompt, which returns a promise that resolves to the selected option.",["Option 1","Option 2","Option 3","Option 4"]))
  await ns.asleep(100);
  ns.tprint(await select("This is an example of a selection prompt that has been configured to provide prompt text and a selection of options which contain text significantly longer than the normal use case, to demonstrate what the prompt looks like when it is overloaded with content.",["Normal option","An incredibly long option that no one in their right mind would ever put on a selection prompt"]))
  await ns.asleep(100);
  await alert("This prompt is an alert, which returns a promise that resolves to null.");
}
