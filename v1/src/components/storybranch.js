import React, { useState, useEffect, useRef } from 'react';
import './styles/storybranch.main.css';



const Sidebar = ({ activeSideTab, setActiveSideTab }) => (
    <div className="Sidebar">
        <div className="TitleSection">
            <h1>STORYBRANCH</h1>
            <h2>Untitled</h2>
            <nav className="TitleNavSection">
                <ul>
                    <li>
                        <div className="DropdownContainer">
                            <span className="DropdownLabel">File</span>
                            <select>
                                <option>New</option>
                                <option>Open</option>
                                <option>Save</option>
                            </select>
                        </div>
                    </li>
                    <li>
                        <div className="DropdownContainer">
                            <span className="DropdownLabel">Edit</span>
                            <select>
                                <option>Undo</option>
                                <option>Redo</option>
                                <option>Cut</option>
                                <option>Copy</option>
                                <option>Paste</option>
                            </select>
                        </div>
                    </li>
                    <li>
                        <div className="DropdownContainer">
                            <span className="DropdownLabel">View</span>
                            <select>
                                <option>Zoom In</option>
                                <option>Zoom Out</option>
                                <option>Full Screen</option>
                            </select>
                        </div>
                    </li>
                    <li>
                        <div className="DropdownContainer">
                            <span className="DropdownLabel">Help</span>
                            <select>
                                <option>Documentation</option>
                                <option>About</option>
                            </select>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
        <div className="TabSelectSection">
            <button className="hamburger" onClick={() => document.querySelector('.Tabs').classList.toggle('active')}>☰</button>
            <ul className="Tabs">
                <li><button onClick={() => setActiveSideTab('Character')}>Character</button></li>
                <li><button onClick={() => setActiveSideTab('Story')}>Story</button></li>
                <li><button onClick={() => setActiveSideTab('World')}>World</button></li>
            </ul>
            <div className="TabNameSection">
                <h2>{activeSideTab === 'Story' ? 'Story Events:' : activeSideTab === 'Character' ? 'Characters:' : 'World Data:'}</h2>
                <button className="AddButton">+</button>
            </div>
        </div>
        <div className="TabContentSection">
        </div>
    </div>
);

const Workspace = ({ activeTab, setActiveTab, nodes, updateNodeName, selectedNodeId, setSelectedNodeId }) => {
    const [editingNodeId, setEditingNodeId] = useState(null);
    const [newName, setNewName] = useState('');

    const handleDoubleClick = (node) => {
        setEditingNodeId(node.id);
        setNewName(node.name);
    };

    const handleBlur = (node) => {
        updateNodeName(node.id, newName);
        setEditingNodeId(null);
    };

    const handleKeyDown = (e, node) => {
        if (e.key === 'Enter') {
            handleBlur(node);
        }
    };

    const handleClick = (node) => {
        setSelectedNodeId(node.id);
        console.log(`Selected node ID: ${node.id}`);
    };

    return (
        <div className="workspace">
            <div className="TimelineTabs">
                <button className={activeTab === 'Main' ? 'active' : ''} onClick={() => setActiveTab('Main')}>Main</button>
            </div>
            <div className="workspaceContent">
                {activeTab === 'Main' && (
                    <div>
                        {nodes.map((node) => (
                            <div
                                key={node.id}
                                className={`nodeContainer ${selectedNodeId === node.id ? 'selected' : ''}`}
                                style={{ left: node.x, top: node.y }}
                                onClick={() => handleClick(node)}
                            >
                                <div className="node"></div>
                                {editingNodeId === node.id ? (
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
                                        {node.name}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
const Hotbar = ({ isTextEditorHidden, createNode }) => {
    const hotbarRef = useRef(null);

    useEffect(() => {
        const adjustHotbarPosition = () => {
            const hotbar = hotbarRef.current;
            const workspace = document.querySelector('.workspace');
            const textEditor = document.querySelector('.TextEditor');

            if (hotbar && workspace && textEditor) {
                const workspaceRect = workspace.getBoundingClientRect();
                const textEditorRect = textEditor.getBoundingClientRect();

                if (isTextEditorHidden) {
                    hotbar.style.left = `${workspaceRect.left + workspaceRect.width / 2 - hotbar.offsetWidth / 2}px`;
                } else {
                    hotbar.style.left = `${textEditorRect.right + (workspaceRect.left - textEditorRect.right) / 2 - hotbar.offsetWidth / 2}px`;
                }
                hotbar.style.bottom = '10px';
            }
        };

        adjustHotbarPosition();
        window.addEventListener('resize', adjustHotbarPosition);

        return () => {
            window.removeEventListener('resize', adjustHotbarPosition);
        };
    }, [isTextEditorHidden]);

    const handleButtonClick = (action) => {
        if (action === 'Create Node') {
            createNode();
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
const TextEditor = ({ isHidden }) => (
    <div className={`TextEditor ${isHidden ? 'hidden' : ''}`}>
        <div className="TextEditorTitle">
            <h1>Tab Name</h1>
        </div>
        <div className="TextTools">
            <button className="hamburger" onClick={() => document.querySelector('.TextTools ul').classList.toggle('active')}>☰</button>
            <ul>
                <select id="Style">
                    <option value="Paragraph">Paragraph</option>
                    <option value="Heading 1">Heading 1</option>
                    <option value="Heading 2">Heading 2</option>
                    <option value="Heading 3">Heading 3</option>
                </select>
                <select id="FontFamily">
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Inter">Inter</option>
                </select>
                <div className="FontSizeControl">
                    <button className="DecreaseButton">-</button>
                    <input type="text" value="12" />
                    <button className="IncreaseButton">+</button>
                </div>
                <button className="BoldButton">B</button>
                <button className="ItalicButton">I</button>
                <button className="UnderlineButton">U</button>
                <button className="ColorButton">Color</button>
                <button className="HighlightButton">Highlight</button>
                <select id="Insert">
                    <option value="Insert">Insert</option>
                    <option value="Image">Image</option>
                    <option value="Link">Link</option>
                    <option value="Table">Table</option>
                </select>
                <select id="Align">
                    <option value="Align">Align</option>
                    <option value="Left">Left</option>
                    <option value="Center">Center</option>
                    <option value="Right">Right</option>
                    <option value="Justify">Justify</option>
                </select>
                <select id="LineSpacing">
                    <option value="Line Spacing">Line Spacing</option>
                    <option value="1">1</option>
                    <option value="1.5">1.5</option>
                    <option value="2">2</option>
                </select>
                <select id="List">
                    <option value="List">List</option>
                    <option value="Numbered">Numbered</option>
                    <option value="Bulleted">Bulleted</option>
                </select>
            </ul>
        </div>
        <div className="TextEditorContent" contentEditable="true">
        </div>
    </div>
);
const Storybranch = () => {
    const [isTextEditorHidden, setTextEditorHidden] = useState(false);
    const [activeTab, setActiveTab] = useState('Character');
    const [activeSideTab, setActiveSideTab] = useState('Character');
    const [nodes, setNodes] = useState([]); // State to manage nodes
    const [selectedNodeId, setSelectedNodeId] = useState(null); // State to track selected node

    const toggleTextEditor = () => {
        setTextEditorHidden(!isTextEditorHidden);
    };

    const createNode = () => {
        const newNode = {
            id: nodes.length,
            x: nodes.length > 0 ? nodes[nodes.length - 1].x + 100 : 100, // Position new node 100px to the right of the last node
            y: nodes.length > 0 ? nodes[nodes.length - 1].y : 100, // Keep the same y position
            name: `Node ${nodes.length + 1}`
        };
        setNodes([...nodes, newNode]);
    };

    const updateNodeName = (id, newName) => {
        setNodes(nodes.map(node => (node.id === id ? { ...node, name: newName } : node)));
    };

    return (
        <div className="canvas">
            <Sidebar activeSideTab={activeSideTab} setActiveSideTab={setActiveSideTab} />
            <Workspace
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                nodes={nodes}
                updateNodeName={updateNodeName}
                selectedNodeId={selectedNodeId}
                setSelectedNodeId={setSelectedNodeId}
            />
            <Hotbar isTextEditorHidden={isTextEditorHidden} createNode={createNode} />
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