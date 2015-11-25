import React from 'react';
import _ from 'lodash';
import flatten from './flatten';

export class FolderSelect extends React.Component{
    static propTypes = {
        root: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
        nodes: React.PropTypes.object,
        onChangeSelected: React.PropTypes.func,
        load: React.PropTypes.func,
        isLoading: React.PropTypes.bool,
        displaySelected: React.PropTypes.bool,
        spinnerIconClass: React.PropTypes.string,
        homeIconClass: React.PropTypes.string,
        backNodeIconClass: React.PropTypes.string
    };
    static defaultProps = {
        root: 0,
        nodes: {},
        onChangeSelected: (nodes) => {},
        load: (node) => {},
        isLoading: false,
        displaySelected: true,
        spinnerIconClass: 'fa fa-spinner fa-spin fa-fw',
        homeIconClass: 'fa fa-home fa-fw',
        backNodeIconClass: 'fa fa-folder-o fa-fw',
        searchIconClass: 'fa fa-search fa-fw'
    };
    constructor(props){
        super(props);
        this.onSelectItemNode = this.onSelectItemNode.bind(this);
        this.onDeselectItemNode = this.onDeselectItemNode.bind(this);
        this.onSelectFolderNode = this.onSelectFolderNode.bind(this);
        this.onDeselectFolderNode = this.onDeselectFolderNode.bind(this);
        this.onExpandFolder = this.onExpandFolder.bind(this);
        this.onChangeSearchText = this.onChangeSearchText.bind(this);

        this.state = {
            parent: props.root,
            searchText: '',
            selected: []
        };
    }
    componentWillMount(){
        /* When the component first mounts, preselect nodes */
        let selected = this.state.selected.slice();
        let ids = _.map(_.filter(this.props.nodes, {selected: true}), 'id');
        selected = _.uniq(_.union(selected, ids));
        let nSelected = selected.length;
        if(nSelected > 0){
            let lastSelected = selected[nSelected-1];
            let parent = this.props.nodes[lastSelected].parent;
            this.setState({parent});
            this.changeSelected(selected);
        }
    }
    filterNodesOnSearchText(nodes, searchText){
        if(searchText == ''){
            return nodes;
        }

        searchText = searchText.toLowerCase();

        return _.filter(nodes, (node) => {
            return _.includes(node.text.toLowerCase(), searchText);
        });
    }
    getFolderNodes(){
        let nodes = _.filter(this.props.nodes, {expandable: true, parent: this.state.parent});
        nodes = _.sortBy(nodes, 'text');
        return this.filterNodesOnSearchText(nodes, this.state.searchText);
    }
    getItemNodes(){
        let nodes = _.filter(this.props.nodes, {expandable: false, parent: this.state.parent});
        nodes = _.sortBy(nodes, 'text');

        // Don't include selected nodes:
        nodes = _.filter(nodes, (node) => {
            return this.state.selected.indexOf(node.id) == -1;
        });

        return this.filterNodesOnSearchText(nodes, this.state.searchText);
    }
    getSelectedNodes(){
        return this.state.selected.map((id) => this.props.nodes[id]);
    }
    getBreadcrumbNodes(){
        let id = this.state.parent;
        let crumbs = [];
        while(id != this.props.root){
            if(id === undefined){
                break;
            }

            crumbs.push(this.props.nodes[id]);
            id = this.props.nodes[id].parent;
        }

        return crumbs.reverse();
    }
    getBreadcrumbsForNode(id){
        let names = [];
        while(id != this.props.root){
            if(id === undefined){
                break;
            }

            names.push(this.props.nodes[id].text);
            id = this.props.nodes[id].parent;
        }

        return names.reverse();
    }
    getNodesGroupedByParent(nodes){
        let nodesByParent = _.reduce(nodes, (nodesByParent, node) => {
            if (!nodesByParent.hasOwnProperty(node.parent)){
                nodesByParent[node.parent] = [];
            }
            nodesByParent[node.parent].push(node);
            return nodesByParent;
        }, {});

        let nodesGrouped = _.map(nodesByParent, (nodes, parent) => {
            let breadcrumbs = this.getBreadcrumbsForNode(parent).join(' / ');
            if(breadcrumbs == ''){
                breadcrumbs = 'Root';
            }

            return {
                nodes: _.sortBy(nodes, 'text'),
                parent,
                breadcrumbs
            }
        });

        return _.sortBy(nodesGrouped, 'breadcrumbs');
    }
    onSelectItemNode(id){
        let selected = this.state.selected.slice();
        selected.push(id);
        selected = _.uniq(selected);
        this.changeSelected(selected);
    }
    onDeselectItemNode(id){
        let selected = this.state.selected.slice();
        let index = selected.indexOf(id);
        if(index != -1){
            selected.splice(index, 1);
            this.changeSelected(selected);
        }
    }
    onSelectFolderNode(parentId){
        let ids = _.filter(this.props.nodes, {selectable: true, parent: parentId}).map((node) => {
            return node.id;
        });

        let selected = _.uniq(_.union(this.state.selected.slice(), ids));
        this.changeSelected(selected);
    }
    onDeselectFolderNode(parentId){
        let selected = this.state.selected.slice().reduce((ids, id) => {
            if(this.props.nodes[id].parent != parentId){
                ids.push(id);
            }
            return ids;
        }, []);

        this.changeSelected(selected);
    }
    onExpandFolder(parent){
        if(parent == this.state.parent){
            // Already in this folder, so select all instead of expanding
            this.onSelectFolderNode(parent);
        }else{
            if(_.filter(this.props.nodes, {parent}).length == 0){
                // If folder is empty, attempt to lazy load
                this.props.load(this.props.nodes[parent]);
                this.setState({parent});
            }else{
                this.setState({parent});
            }
        }
    }
    onChangeSearchText(e){
        this.setState({
            searchText: e.target.value
        });
    }
    changeSelected(selected){
        this.setState({selected});

        let nodes = selected.map((id) => this.props.nodes[id]);
        nodes = _.sortBy(nodes, 'text');

        this.props.onChangeSelected(nodes);
    }
    render(){
        let {
            root,
            isLoading,
            spinnerIconClass,
            backNodeIconClass,
            homeIconClass,
            searchIconClass,
            displaySelected
        } = this.props;

        let nodes = [...this.getFolderNodes(), ...this.getItemNodes()];
        let selectedNodes = this.getSelectedNodes();
        let selectedNodesGrouped = this.getNodesGroupedByParent(selectedNodes);
        let breadcrumbNodes = this.getBreadcrumbNodes();
        let showBackNode = this.state.parent != this.props.root;
        let backNodeTarget = null;
        if(showBackNode){
            backNodeTarget = this.props.nodes[this.state.parent].parent;
        }

        return (
            <div className="rfs">
                <BreadcrumbsBar
                    root={root}
                    homeIconClass={homeIconClass}
                    nodes={breadcrumbNodes}
                    onExpandFolder={this.onExpandFolder}
                />
                <div className="rfs-row">
                    <div className="rfs-col">
                        <div className="rfs-search">
                            <input type="text" value={this.state.searchText} onChange={this.onChangeSearchText} />
                            <div className="rfs-icon-search-wrap">
                                <span className={searchIconClass + ' rfs-icon'} />
                            </div>
                        </div>

                        {showBackNode &&
                            <Node
                                id={backNodeTarget}
                                text=".."
                                icon={backNodeIconClass}
                                selectable={false}
                                disabled={false}
                                expandable={true}
                                onExpandFolder={this.onExpandFolder}
                            />
                        }

                        {nodes.map((node, i) => {
                            return <Node
                                id={node.id}
                                text={node.text}
                                icon={node.icon}
                                selectable={node.selectable}
                                disabled={node.disabled}
                                expandable={node.expandable}
                                onSelect={this.onSelectItemNode}
                                onExpandFolder={this.onExpandFolder}
                                key={i}
                            />
                        })}

                        {nodes.length == 0 && isLoading &&
                            <div className="rfs-spinner">
                                <span className={spinnerIconClass + ' rfs-icon'} />
                            </div>
                        }
                    </div>
                    {displaySelected &&
                    <div className="rfs-col">
                        {_.map(selectedNodesGrouped, (obj) => {
                            return (
                                <div key={obj.parent}>
                                    <NodeSelectedHeader
                                        breadcrumbs={obj.breadcrumbs}
                                        nodeId={obj.parent}
                                        onSelect={this.onDeselectFolderNode}
                                    />
                                    {obj.nodes.map((node, i) => {
                                        return <NodeSelected
                                            id={node.id}
                                            text={node.text}
                                            icon={node.icon}
                                            onSelect={this.onDeselectItemNode}
                                            key={i}
                                        />
                                    })}
                                </div>
                            );
                        })}
                    </div>
                    }
                </div>
            </div>
        );
    }
}

class BreadcrumbsBar extends React.Component{
    static defaultProps = {
        root: 0,
        homeIconClass: 'fa fa-home fa-fw',
        nodes: []
    };
    constructor(props){
        super(props);
    }
    onClick(id){
        this.props.onExpandFolder(id);
    }
    render(){
        let {homeIconClass, root, nodes} = this.props;
        homeIconClass += ' rfs-icon rfs-icon-folder rfs-breadcrumb';

        return (
            <div className="rfs-breadcrumbs-bar">
                <span className={homeIconClass} onClick={this.onClick.bind(this, root)} title="Navigate to root folder" />
                {nodes.map((node, i) => {
                    let title = 'Navigate to folder';
                    if(i == nodes.length-1){
                        title = 'Select all items in this folder';
                    }

                    return (
                        <span className="rfs-breadcrumb" onClick={this.onClick.bind(this, node.id)} title={title} key={i}>
                            {node.text}
                        </span>
                    );
                })}
            </div>
        );
    }
}

class Node extends React.Component{
    static defaultProps = {
        text: 'Name',
        icon: 'fa fa-file-o fa-fw',
        selectable: true,
        expandable: false,
        disabled: false,
        parent: 0
    };
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick(){
        if(this.props.expandable){
            this.props.onExpandFolder(this.props.id);
        }else if(this.props.selectable){
            this.props.onSelect(this.props.id);
        }
    }
    render(){
        let {expandable, selectable, icon, text} = this.props;

        let className = '';
        let title = '';

        if(expandable){
            className = 'rfs-node rfs-node-folder';
            title = 'Open ' + this.props.text;
        }else if(selectable){
            className = 'rfs-node rfs-node-item';
            title = 'Select ' + this.props.text;
        }else{
            className = 'rfs-node rfs-node-item-disabled';
            title = 'Disabled';
        }

        return (
            <div onClick={this.onClick} className={className} title={title}>
                <span className={icon + ' rfs-icon'} /> {text}
            </div>
        );
    }
}

class NodeSelected extends React.Component{
    static defaultProps = {
        text: 'Name',
        icon: 'fa fa-file-o fa-fw'
    };
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick(){
        this.props.onSelect(this.props.id);
    }
    render(){
        let {icon, text} = this.props;
        let title = 'Deselect ' + text;

        return (
            <div onClick={this.onClick} className="rfs-node rfs-node-item-selected" title={title}>
                <span className={icon + ' rfs-icon'} /> {text}
            </div>
        );
    }
}

class NodeSelectedHeader extends React.Component{
    static defaultProps = {
        text: 'Root',
        icon: 'fa fa-folder-open-o fa-fw'
    };
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick(){
        this.props.onSelect(this.props.nodeId)
    }
    render(){
        let {icon, breadcrumbs} = this.props;
        let title = 'Deselect all items in ' + breadcrumbs;

        return (
            <div className="rfs-node rfs-node-folder-selected" onClick={this.onClick} title={title}>
                <span className={icon + ' rfs-icon'} /> {breadcrumbs}
            </div>
        );
    }
}