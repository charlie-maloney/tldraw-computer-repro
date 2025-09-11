import React from 'react';
import { useEditor } from 'tldraw';
import './Toolbar.css';
import { ComponentShapeType } from '../custom-shapes/component-shape/component-shape'; // Update this path


const Toolbar: React.FC = () => {
    const editor = useEditor();
    const handleTextNodeClick = () => {
        if (editor) {
            editor.setStyleForNextShapes(ComponentShapeType, "text");
            editor.setCurrentTool("componentTool");
        }
    };

    const handleInstructionNodeClick = () => {
        if (editor) {
            editor.setStyleForNextShapes(ComponentShapeType, "instruction");
            editor.setCurrentTool("componentTool");
        }
    };

    const handleHelpClick = () => {
        console.log('Help button clicked');
    };

    return (
        <div className="toolbar">
            <div className="toolbar-button" onClick={handleTextNodeClick}>
                <span className="button-label">Text</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="toolbar-icon">
                    <path d="M4 4h16v4H4V4z" fill="currentColor" />
                    <path d="M10 8h4v12h-4V8z" fill="currentColor" />
                </svg>
            </div>

            <div className="toolbar-button" onClick={handleInstructionNodeClick}>
                <span className="button-label">Instruction</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="toolbar-icon">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
                    <circle cx="7" r="1" cy="9" fill="currentColor" />
                    <path d="M11 9h6M7 13h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <polygon points="18,3 22,7 18,11" fill="currentColor" />
                </svg>
            </div>

            <div className="toolbar-separator"></div>

            <div className="toolbar-button" onClick={handleHelpClick}>
                <span className="button-label">Help</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="toolbar-icon">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="17" r="1" fill="currentColor" />
                </svg>
            </div>
        </div>
    );
};

export default Toolbar;