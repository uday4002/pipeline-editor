import React from 'react'
import {Handle, Position} from 'reactflow'
import './index.css'

const CustomNode = ({data, selected}) => {
    return(
        <div className={`custom-node ${selected ? 'selected' : ''}`}>
            <Handle type="target" position={Position.Left} style={{background: '#3b82f6'}} />
            <div className="custom-node-content">
                {data.label}
            </div>
            <Handle type="source" position={Position.Right} style={{background: '#3b82f6'}} />
        </div>
    )
}

export default CustomNode