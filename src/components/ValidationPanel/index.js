import React from 'react'
import './index.css'
import {Info} from 'lucide-react'

const ValidationPanel = ({validation, nodeCount, edgeCount}) => {
    const {isValid, errors, warnings} = validation

    return(
        <div className="validation-panel">
            <div className="panel-header">
                {isValid? (
                    <span className="icon success">✔</span>
                ):(
                    <span className="icon error">✖</span>
                )}
                <h3>{isValid? 'Valid DAG' : 'Invalid DAG'}</h3>
            </div>

            <div className="panel-info">
                <span className="icon info"><Info size={24*0.6} color={'#2563EB'} /></span>
                <span>{nodeCount} nodes, {edgeCount} edges</span>
            </div>
            
            {errors.length > 0 && (
                <div className="panel-section">
                    <div className="section-title error">
                        <span>✖</span>
                        <strong>Errors</strong>
                    </div>
                    <ul>
                        {errors.map((err, idx) => (
                            <li key={idx}>{err}</li>
                        ))}
                    </ul>
                </div>
            )}

            {warnings.length > 0 && (
                <div className="panel-section">
                    <div className="section-title warning">
                        <span>⚠</span>
                        <strong>Warnings</strong>
                    </div>
                    <ul>
                        {warnings.map((warn, idx) => (
                            <li key={idx}>{warn}</li>
                        ))}
                    </ul>
                </div>
            )}

            {isValid && errors.length === 0 && warnings.length === 0 && (
                <p className="valid-message">✓ your pipeline is ready for execution!</p>
            )}
        </div>
    )
}

export default ValidationPanel