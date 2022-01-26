# bitburner-scripts
Various ingame scripts for the game Bitburner, which is available for free on steam or at https://danielyxie.github.io/bitburner/

#### Sections:
- [box](#box)
- [deepestScan.js](#deepestscanjs)
- [unlock.js](#unlockjs)

### [box](box)
<img src=https://user-images.githubusercontent.com/84951833/150685207-26819230-348d-40ce-aeb6-3d987b8a94d2.png width=250px align=left>Lightweight JS+HTML+CSS draggable custom content boxes. 

The [box folder](box) contains separate documentation.<br clear=both> 
### [deepestScan.js](deepestScan.js)
<img src=https://user-images.githubusercontent.com/84951833/150685593-772866e3-8386-4f0e-a5bb-5a78ebf36a76.png height=300px align=left>Ram cost: 1.85GB - File size: 1.75KB
 
Self-contained script that prints out a full map of the network server hierarchy to the terminal, with color coding and click-to-connect functionality. Note that React does not preserve the additional printed content when navigating away from the terminal and back, so in this case the script needs to be re-ran to access the links again.

There is an [alert version](deepestScan-alert.js) that prints the tree in an ns.alert box. There is also a [box version](box/examples/deepestScan-box.js) that persists with screen changes and would only need to be re-ran after installing augmentations.<br clear=both>
### [unlock.js](unlock.js)
Ram cost: 2.1GB - File size: 171B

An extremely minified script to unlock all servers. Will open any ports you can open, and root any servers that have enough ports open for root access.
