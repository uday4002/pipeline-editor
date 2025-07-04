import React from 'react'
import {Handle, Position} from 'reactflow'
import './index.css'

const CustomNode = ({data, selected}) => {
    return(
        <div className={`custom-node ${selected ? 'selected' : ''}`}>
            <Handle type="target" position={Position.Left} />
            <div className="custom-node-content">
                {data.label}
            </div>
            <Handle type="source" position={Position.Right} />
        </div>
    )
}

export default CustomNode