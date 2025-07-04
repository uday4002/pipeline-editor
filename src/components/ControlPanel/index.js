import React, { useState } from 'react'
import {Plus, Layout, Info} from 'lucide-react'
import './index.css'

const ControlPanel = ({onAddNode, onAutoLayout}) => {

    const [showInfo, setShowInfo] = useState(false)
    return(
        <div className="pipeline-editor-header-container">
            <div className="pipeline-editor-banner">
                <h1 className="banner-heading">Pipeline Editor</h1>
                <p className="banner-tag-line">Build and validate your data processing pipelines</p>
            </div>
            <div className="control-panel">
                <button className="btn" onClick={onAddNode}>
                    <Plus size={20} />
                    <span>Add Node</span>
                </button>
                <button className="btn outline" onClick={onAutoLayout}>
                    <Layout size={20} />
                    <span>Auto Layout</span>
                </button>
                <div className="info-wrapper">
                    <button className="btn info" onClick={() => (setShowInfo(prev => !prev))}>
                        <Info size={40*0.6} color={'#2563EB'} />
                    </button>
                    {showInfo && (
                        <div className="info-tooltip">
                            <strong>How to delete:</strong>
                            <ul>
                                <li>Select a node and press <kbd>Delete</kbd> or <kbd>Backspace</kbd></li>
                                <li>Hold Ctrl and click multiple nodes to delete them all</li>
                                <li>All connected edges will be deleted automatically</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ControlPanel