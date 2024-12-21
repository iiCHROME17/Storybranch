import React, { useState } from 'react';
import './styles/storybranch.main.css';
import LinkedTimeline from "./Nodes/Timeline";
import Sidebar from './Sidebar';
import Workspace from './Workspace';
import Hotbar from './Hotbar';
import TextEditor from './TextEditor';

const Storybranch = () => {
    const [isTextEditorHidden, setTextEditorHidden] = useState(false);
    const [activeTab, setActiveTab] = useState('Main');
    const [activeSideTab, setActiveSideTab] = useState('Character');
    const [selectedNodeId, setSelectedNodeId] = useState(null);
    const [timeline, setTimeline] = useState(new LinkedTimeline());

    const toggleTextEditor = () => {
        setTextEditorHidden(!isTextEditorHidden);
    };

    const createNode = () => {
        setTimeline((prevTimeline) => {
            const newNodeData = {
                id: prevTimeline.root ? prevTimeline.root.branches.length + 1 : 0,
                x: prevTimeline.root ? prevTimeline.root.branches.length * 100 + 100 : 100,
                y: prevTimeline.root ? 200 : 100, // Adjust y position for child nodes
                name: `Node ${prevTimeline.root ? prevTimeline.root.branches.length + 2 : 1}`
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