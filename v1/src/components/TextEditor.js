import React from 'react';

const TextEditor = ({ isHidden }) => (
    <div className={`TextEditor ${isHidden ? 'hidden' : ''}`}>
        <div className="TextEditorTitle">
            <h1>Tab Name</h1>
        </div>
        <div className="TextTools">
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

export default TextEditor;