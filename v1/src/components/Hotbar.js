import React, { useRef, useEffect } from 'react';

const Hotbar = ({ isTextEditorHidden, createNode, timeline }) => {
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
        if (action === 'Select Node') {
            const length = timeline.root ? timeline.root.branches.length + 1 : 0;
            console.log(`LinkedTimeline length: ${length}`);
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