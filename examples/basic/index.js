import React from 'react';
import axios from 'axios';
import {FolderSelect, flatten} from '../../src/index';

class FolderSelectExample extends React.Component{
    constructor(props){
        super(props);

        this.load = this.load.bind(this);
        this.onChangeSelected = this.onChangeSelected.bind(this);

        let {nodes, index} = flatten([
            {
                text: 'Test Folder 1',
                expandable: true,
                children: [
                    {
                        text: 'Test3 with a very very long name indeed',
                        selected: true
                    }
                ]
            },
            {
                text: 'Test Folder 2',
                expandable: true
            },
            {
                text: 'Test2'
            }
        ]);

        this.state = {
            isLoading: false,
            nodes: nodes,
            nextIndex: index,
            dump: ''
        };
    }
    load(node){
        this.setState({isLoading: true});

        setTimeout(() => {
            axios.get('more.json')
                .then((response) => {
                    let res = flatten(response.data, node.id, this.state.nextIndex);
                    let nodes = Object.assign({}, this.state.nodes, res.nodes);

                    this.setState({
                        isLoading: false,
                        nodes: nodes,
                        nextIndex: res.index
                    });

                    return res.nodes;
                })
                .catch((response) => {
                    this.setState({isLoading: false});
                    console.log(response);
                });
        }, 1000);
    }
    onChangeSelected(nodes){
        this.setState({
            dump: JSON.stringify(nodes, null, 2)
        });
    }
    render(){
        return (
            <div>
            <FolderSelect
                nodes={this.state.nodes}
                load={this.load}
                isLoading={this.state.isLoading}
                onChangeSelected={this.onChangeSelected}
            />
            <br />
            <br />
            <h3>Selected</h3>
            <pre>{this.state.dump}</pre>
            </div>
        );
    }
}

React.render(
    <FolderSelectExample />,
    document.getElementById('app')
);