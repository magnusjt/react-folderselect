(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "lodash"], factory);
	else if(typeof exports === 'object')
		exports["react-folderselect"] = factory(require("react"), require("lodash"));
	else
		root["react-folderselect"] = factory(root["react"], root["lodash"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _component = __webpack_require__(2);

	var _flatten = __webpack_require__(5);

	var _flatten2 = _interopRequireDefault(_flatten);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports.flatten = _flatten2.default;
	module.exports.FolderSelect = _component.FolderSelect;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FolderSelect = undefined;

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _lodash = __webpack_require__(4);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _flatten = __webpack_require__(5);

	var _flatten2 = _interopRequireDefault(_flatten);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FolderSelect = exports.FolderSelect = (function (_React$Component) {
	    _inherits(FolderSelect, _React$Component);

	    function FolderSelect(props) {
	        _classCallCheck(this, FolderSelect);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FolderSelect).call(this, props));

	        _this.onSelectItemNode = _this.onSelectItemNode.bind(_this);
	        _this.onDeselectItemNode = _this.onDeselectItemNode.bind(_this);
	        _this.onSelectFolderNode = _this.onSelectFolderNode.bind(_this);
	        _this.onDeselectFolderNode = _this.onDeselectFolderNode.bind(_this);
	        _this.onExpandFolder = _this.onExpandFolder.bind(_this);
	        _this.onChangeSearchText = _this.onChangeSearchText.bind(_this);

	        _this.state = {
	            parent: props.root,
	            searchText: '',
	            selected: []
	        };
	        return _this;
	    }

	    _createClass(FolderSelect, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            /* When the component first mounts, preselect nodes */
	            var selected = this.state.selected.slice();
	            var ids = _lodash2.default.map(_lodash2.default.filter(this.props.nodes, { selected: true }), 'id');
	            selected = _lodash2.default.uniq(_lodash2.default.union(selected, ids));
	            var nSelected = selected.length;
	            if (nSelected > 0) {
	                var lastSelected = selected[nSelected - 1];
	                var parent = this.props.nodes[lastSelected].parent;
	                this.setState({ parent: parent });
	                this.changeSelected(selected);
	            }
	        }
	    }, {
	        key: 'filterNodesOnSearchText',
	        value: function filterNodesOnSearchText(nodes, searchText) {
	            if (searchText == '') {
	                return nodes;
	            }

	            searchText = searchText.toLowerCase();

	            return _lodash2.default.filter(nodes, function (node) {
	                return _lodash2.default.includes(node.text.toLowerCase(), searchText);
	            });
	        }
	    }, {
	        key: 'getFolderNodes',
	        value: function getFolderNodes() {
	            var nodes = _lodash2.default.filter(this.props.nodes, { expandable: true, parent: this.state.parent });
	            nodes = _lodash2.default.sortBy(nodes, 'text');
	            return this.filterNodesOnSearchText(nodes, this.state.searchText);
	        }
	    }, {
	        key: 'getItemNodes',
	        value: function getItemNodes() {
	            var _this2 = this;

	            var nodes = _lodash2.default.filter(this.props.nodes, { expandable: false, parent: this.state.parent });
	            nodes = _lodash2.default.sortBy(nodes, 'text');

	            // Don't include selected nodes:
	            nodes = _lodash2.default.filter(nodes, function (node) {
	                return _this2.state.selected.indexOf(node.id) == -1;
	            });

	            return this.filterNodesOnSearchText(nodes, this.state.searchText);
	        }
	    }, {
	        key: 'getSelectedNodes',
	        value: function getSelectedNodes() {
	            var _this3 = this;

	            return this.state.selected.map(function (id) {
	                return _this3.props.nodes[id];
	            });
	        }
	    }, {
	        key: 'getBreadcrumbNodes',
	        value: function getBreadcrumbNodes() {
	            var id = this.state.parent;
	            var crumbs = [];
	            while (id != this.props.root) {
	                if (id === undefined) {
	                    break;
	                }

	                crumbs.push(this.props.nodes[id]);
	                id = this.props.nodes[id].parent;
	            }

	            return crumbs.reverse();
	        }
	    }, {
	        key: 'getBreadcrumbsForNode',
	        value: function getBreadcrumbsForNode(id) {
	            var names = [];
	            while (id != this.props.root) {
	                if (id === undefined) {
	                    break;
	                }

	                names.push(this.props.nodes[id].text);
	                id = this.props.nodes[id].parent;
	            }

	            return names.reverse();
	        }
	    }, {
	        key: 'getNodesGroupedByParent',
	        value: function getNodesGroupedByParent(nodes) {
	            var _this4 = this;

	            var nodesByParent = _lodash2.default.reduce(nodes, function (nodesByParent, node) {
	                if (!nodesByParent.hasOwnProperty(node.parent)) {
	                    nodesByParent[node.parent] = [];
	                }
	                nodesByParent[node.parent].push(node);
	                return nodesByParent;
	            }, {});

	            var nodesGrouped = _lodash2.default.map(nodesByParent, function (nodes, parent) {
	                var breadcrumbs = _this4.getBreadcrumbsForNode(parent).join(' / ');
	                if (breadcrumbs == '') {
	                    breadcrumbs = 'Root';
	                }

	                return {
	                    nodes: _lodash2.default.sortBy(nodes, 'text'),
	                    parent: parent,
	                    breadcrumbs: breadcrumbs
	                };
	            });

	            return _lodash2.default.sortBy(nodesGrouped, 'breadcrumbs');
	        }
	    }, {
	        key: 'onSelectItemNode',
	        value: function onSelectItemNode(id) {
	            var selected = this.state.selected.slice();
	            selected.push(id);
	            selected = _lodash2.default.uniq(selected);
	            this.changeSelected(selected);
	        }
	    }, {
	        key: 'onDeselectItemNode',
	        value: function onDeselectItemNode(id) {
	            var selected = this.state.selected.slice();
	            var index = selected.indexOf(id);
	            if (index != -1) {
	                selected.splice(index, 1);
	                this.changeSelected(selected);
	            }
	        }
	    }, {
	        key: 'onSelectFolderNode',
	        value: function onSelectFolderNode(parentId) {
	            var ids = _lodash2.default.filter(this.props.nodes, { selectable: true, parent: parentId }).map(function (node) {
	                return node.id;
	            });

	            var selected = _lodash2.default.uniq(_lodash2.default.union(this.state.selected.slice(), ids));
	            this.changeSelected(selected);
	        }
	    }, {
	        key: 'onDeselectFolderNode',
	        value: function onDeselectFolderNode(parentId) {
	            var _this5 = this;

	            var selected = this.state.selected.slice().reduce(function (ids, id) {
	                if (_this5.props.nodes[id].parent != parentId) {
	                    ids.push(id);
	                }
	                return ids;
	            }, []);

	            this.changeSelected(selected);
	        }
	    }, {
	        key: 'onExpandFolder',
	        value: function onExpandFolder(parent) {
	            if (parent == this.state.parent) {
	                // Already in this folder, so select all instead of expanding
	                this.onSelectFolderNode(parent);
	            } else {
	                if (_lodash2.default.filter(this.props.nodes, { parent: parent }).length == 0) {
	                    // If folder is empty, attempt to lazy load
	                    this.props.load(this.props.nodes[parent]);
	                    this.setState({ parent: parent });
	                } else {
	                    this.setState({ parent: parent });
	                }
	            }
	        }
	    }, {
	        key: 'onChangeSearchText',
	        value: function onChangeSearchText(e) {
	            this.setState({
	                searchText: e.target.value
	            });
	        }
	    }, {
	        key: 'changeSelected',
	        value: function changeSelected(selected) {
	            var _this6 = this;

	            this.setState({ selected: selected });

	            var nodes = selected.map(function (id) {
	                return _this6.props.nodes[id];
	            });

	            this.props.onChangeSelected(nodes);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this7 = this;

	            var _props = this.props;
	            var root = _props.root;
	            var isLoading = _props.isLoading;
	            var spinnerIconClass = _props.spinnerIconClass;
	            var backNodeIconClass = _props.backNodeIconClass;
	            var homeIconClass = _props.homeIconClass;
	            var searchIconClass = _props.searchIconClass;
	            var displaySelected = _props.displaySelected;

	            var nodes = [].concat(_toConsumableArray(this.getFolderNodes()), _toConsumableArray(this.getItemNodes()));
	            var selectedNodes = this.getSelectedNodes();
	            var selectedNodesGrouped = this.getNodesGroupedByParent(selectedNodes);
	            var breadcrumbNodes = this.getBreadcrumbNodes();
	            var showBackNode = this.state.parent != this.props.root;
	            var backNodeTarget = null;
	            if (showBackNode) {
	                backNodeTarget = this.props.nodes[this.state.parent].parent;
	            }

	            return _react2.default.createElement(
	                'div',
	                { className: 'rfs' },
	                _react2.default.createElement(BreadcrumbsBar, {
	                    root: root,
	                    homeIconClass: homeIconClass,
	                    nodes: breadcrumbNodes,
	                    onExpandFolder: this.onExpandFolder
	                }),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'rfs-row' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'rfs-col' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'rfs-search' },
	                            _react2.default.createElement('input', { type: 'text', value: this.state.searchText, onChange: this.onChangeSearchText }),
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'rfs-icon-search-wrap' },
	                                _react2.default.createElement('span', { className: searchIconClass + ' rfs-icon' })
	                            )
	                        ),
	                        showBackNode && _react2.default.createElement(Node, {
	                            id: backNodeTarget,
	                            text: '..',
	                            icon: backNodeIconClass,
	                            selectable: false,
	                            disabled: false,
	                            expandable: true,
	                            onExpandFolder: this.onExpandFolder
	                        }),
	                        nodes.map(function (node, i) {
	                            return _react2.default.createElement(Node, {
	                                id: node.id,
	                                text: node.text,
	                                icon: node.icon,
	                                selectable: node.selectable,
	                                disabled: node.disabled,
	                                expandable: node.expandable,
	                                onSelect: _this7.onSelectItemNode,
	                                onExpandFolder: _this7.onExpandFolder,
	                                key: i
	                            });
	                        }),
	                        nodes.length == 0 && isLoading && _react2.default.createElement(
	                            'div',
	                            { className: 'rfs-spinner' },
	                            _react2.default.createElement('span', { className: spinnerIconClass + ' rfs-icon' })
	                        )
	                    ),
	                    displaySelected && _react2.default.createElement(
	                        'div',
	                        { className: 'rfs-col' },
	                        _lodash2.default.map(selectedNodesGrouped, function (obj) {
	                            return _react2.default.createElement(
	                                'div',
	                                { key: obj.parent },
	                                _react2.default.createElement(NodeSelectedHeader, {
	                                    breadcrumbs: obj.breadcrumbs,
	                                    nodeId: obj.parent,
	                                    onSelect: _this7.onDeselectFolderNode
	                                }),
	                                obj.nodes.map(function (node, i) {
	                                    return _react2.default.createElement(NodeSelected, {
	                                        id: node.id,
	                                        text: node.text,
	                                        icon: node.icon,
	                                        onSelect: _this7.onDeselectItemNode,
	                                        key: i
	                                    });
	                                })
	                            );
	                        })
	                    )
	                )
	            );
	        }
	    }]);

	    return FolderSelect;
	})(_react2.default.Component);

	FolderSelect.propTypes = {
	    root: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]),
	    nodes: _react2.default.PropTypes.object,
	    onChangeSelected: _react2.default.PropTypes.func,
	    load: _react2.default.PropTypes.func,
	    isLoading: _react2.default.PropTypes.bool,
	    displaySelected: _react2.default.PropTypes.bool,
	    spinnerIconClass: _react2.default.PropTypes.string,
	    homeIconClass: _react2.default.PropTypes.string,
	    backNodeIconClass: _react2.default.PropTypes.string
	};
	FolderSelect.defaultProps = {
	    root: 0,
	    nodes: {},
	    onChangeSelected: function onChangeSelected(nodes) {},
	    load: function load(node) {},
	    isLoading: false,
	    displaySelected: true,
	    spinnerIconClass: 'fa fa-spinner fa-spin fa-fw',
	    homeIconClass: 'fa fa-home fa-fw',
	    backNodeIconClass: 'fa fa-folder-o fa-fw',
	    searchIconClass: 'fa fa-search fa-fw'
	};

	var BreadcrumbsBar = (function (_React$Component2) {
	    _inherits(BreadcrumbsBar, _React$Component2);

	    function BreadcrumbsBar(props) {
	        _classCallCheck(this, BreadcrumbsBar);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(BreadcrumbsBar).call(this, props));
	    }

	    _createClass(BreadcrumbsBar, [{
	        key: 'onClick',
	        value: function onClick(id) {
	            this.props.onExpandFolder(id);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this9 = this;

	            var _props2 = this.props;
	            var homeIconClass = _props2.homeIconClass;
	            var root = _props2.root;
	            var nodes = _props2.nodes;

	            homeIconClass += ' rfs-icon rfs-icon-folder rfs-breadcrumb';

	            return _react2.default.createElement(
	                'div',
	                { className: 'rfs-breadcrumbs-bar' },
	                _react2.default.createElement('span', { className: homeIconClass, onClick: this.onClick.bind(this, root), title: 'Navigate to root folder' }),
	                nodes.map(function (node, i) {
	                    var title = 'Navigate to folder';
	                    if (i == nodes.length - 1) {
	                        title = 'Select all items in this folder';
	                    }

	                    return _react2.default.createElement(
	                        'span',
	                        { className: 'rfs-breadcrumb', onClick: _this9.onClick.bind(_this9, node.id), title: title, key: i },
	                        node.text
	                    );
	                })
	            );
	        }
	    }]);

	    return BreadcrumbsBar;
	})(_react2.default.Component);

	BreadcrumbsBar.defaultProps = {
	    root: 0,
	    homeIconClass: 'fa fa-home fa-fw',
	    nodes: []
	};

	var Node = (function (_React$Component3) {
	    _inherits(Node, _React$Component3);

	    function Node(props) {
	        _classCallCheck(this, Node);

	        var _this10 = _possibleConstructorReturn(this, Object.getPrototypeOf(Node).call(this, props));

	        _this10.onClick = _this10.onClick.bind(_this10);
	        return _this10;
	    }

	    _createClass(Node, [{
	        key: 'onClick',
	        value: function onClick() {
	            if (this.props.expandable) {
	                this.props.onExpandFolder(this.props.id);
	            } else if (this.props.selectable) {
	                this.props.onSelect(this.props.id);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props3 = this.props;
	            var expandable = _props3.expandable;
	            var selectable = _props3.selectable;
	            var icon = _props3.icon;
	            var text = _props3.text;

	            var className = '';
	            var title = '';

	            if (expandable) {
	                className = 'rfs-node rfs-node-folder';
	                title = 'Open ' + this.props.text;
	            } else if (selectable) {
	                className = 'rfs-node rfs-node-item';
	                title = 'Select ' + this.props.text;
	            } else {
	                className = 'rfs-node rfs-node-item-disabled';
	                title = 'Disabled';
	            }

	            return _react2.default.createElement(
	                'div',
	                { onClick: this.onClick, className: className, title: title },
	                _react2.default.createElement('span', { className: icon + ' rfs-icon' }),
	                ' ',
	                text
	            );
	        }
	    }]);

	    return Node;
	})(_react2.default.Component);

	Node.defaultProps = {
	    text: 'Name',
	    icon: 'fa fa-file-o fa-fw',
	    selectable: true,
	    expandable: false,
	    disabled: false,
	    parent: 0
	};

	var NodeSelected = (function (_React$Component4) {
	    _inherits(NodeSelected, _React$Component4);

	    function NodeSelected(props) {
	        _classCallCheck(this, NodeSelected);

	        var _this11 = _possibleConstructorReturn(this, Object.getPrototypeOf(NodeSelected).call(this, props));

	        _this11.onClick = _this11.onClick.bind(_this11);
	        return _this11;
	    }

	    _createClass(NodeSelected, [{
	        key: 'onClick',
	        value: function onClick() {
	            this.props.onSelect(this.props.id);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props4 = this.props;
	            var icon = _props4.icon;
	            var text = _props4.text;

	            var title = 'Deselect ' + text;

	            return _react2.default.createElement(
	                'div',
	                { onClick: this.onClick, className: 'rfs-node rfs-node-item-selected', title: title },
	                _react2.default.createElement('span', { className: icon + ' rfs-icon' }),
	                ' ',
	                text
	            );
	        }
	    }]);

	    return NodeSelected;
	})(_react2.default.Component);

	NodeSelected.defaultProps = {
	    text: 'Name',
	    icon: 'fa fa-file-o fa-fw'
	};

	var NodeSelectedHeader = (function (_React$Component5) {
	    _inherits(NodeSelectedHeader, _React$Component5);

	    function NodeSelectedHeader(props) {
	        _classCallCheck(this, NodeSelectedHeader);

	        var _this12 = _possibleConstructorReturn(this, Object.getPrototypeOf(NodeSelectedHeader).call(this, props));

	        _this12.onClick = _this12.onClick.bind(_this12);
	        return _this12;
	    }

	    _createClass(NodeSelectedHeader, [{
	        key: 'onClick',
	        value: function onClick() {
	            this.props.onSelect(this.props.nodeId);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props5 = this.props;
	            var icon = _props5.icon;
	            var breadcrumbs = _props5.breadcrumbs;

	            var title = 'Deselect all items in ' + breadcrumbs;

	            return _react2.default.createElement(
	                'div',
	                { className: 'rfs-node rfs-node-folder-selected', onClick: this.onClick, title: title },
	                _react2.default.createElement('span', { className: icon + ' rfs-icon' }),
	                ' ',
	                breadcrumbs
	            );
	        }
	    }]);

	    return NodeSelectedHeader;
	})(_react2.default.Component);

	NodeSelectedHeader.defaultProps = {
	    text: 'Root',
	    icon: 'fa fa-folder-open-o fa-fw'
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = flatten;
	function flatten(inputNodes) {
	    var parent = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	    var index = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

	    var nodes = {};
	    inputNodes.forEach(function (node) {
	        var flatNode = {
	            id: index++,
	            parent: parent,
	            text: node.text || 'Name',
	            expandable: node.expandable === undefined ? false : node.expandable,
	            selectable: node.selectable === undefined ? true : node.selectable,
	            selected: node.selected === undefined ? false : node.selected,
	            payload: node.payload || {}
	        };

	        if (flatNode.expandable === true) {
	            flatNode.selectable = false;
	            flatNode.selected = false;
	        }

	        if (node.icon) {
	            flatNode.icon = node.icon;
	        } else {
	            flatNode.icon = 'fa fa-file-o fa-fw';
	            if (flatNode.expandable) {
	                flatNode.icon = 'fa fa-folder-o fa-fw';
	            }
	        }

	        nodes[flatNode.id] = flatNode;

	        if (node.children && node.children.length > 0) {
	            var result = flatten(node.children, flatNode.id, index);
	            index = result.index;
	            Object.assign(nodes, result.nodes);
	        }
	    });

	    return { nodes: nodes, index: index };
	}

/***/ }
/******/ ])
});
;