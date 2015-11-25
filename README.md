# react-folderselect

### What

![alt tag](https://raw.github.com/magnusjt/react-folderselect/master/examples/basic/ex1.png)

Folderselect is a react component for displaying a tree structure similar
to a file browser. Items from the tree structure can be selected by the user
by clicking on them. Folderselect also supports:

* Searching
* Selecting all items in a folder
* Deselecting all items in a folder

It's very similar to my other plugin for jQuery: https://github.com/magnusjt/folderselect

### Install
````
npm install https://github.com/magnusjt/react-folderselect
````

### Import
JS:
````
import {FolderSelect, flatten} from 'react-folderselect'
````

CSS:
````
<link rel="stylesheet" href="path/to/react-folderselect/lib/folderselect.css">
````

### FolderSelect props
* root
  - The id of the root parent in the tree.
  - Default: 0
* nodes
  - An object, where the keys (ids) points to a node. See how to create nodes below.
  - Default: {}
* onChangeSelected
  - Callback called when selected nodes are changed. Accepts a list of selected nodes.
    Use this list when you need to submit a form. Alternatively, you can create a hidden select box from it.
  - Default: (nodes) => {}
* load
  - Callback called when user enters empty folder. Accepts the folder node.
    Use the returned node object to make an ajax call or similar.
  - Default: (node) => {}
* isLoading
  - Tell the FolderSelect component that you are currently loading some more nodes.
    A spinner will show up in empty directories in case this is set to true.
  - Default: false)
* displaySelected
  - Display the selected nodes
  - Default: true
* spinnerIconClass
  - Classname to use for the spinner icon
  - Default: "fa fa-spinner fa-spin fa-fw"
* homeIconClass
  - Classname to use for the home icon
  - Default: "fa fa-home fa-fw"
* backNodeIconClass
  - Classname to use for the back icon
  - Default: "fa fa-folder-o fa-fw"
* searchIconClass
  - Classname to use for the search icon
  - Default: "fa fa-search fa-fw"

### Node
A "node" is either an item to be selected, or a folder to be opened.
FolderSelect uses an object as an adjacency list for the nodes.

In the following example, the "root" has an id of "node0":

{
    "node1": {
        "id": "node1",
        "parent": "node0"
    },
    "node2": {
        "id": "node2",
        "parent": "node1"
    }
}

#### Node props
A node can have the following props:

* id
  - The id of the node. Other nodes may use this node as a parent by setting their parent property to this id.
  - Examples: 1, 2, "node0", "node1"
* parent
  - The id of the parent node (i.e. the folder containing this node)
  - Examples: 0, "node0"
* text
  - The name that should be displayed for this node
  - Default: "Name"
* icon
  - The icon to display for this node. Should be either an item or a folder icon.
  - Examples: "fa fa-file-o fa-fw", "fa fa-folder-o fa-fw"
  - Default: "fa fa-file-o fa-fw"
* selectable
  - If the node is an item, this should be set to true (and expandable to false)
* expandable
  - If the node is a folder, this should be set to true (and selectable to false)
* selected
  - If the node should be selected by default, set this to true.
    This does not work with nodes that are lazy loaded.

### Flatten
If you data is in a hierarchy, and not an adjacency list, you can use
the included function "flatten" to convert your tree to an adjacency list.

`let nodes = flatten(tree, rootId=0, startId=1)`

The `tree` should be an array of nodes. The nodes should be
defined the same way as usual, but for folder nodes, there should be
a prop "children", which should contain the list of nodes inside the folder.
