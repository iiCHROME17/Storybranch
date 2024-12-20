import React, { useState } from "react";
import Sidebar from "./components/sidebar/SidebarLayout";
import TextEditor from "./components/textEditor/TextEditor";
import Hotbar from "./components/hotbar/Hotbar";
import "./mainCanvas.css";

export const Canvas = () => {
    const [isTextEditorVisible, setIsTextEditorVisible] = useState(true);

    const toggleTextEditor = () => {
        setIsTextEditorVisible(!isTextEditorVisible);
    };

    return (
        <div className="canvas">
            <div className="sidebar"><Sidebar /></div>
            <div className="workspace">
                <button className="toggle-button" onClick={toggleTextEditor}>
                    {isTextEditorVisible ? '>' : '<'}
                </button>
            </div>
            {isTextEditorVisible && <div className="text-editor"><TextEditor /></div>}
        </div>
    );
};

export default Canvas;