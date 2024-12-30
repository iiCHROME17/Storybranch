import React, { useState } from 'react';
import './styles/storybranch.main.css';
import LinkedTimeline from "./Nodes/Timeline";
import Sidebar from './Sidebar';
import Workspace from './Workspace';
import Hotbar from './Hotbar';
import TextEditor from './TextEditor';

/**
 * Storybranch component for managing the main application layout and state.
 */
const Storybranch = () => {
    const [isTextEditorHidden, setTextEditorHidden] = useState(false); // State to toggle text editor visibility
    const [activeTab, setActiveTab] = useState('Main'); // State for the active tab in the workspace
    const [activeSideTab, setActiveSideTab] = useState('Character'); // State for the active side tab in the sidebar
    const [selectedNodeId, setSelectedNodeId] = useState(null); // State for the selected node ID
    const [timeline, setTimeline] = useState(new LinkedTimeline()); // State for the timeline object

    /**
     * Toggle the visibility of the text editor.
     */
    const toggleTextEditor = () => {
        setTextEditorHidden(!isTextEditorHidden);
    };

    /**
     * Create a new node in the timeline.
     */
    const createNode = (customName) => {
        setTimeline((prevTimeline) => {
            const newNodeData = {
                id: prevTimeline.root ? prevTimeline.root.branches.length + 1 : 0,
                x: prevTimeline.root ? prevTimeline.root.branches.length * 100 + 100 : 100,
                y: prevTimeline.root ? 200 : 100,
                name: customName || `Node ${prevTimeline.root ? prevTimeline.root.branches.length + 2 : 1}`
            };

            const newTimeline = new LinkedTimeline();

            if (!prevTimeline.root) {
                newTimeline.setRoot(newNodeData);
            } else {
                newTimeline.setRoot(prevTimeline.root.data);
                newTimeline.root.branches = [...prevTimeline.root.branches];
                newTimeline.addBranch(newTimeline.root, newNodeData);
            }

            return newTimeline;
        });
    };

    /**
     * Update the name of a node in the timeline.
     * @param {number} id - The ID of the node to update.
     * @param {string} newName - The new name for the node.
     */
    const updateNodeName = (id, newName) => {
        setTimeline((prevTimeline) => {
            const newTimeline = new LinkedTimeline();

            const traverseAndUpdate = (node) => {
                if (!node || !node.data) return node;
                if (node.data.id === id) {
                    node.data.name = newName;
                }
                node.branches = node.branches.map(traverseAndUpdate);
                return node;
            };

            if (prevTimeline.root) {
                newTimeline.setRoot(traverseAndUpdate(prevTimeline.root));
            }
            return newTimeline;
        });
    };

    return (
        <div className="canvas">
            <Sidebar activeSideTab={activeSideTab} setActiveSideTab={setActiveSideTab} />
            <Workspace
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                timeline={timeline}
                updateNodeName={updateNodeName}
                selectedNodeId={selectedNodeId}
                setSelectedNodeId={setSelectedNodeId}
            />
            <div className="TextEditorHide">
                <button className="HideButton" onClick={toggleTextEditor}>
                    {isTextEditorHidden ? '<' : '>'}
                </button>
            </div>
            <TextEditor isHidden={isTextEditorHidden} />
        </div>
    );
};

export default Storybranch;