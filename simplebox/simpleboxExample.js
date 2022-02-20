import {createSimplebox} from "/simplebox/simplebox.js";
/** @param {NS} ns **/
export async function main(ns) {
    createSimplebox("Test Box", "Hello world<span style=color:red>!</span>");
}
