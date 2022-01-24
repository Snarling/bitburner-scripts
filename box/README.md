# box

Lightweight JS+HTML+CSS draggable custom content boxes.

#### Sections:
- [/box/box.js](#boxboxjs) (Required)
- [/box/css.js](#boxcssjs) (Required)
- [cssEdit.js](#csseditjs) (Recommended)
- [Other Example Files](#otherexamplefiles)
  - [promptExamples.js](#promptexamplesjs) 
## [/box/box.js](box.js)
The main file which provides functionality for creating new boxes to hold your custom content. It also provides functions for creating various prompts and alerts using premade templates.
### Cost
No import cost. File size is 4.3KB.
### Exported Functions
#### `createBox(title, mainContent, ...extraClasses)`
#### `confirm(text)`
#### `prompt(text)`
#### `select(text, options)`
#### `alert(text)`
### Additional member functions of box elements
#### `box.addLogDiv(width)`
#### `box.log(text, timestamp, element=box.querySelector(".log))`
#### `box.stripTitleButtons()`
## [/box/css.js](css.js)
A .js file containing a single export which is the css content. Imported by /box/box.js and can be edited easily using cssEdit.js.
### Cost
No import cost. File size is 2.49KB.
### Provided Classes
#### Reserved Classes
Reserved classes include
- .box
- .box .title
- .box .close
- .box .toggle

These are used for the main layout of the box and use of these class names inside of mainContent or when adding content with [box.log](#boxlogtext-timestamp-elementboxqueryselectorlog) should be avoided.
#### .prompt
#### .resizer
#### .scroller
#### .g2

## [cssEdit.js](cssEdit.js)
A script which creates a box with controls that allow editing and testing of CSS styles and ingame theme.
### Cost
1.6GB RAM cost. File size is 1.91KB.
