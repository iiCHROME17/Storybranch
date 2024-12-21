import React, { useState } from 'react';
import TimelineNode from './Nodes/TimelineNode';
import Hotbar from './Hotbar';

const Workspace = ({ activeTab, setActiveTab, timeline, updateNodeName, selectedNodeId, setSelectedNodeId }) => {
    const [editingNodeId, setEditingNodeId] = useState(null);
    const [newName, setNewName] = useState('');
    const [nodes, setNodes] = useState([]);

    const handleDoubleClick = (node) => {
        setEditingNodeId(node.data.id);
        setNewName(node.data.name);
    };

    const handleBlur = (node) => {
        updateNodeName(node.data.id, newName);
        setEditingNodeId(null);
    };

    const handleKeyDown = (e, node) => {
        if (e.key === 'Enter') {
            handleBlur(node);
        }
    };

    const handleClick = (node) => {
        setSelectedNodeId(node.data.id);
        console.log(`Selected node ID: ${node.data.id}`);
    };

    const createNode = (parentDiv) => {
        const newNode = new TimelineNode({ id: nodes.length + 1, name: `Node ${nodes.length + 1}` }, `Node ${nodes.length + 1}`, 100 * (nodes.length + 1), 100, parentDiv);
        setNodes([...nodes, newNode]);
    };

    const renderNodes = () => {
        return nodes.map((node) => (
            <div
                key={node.data.id}
                className={`nodeContainer ${selectedNodeId === node.data.id ? 'selected' : ''}`}
                style={{ left: node.x, top: node.y }}
                onClick={() => handleClick(node)}
            >
                <div className="node"></div>
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
                    {node.data.name}
                </span>
                )}
            </div>
        ));
    };

    return (
        <div className="workspace">
            <div className="TimelineTabs">
                <button className={activeTab === 'Main' ? 'active' : ''} onClick={() => setActiveTab('Main')}>Main</button>
            </div>
            <div className="workspaceContent">
                <div className="TimelineInstance">
                    {activeTab === 'Main' && renderNodes()}
                </div>
            </div>
            <Hotbar createNode={createNode} timeline={timeline} />
        </div>
    );
};

export default Workspace;