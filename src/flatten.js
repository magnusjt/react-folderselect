export default function flatten(inputNodes, parent = 0, index = 1){
    let nodes = {};
    inputNodes.forEach((node) => {
        let flatNode = {
            id: index++,
            parent: parent,
            text: node.text || 'Name',
            expandable: node.expandable === undefined ? false : node.expandable,
            selectable: node.selectable === undefined ? true : node.selectable,
            selected: node.selected === undefined ? false : node.selected,
            payload: node.payload || {}
        };

        if(flatNode.expandable === true){
            flatNode.selectable = false;
            flatNode.selected = false;
        }

        if(node.icon){
            flatNode.icon = node.icon;
        }else{
            flatNode.icon = 'fa fa-file-o fa-fw';
            if(flatNode.expandable){
                flatNode.icon = 'fa fa-folder-o fa-fw';
            }
        }

        nodes[flatNode.id] = flatNode;

        if(node.children && node.children.length > 0){
            let result = flatten(node.children, flatNode.id, index);
            index = result.index;
            Object.assign(nodes, result.nodes);
        }
    });

    return {nodes, index};
}