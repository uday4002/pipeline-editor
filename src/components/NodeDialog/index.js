import React, {useState, useEffect} from "react";
import './index.css'

const NodeDialog = ({isOpen, onClose, onAddNode}) => {
    
    const [label, setLabel] = useState('')

    useEffect(() => {
        if(isOpen) setLabel('')
    },[isOpen])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(label.trim()){
            onAddNode(label.trim())
            setLabel('')
            onClose()
        }
    }

    const handleClose = () =>{
        setLabel('')
        onClose()
    }

    if(!isOpen) return null

    return(
        <div className="dialog-backdrop">
            <div className="dialog">
                <h1 className="dialog-title">Add New Node</h1>
                <form onSubmit={handleSubmit} className="dialog-form">
                    <label htmlFor="node-label" className="dialog-label">Node Label</label>
                    <input 
                        id="node-label"
                        value={label}
                        onChange={(e) => {setLabel(e.target.value)}}
                        className="dialog-input"
                        placeholder="e.g. Data Source"
                        autoFocus
                    />
                    <div className="dialog-buttons">
                        <button type="button" onClick={handleClose} className="btn outline">Cancel</button>
                        <button type="submit" className="btn primary" disabled={!label.trim()}>Add Node</button> 
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NodeDialog