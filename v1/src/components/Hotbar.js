import React, { useEffect, useRef } from 'react';
import BranchNode from "./Nodes/branchNode";

/**
 * Hotbar component for managing timeline nodes.
 * @param {Function} createNode - Function to create a new node.
 * @param {Object} timeline - The timeline object containing nodes.
 * @param {string} selectedNodeId - The ID of the selected node.
 * @param {Function} setActiveTab - Function to set the active tab.
 * @param {Function} addTimelineInstance - Function to add a new timeline instance.
 */
const Hotbar = ({ createNode, timeline, selectedNodeId, setActiveTab, addTimelineInstance }) => {
    const hotbarRef = useRef(null);

    useEffect(() => {
        const hotbar = hotbarRef.current;
        const adjustHotbarPosition = () => {
            const workspace = document.querySelector('.workspace');
            const workspaceRect = workspace.getBoundingClientRect();
            hotbar.style.left = `${workspaceRect.left + workspaceRect.width / 2 - hotbar.offsetWidth / 2}px`;
            hotbar.style.bottom = '10px';
        };

        adjustHotbarPosition();
        window.addEventListener('resize', adjustHotbarPosition);

        return () => {
            window.removeEventListener('resize', adjustHotbarPosition);
        };
    }, []);

    /**
     * Handle button click actions.
     * @param {string} action - The action to perform.
     */
    const handleButtonClick = (action) => {
        if (action === 'Branch Selected Node') {
            if (!selectedNodeId) {
                console.log('No node selected');
                return;
            }
            const parentDiv = document.querySelector('.TimelineInstance');
            const selectedNode = timeline.nodes.find(node => node.data.id === selectedNodeId);
            if (selectedNode) {
                const newNodeData = {
                    id: `${selectedNode.data.id}.${selectedNode.branches.length + 1}`,
                    name: `Branch Node ${selectedNode.data.id}.${selectedNode.branches.length + 1}`,
                    x: selectedNode.x,
                    y: selectedNode.y + 100
                };
                const newNode = new BranchNode(newNodeData, newNodeData.name, newNodeData.x, newNodeData.y, parentDiv);
                selectedNode.branches.push(newNode);
                addTimelineInstance(newNodeData.name, []);
                setActiveTab(newNodeData.name);
            }
        } else if (action === 'Create Node') {
            const parentDiv = document.querySelector('.TimelineInstance');
            createNode(parentDiv);
        }
        console.log(`Action: ${action}`);
    };

    return (
        <div className="Hotbar" ref={hotbarRef}>
            <button className="HotbarButton" onClick={() => handleButtonClick('Select Node')}>Select Node</button>
            <button className="HotbarButton" onClick={() => handleButtonClick('Create Node')}>Create Node</button>
            <button className="HotbarButton" onClick={() => handleButtonClick('Branch Selected Node')}>Branch Selected Node</button>
            <button className="HotbarButton" onClick={() => handleButtonClick('Delete Selected Node')}>Delete Selected Node</button>
        </div>
    );
};

export default Hotbar;