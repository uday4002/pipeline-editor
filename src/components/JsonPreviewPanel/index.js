import React from 'react';
import './index.css';

const JsonPreviewPanel = ({ nodes, edges }) => {
  const dagStructure = {
    nodes: nodes.map(n => ({ id: n.id, label: n.data.label})),
    edges: edges.map(e => ({ source: e.source, target: e.target })),
  };

  return (
    <div className="json-preview-panel">
      <h3>DAG JSON Preview</h3>
      <pre>{JSON.stringify(dagStructure, null, 2)}</pre>
    </div>
  );
};

export default JsonPreviewPanel;
