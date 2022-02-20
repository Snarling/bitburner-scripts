<img src=https://user-images.githubusercontent.com/84951833/154841925-67775777-bd77-4267-9428-e78ab4894552.png align=right width=250px>

# box (with sidebar)
Adds a fixed sidebar on the right hand side of the screen, and allows custom content to be added to sidebar items or draggable boxes (which can be freely changed from one to the other). A version is available without the sidebar as well, but example scripts here are written for the sidebar version.
## box.js
This is the main file, and the only 100% required file. It provides the functions for creating sidebar items or boxes, various types of prompt, as well as some other minor functions. Below are the exported functions and their usage.
### createBox(title,content,icon="\uea74",...classes)
Creates a box with the provided title, content, titlebar icon, and and additional classes.

Parameter details:
* `title`: A String containing the text (or HTML) to be displayed in the title bar.
* `content`: A String containing the HTML content of the box.
* `icon`: A String containing the codicon font symbol to use in the titlebar. Defaults to an info icon. Can be provided using the unicode character directly, by using a unicode escaped character `\u????`, or html entity `$#x????`. [icons.js](#iconsjs) allows previewing of all icons with provided codes, and also provides an exported list of named icons.
* `...classes`: String arguments representing any additional classes which should be added to the box.
#### createBox return value
A [box `Element`](#box-element)
#### createBox example usage
<img src=https://user-images.githubusercontent.com/84951833/154297398-48c35868-73aa-4dc1-b374-92430f32aded.png align=right>

```
import {createBox} from "/box/box.js"
export async function main (ns){
  createBox("World Greeter","<span style=color:red>Hello world</span>");
}
```
### createSidebarItem(title,content,icon="\uea74",...classes)
Creates a sidebar item using provided parameters, which are the same as createBox above.
#### createSidebarItem return value
A [box `Element`](#box-element)
#### createSidebarItem example usage
<img src=https://user-images.githubusercontent.com/84951833/154300139-8b593ae0-24b8-4476-a87c-e4038e54051e.png width=200px align=right>

```
import {createSidebarItem} from "/box/box.js"
export async function main (ns){
  createSidebarItem("World Greeter","<span style=color:red>Hello world</span>");
}
```
### confirm(text)
Creates a Yes/No confirmation box with the provided prompt text. The provided text String can include html. The Yes button is initially focused, and keyboard Y/N can also be used to select the choices.
#### confirm example, with documentation
```
let choice = await confirm("This is a yes/no confirmation prompt, which returns a promise that resolves to true/false depending on your selection.<br /><br />Y and N can be used to select an option.")
```
![image](https://user-images.githubusercontent.com/84951833/154311125-da0358b8-051b-46a5-9f5a-a3e279369678.png)
### prompt(text)
Creates a text input prompt with the provided prompt text. The prompt text String can include html. The input field is initially focused and keyboard Enter in the input field can be used to submit the prompt.
#### prompt example, with documentation
```
let input = await prompt("This is a text input prompt, which returns a promise that resolves to the string you type into the input field.<br /><br />In addition to the button, it can be submitted by pressing enter.")
```
![image](https://user-images.githubusercontent.com/84951833/154312727-73b4ce49-dce4-4e31-9601-bd6e214ad095.png)
### select(text, options)
Creates a selection prompt with the provided prompt text, which allows the player to pick from the provided Array of options. The select Element begins with focus; the player would need to tab over to the submit button to submit the prompt using the keyboard.
#### select example, with documentation
```
let choice = await select("This is a selection prompt, which returns a promise that resolves to the selected option.",["Option 1","Option 2","Option 3","Option 4"])
```
![image](https://user-images.githubusercontent.com/84951833/154313532-f808e570-5f48-436c-abc9-d126076389c4.png)
### alert(text)
Creates an alert with the provided alert text. The provided text String can include html. The Ok button begins with focus.
#### alert example, with documentation
```
let choice = await confirm("This is a yes/no confirmation prompt, which returns a promise that resolves to true/false depending on your selection.<br /><br />Y and N can be used to select an option.")
```
![image](https://user-images.githubusercontent.com/84951833/154314025-4c598f19-f57d-40ce-af1b-4df408ef3cda.png)
### Other Exports
#### win
A reference to window/globalThis.
#### doc
A reference to document.
#### sidebar
A reference to the main sidebar Element
#### elemFromHTML(html)
Returns an Element built from the provided html String. The provided html should be one top-level element and its contents. If multiple top level elements are included in html, only the first one will be returned.

<img src=https://user-images.githubusercontent.com/84951833/154309996-9a2541b6-f658-4d0b-be74-0c16de273918.png align=right>

#### ts()
Returns an html String timestamp in \[HH:MM:SS\] format, with infolight colored internal contents.
#### slp(ms)
A replacement for `ns.sleep` or `ns.asleep`, for use in functions where ns is out of scope.
## box Element
The box Element is an Element with additional members added, listed below.
### box.head
A reference to the `Element` containing the head/titlebar of the box Element.
### box.body
A reference to the `Element` containing the body/content of the box Element.
### box.logDiv
A reference to the `Element` that box.log will use. Does not have to be set, but can be set to any element (even one that is not inside of the box).
### box.log(html, timestamp=true)
Adds a log entry to box.logDiv, with a timestamp (unless disabled). If box.logDiv is not defined, it is set to the first `.log` Element inside of box.body and if none is found then a new resizable log will be added and used.

Parameter details:
* `html`: A String containing the HTML content of the log entry to be added.
* `timestamp`: A boolean representing whether to include a timestamp on the log entry. Defaults to true.
### box.toSide()
Converts the box Element into a sidebar item.
### box.toBox()
Converts the box Element into a draggable box.
### box.contextItems
An Object containing entries for context menu options, as well as conditional functions to determine whether to display each context option.

The following context options are provided by default:
* `"Remove Item"`: Removes the box Element.
* `"Cancel"`: Closing out of the context menu without doing anything. Can also be accomplished by clicking anywhere else on the screen.
* `"Move to Top"`: Moves the box Element to the top of the sidebar. Only shown for sidebar items.
* `"Move to Bottom"`: Moves the box Element to the bottom of the sidebar. Only shown for sidebar items.
* `"-> sidebar"`: Turns the box Element into a sidebar item. Only shown for draggable boxes.
* `"box <-"`: Turns the box Element into a draggable box. Only shown for sidebar items.

To delete a context item, for instance to disable a sidebarItem from being able to turn into a draggable box, use one of the following options:
```
box.contextItems["box <-"].cFn=()=>0 //Replace the context item's existing condition function with one that will always return false
delete box.contextItems["box <-"]; //Deletes the entire reference to the context item
```
### box.addContextItem(name, fn, cFn=()=>1)
Adds an option to box.contextItems, with a given function and conditional function. If not provided, the conditional defaults to always show the option.
