import React from 'react';

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

export default Sidebar;