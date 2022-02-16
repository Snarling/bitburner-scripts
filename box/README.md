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
A [box `Element`](#boxelement)
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
A [box `Element`](#boxelement)
#### createSidebarItem example usage
<img src=https://user-images.githubusercontent.com/84951833/154300139-8b593ae0-24b8-4476-a87c-e4038e54051e.png width=200px align=right>

```
import {createSidebarItem} from "/box/box.js"
export async function main (ns){
  createSidebarItem("World Greeter","<span style=color:red>Hello world</span>");
}
```


## box Element
The following are added as members to a box Element.
### box.head
A reference to the `Element` containing the head/titlebar of the box Element.
### box.body
A reference to the `Element` containing the body/content of the box Element.
### box.logDiv
A reference to the `Element` that will be added to by box.log. Can be set to any element (even one that is not inside of the box).
### box.log(html, timestamp=true)
Adds a log entry to box.logDiv, with a timestamp (unless disabled). If box.logDiv is not defined, it is set to the first `.log` element inside of box.body and if none is found then a new resizable log will be added and used.

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
### box.addContextItem(name, fn, cFn=()=>1)
Adds an option to box.contextItems, with a given function and conditional function. If not provided, the conditional defaults to always show the option.
