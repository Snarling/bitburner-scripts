# box
Lightweight JS+HTML+CSS draggable custom content boxes.
<img src=https://user-images.githubusercontent.com/84951833/151187254-6cbe58b2-7917-4d42-a9d5-49d57e9389fc.png width=420px align=right>
#### Sections:
- [/box/box.js](#boxboxjs) (Required)
- [/box/css.js](#boxcssjs) (Required)
- [cssEdit.js](#csseditjs) (Recommended)
- [Other Example Files](#otherexamplefiles)
  - [promptExamples.js](#promptexamplesjs) 
  - [deepestScan-box.js](#deepestscan-boxjs)
  - [serverInfo.js](#serverinfojs)
## [/box/box.js](box.js)
The main file which provides functionality for creating new boxes to hold your custom content. It also provides functions for creating various prompts and alerts using premade templates.
### Cost
No import cost. File size is 4.25KB.
### Exported Functions
### `createBox(title, mainContent, ...extraClasses)`
The core of box's functionality, this creates a draggable box with the provided title and filled with whatever mainContent is provided.
#### Parameters
- `title`: A string containing the titlebar text content.
- `mainContent`: A string containing the main html or text content which is included in the body of the created box.
- `extraClasses`: Any additional arguments will be treated as extra classes to add to the main box container. The included class ["prompt"](#prompt) will darken the rest of the screen to grab the user's attention. The included class "min" will spawn the box in minimized mode.
#### Return value
The box element, which is an [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) object with some [additional member functions](#additional-member-functions-of-box-elements).
#### Example
```js
createBox("World Greeter","Hello World");
```
![image](https://user-images.githubusercontent.com/84951833/151187701-f922e79e-2429-400b-93ee-bf0b6c1108a4.png)

Resulting HTML:
```html
<div class="box" style="z-index: 9001; left: 853px; top: 478px;">
  <div class="title">
    <span>World Greeter</span>
    <a class="toggle"></a>
    <a class="close"></a>
  </div>
  Hello, world!
</div>
```
Note: The symbol used for "close" is the chrome-close glyph from the codicon font.
### `confirm(text)`
Creates a yes/no confirmation prompt which can be answered using the buttons or by using keyboard y/n. The rest of the screen is dimmed to grab the player's attention until answered.
#### Parameters
- `text`: A string containing the html or text content of the prompt question.
#### Return value
A Promise which resolves to `true` or `false` depending on user selection when the prompt is answered.
#### Example
```js
let answer = await confirm("Is this documentation helpful?");
console.log(answer) //true or false depending on answer
```
![image](https://user-images.githubusercontent.com/84951833/150747210-80014cb2-adbb-4af5-91eb-0c7bfd5f4a5b.png)

Resulting HTML:
```html
<div class="box prompt" style="z-index: 9001; left: 469px; top: 459px;">
  <div class="title">
    <span>Confirmation Prompt</span>
  </div>
  <center>Is this documentation helpful?</center>
  <div class="g2">
    <button><u>Y</u>es</button>
    <button><u>N</u>o</button>
  </div>
</div>
```
### `prompt(text)`
Creates an input prompt which can be submitted with the enter button or the submit button. The rest of the screen is dimmed to grab the player's attention until answered.
#### Parameters
- `text`: A string containing the html or text content of the prompt question.
#### Return value
A Promise which resolves to the string entered into the input field when the prompt is submitted.
#### Example
```js
let name = await prompt("What is your name?");
console.log(name); //The name entered
```
![image](https://user-images.githubusercontent.com/84951833/150748325-2dc40501-926c-47d4-94f7-07b609c5c4d1.png)

Resulting HTML:
```html
<div class="box prompt" style="z-index: 9001; left: 759px; top: 459px;">
  <div class="title">
    <span>Input Prompt</span>
  </div>
  <center>What is your name?</center>
  <div class="g2">
    <input>
    <button>Submit</button>
  </div>
</div>
```
### `select(text, options)`
Creates a selection prompt which allows the player to select from specific options. The rest of the screen is dimmed to grab the player's attention until answered.
#### Parameters
- `text`: A string containing the html or text content of the prompt question.
- `options`: An array of strings containing the options the player can select from.
#### Return value
A Promise which resolves to the selected option string when the prompt is submitted.
#### Example
```js
let color = await select("Which color is your favorite?",["Cyan","Magenta","Yellow","Black"]);
console.log(color); //The color selected
```
![image](https://user-images.githubusercontent.com/84951833/150749931-20344c22-984a-42e0-8c7a-5d2cbf5a01cc.png)

Resulting HTML:
```html
<div class="box prompt" style="z-index: 9001; left: 759px; top: 459px;">
  <div class="title">
    <span>Selection Prompt</span>
  </div>
  <center>Which color is your favorite?</center>
  <div class="g2">
    <select>
      <option value="Cyan">Cyan</option>
      <option value="Magenta">Magenta</option>
      <option value="Yellow">Yellow</option>
      <option value="Black">Black</option>
    </select>
    <button>Submit</button>
  </div>
</div>
```
### `alert(text)`
Creates an alert box containing the specified text. The rest of the screen is dimmed to grab the player's attention until acknowledged.
#### Parameters
- `text`: A string containing the html or text content of the alert text.
#### Return value
A Promise that resolves to null when the player acknowledges the alert.
#### Example
```js
await alert("You are running out of money.");
```
![image](https://user-images.githubusercontent.com/84951833/150750883-22221497-e5ca-488e-b2b4-c188335b3d0a.png)

Resulting HTML (Likely to be reworked):
```html
<div class="box prompt" style="z-index: 9001; left: 469px; top: 454px;">
  <div class="title">
    <span>Alert Message</span>
  </div>
  <center>
    You are running out of money.
    <br>
    <br>
    <button>Ok</button>
  </center>
</div>
```

## Additional member functions of box elements
Documentation is still WIP for this section and below.

The Element returned by `createBox` has some additional member functions added to it.
### `box.addLogDiv(width)`
Adds a resizable log with a specified minimum width (to prevent resizing smaller than intended).
### `box.log(html, ts=true, elem=box.querySelector(".log))`
Adds the specified html log entry to the specified element (default is the first .log in the box). Prepended by a timestamp by default.
### `box.stripTitleButtons()`
Removes the toggle and close buttons from the title bar. Ensure you provide another way to remove the box from the document.
## [/box/css.js](css.js)
A .js file containing a single export which is the css content. Imported by /box/box.js and can be edited easily using cssEdit.js.
### Cost
No import cost. File size is 2.7KB.
### Reserved Classes
The following classes are used for the main layout of the box. Their use elsewhere inside of the box should be avoided.
- .box
  - The box element
- .box .title
  - The titlebar
- .box .close
  - The close button on the titlebar 
- .box .toggle
  - The toggle button on the titlebar  

### Other classes
### `.box.prompt`
Creates a large transparent black border around the box, to darken the rest of the screen for attention-grabbing.
### `.resizer`
### `.scroller`
### `.g2`

## [cssEdit.js](cssEdit.js)
<img src=https://user-images.githubusercontent.com/84951833/150908757-568a624b-a51a-4257-abf9-d88fb192963a.png align=right />

A script which creates a box with controls that allow editing and testing of CSS styles and ingame theme.
### Cost
1.6GB RAM cost. File size is 1.91KB.
### Functionality
### `Load from File`
This button uses `ns.read` to load the content of /box/css.js and places it into the textarea.
### `Load from Page`
This button gets the content of the #boxCSS style element on the page and places it into the textarea.
### `Save to File`
This button uses `ns.write` to save the content of the textarea to /box/css.js
### `Save to Page`
This button saves the content of the textarea to the #boxCSS style element, allowing you to preview css changes without committing them to the save file.
### `Load Theme from Game`
This button uses `ns.ui` functions to get the current color theme and font, and replaces the content of the body{} portion of the css with css variables for these things.
### `Save Theme to Game`
This button takes the colors specified in the body tag of the textarea's css, and uses ns.ui.setTheme to edit the ingame theme to match the colors specified in the css.
### `Minify`
Minifies the css in the textarea using regex.
### `Beautify`
Beautifies the css in the textarea using regex.
