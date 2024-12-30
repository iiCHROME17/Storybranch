import React, { useState, useCallback, useMemo, useReducer } from 'react';
import TimelineNode from './Nodes/TimelineNode';
import Hotbar from './Hotbar';

/**
 * Workspace component for managing and displaying timeline nodes and instances.
 * @param {Object} props - The component props.
 * @param {string} props.activeTab - The currently active tab.
 * @param {Function} props.setActiveTab - Function to set the active tab.
 * @param {Object} props.timeline - The timeline object containing nodes.
 * @param {Function} props.updateNodeName - Function to update the name of a node.
 * @param {string} props.selectedNodeId - The ID of the selected node.
 * @param {Function} props.setSelectedNodeId - Function to set the selected node ID.
 */
const Workspace = React.memo(({ activeTab, setActiveTab, timeline, updateNodeName, selectedNodeId, setSelectedNodeId }) => {
    const [editingNodeId, setEditingNodeId] = useState(null);
    const [newName, setNewName] = useState('');
    const [nodes, setNodes] = useState([]);
    const [timelineInstances, dispatch] = useReducer(timelineReducer, [{ name: 'Main', nodes: [] }]);

    const handleDoubleClick = useCallback((node) => {
        setEditingNodeId(node.data.id);
        setNewName(node.data.name);
    }, []);

    const handleBlur = useCallback((node) => {
        updateNodeName(node.data.id, newName);
        node.caption = newName; // Update caption
        setEditingNodeId(null);
    }, [newName, updateNodeName]);

    const handleKeyDown = useCallback((e, node) => {
        if (e.key === 'Enter') {
            handleBlur(node);
        }
    }, [handleBlur]);

    const handleClick = useCallback((node, event) => {
        event.stopPropagation(); // Stop event propagation
        setSelectedNodeId(node.data.id);
        console.log(`Selected node ID: ${node.data.id}`);
    }, [setSelectedNodeId]);

    const createNode = useCallback((parentDiv, customName, isBranch = false, parentNode = null) => {
        const branchOffset = 100; // Vertical offset for stacking branch nodes
        const branchCount = parentNode ? parentNode.branches.length : 0;
        const newNode = new TimelineNode(
            { id: nodes.length + 1, name: customName || `Node ${nodes.length + 1}` },
            customName || `Node ${nodes.length + 1}`,
            parentNode ? parentNode.x + 100 : 100 * (nodes.length + 1),
            parentNode ? parentNode.y + 100 + (isBranch ? branchCount * branchOffset : 0) : 100,
            isBranch,
            parentNode
        );
        newNode.caption = customName || `Node ${nodes.length + 1}`;
        setNodes((prevNodes) => [...prevNodes, newNode]);
        dispatch({ type: 'ADD_NODE', payload: { activeTab, newNode } });
    }, [nodes.length, activeTab]);

    const addTimelineInstance = useCallback((name, nodes) => {
        dispatch({ type: 'ADD_INSTANCE', payload: { name, nodes } });
    }, []);

    const renderNodes = useCallback((nodes) => {
        const renderNode = (node) => (
            <div
                key={node.data.id}
                className={`nodeContainer ${selectedNodeId === node.data.id ? 'selected' : ''} ${node.isBranch ? 'branchNode' : ''}`}
                style={{ left: node.x, top: node.y }}
                onClick={(event) => handleClick(node, event)} // Pass event to handleClick
            >
                <div className={`node ${node.isBranch ? 'branchNodeColor' : ''}`}></div>
                {editingNodeId === node.data.id ? (
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onBlur={() => handleBlur(node)}
                        onKeyDown={(e) => handleKeyDown(e, node)}
                        autoFocus
                        className="nodeNameInput"
                    />
                ) : (
                    <span
                        className="nodeName"
                        onDoubleClick={() => handleDoubleClick(node)}
                    >
                {node.caption}
            </span>
                )}
                {node.branches.map(renderNode)}
            </div>
        );

        return nodes.filter(node => !node.parent).map(renderNode);
    }, [selectedNodeId, handleClick, handleDoubleClick, handleBlur, handleKeyDown, newName, editingNodeId]);

    return (
        <div className="workspace">
            <div className="TimelineTabs">
                {timelineInstances.map((instance) => (
                    <button
                        key={instance.name}
                        className={activeTab === instance.name ? 'active' : ''}
                        onClick={() => setActiveTab(instance.name)}
                    >
                        {instance.name}
                    </button>
                ))}
            </div>
            <div className="workspaceContent">
                {timelineInstances.map((instance) => (
                    <div
                        key={instance.name}
                        className={`TimelineInstance ${activeTab === instance.name ? '' : 'hidden'}`}
                    >
                        {renderNodes(instance.nodes)}
                    </div>
                ))}
            </div>
            <Hotbar createNode={createNode} timeline={{ nodes }} selectedNodeId={selectedNodeId} setActiveTab={setActiveTab} addTimelineInstance={addTimelineInstance} />
        </div>
    );
});

/**
 * Reducer function for managing timeline state. Helps to add new nodes and instances in an optimized way.
 * @param state
 * @param action
 * @returns {[...*,{nodes, name}]|*}
 */

function timelineReducer(state, action) {
    switch (action.type) {
        case 'ADD_NODE':
            return state.map(instance => {
                if (instance.name === action.payload.activeTab) {
                    return { ...instance, nodes: [...instance.nodes, action.payload.newNode] };
                }
                return instance;
            });
        case 'ADD_INSTANCE':
            return [...state, { name: action.payload.name, nodes: action.payload.nodes }];
        default:
            return state;
    }
}

export default Workspace;