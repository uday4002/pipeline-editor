import React, {useState, useCallback, useEffect} from 'react'
import ReactFlow,
  {
  ReactFlowProvider,
  addEdge,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow'
import 'reactflow/dist/style.css'
import ControlPanel from './components/ControlPanel'
import NodeDialog from './components/NodeDialog'
import CustomNode from './components/CustomNode'
import ValidationPanel from './components/ValidationPanel'
import validateDAG from './utils/validateDAG'
import AutoLayout from './utils/autoLayout'
import JsonPreviewPanel from './components/JsonPreviewPanel'
import './App.css'


const nodeTypes = {
  custom: CustomNode,
}

let idx=0
const getId = () => `node-${idx++}`

function App() {

  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [selectedNodes, setSelectedNodes] = useState([])
  const [selectedEdges, setSelectedEdges] = useState([])
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [showJsonPreview, setShowJsonPreview] = useState(false)
  const [validation, setValidation] = useState({
    isValid: true,
    errors: [],
    warnings: []
  })


  useEffect(() => {
    const result = validateDAG(nodes, edges)
    setValidation(result)
  },[nodes,edges])

  // Functionality for adding a Node
  const onAddNode = useCallback((label) =>{
    const newNode = {
      id: getId(), 
      position: {x: Math.random()*400, y: Math.random()*300},
      data: {label},
      type:'custom'
    }
    setNodes((nodes) => [...nodes, newNode])
  },[setNodes])

  // Functionality for Node Connection
  const onConnect = useCallback((params) => {
    if(params.source === params.target){
      console.log("Self-connections are not allowed.")
      return
    }
    setEdges((edges) => addEdge(params, edges))
  },[setEdges])
  
  // Handle the Node Changes When Add or Delete the Node
  const handleNodesChange = useCallback((changes) => {
    onNodesChange(changes)
    setSelectedNodes((prev) => {
      const newSet = new Set(prev)
      changes.forEach((change) => {
        if(change.type === 'select'){
          if(change.selected){
            newSet.add(change.id)
          }else{
            newSet.delete(change.id)
          }
        }
      })
      return Array.from(newSet)
    })
  },[onNodesChange])


  // Handle the edges Changes When Add or Delete the edge
  const handleEdgesChange = useCallback((changes) => {
    onEdgesChange(changes)
    setSelectedEdges((prev) => {
      const newSet = new Set(prev)
      changes.forEach((change) => {
        if(change.type === 'select'){
          if(change.selected){
            newSet.add(change.id)
          }else{
            newSet.delete(change.id)
          }
        }
      })
      return Array.from(newSet)
    })
  },[onEdgesChange])

  // Functionality for Delete a Node using delete or backspace keys implements multinode deletion also
  useEffect(() => {
    const handleKeyDown = (e) => {
      if(e.key === 'Delete' || e.key === 'Backspace'){ 
        if(selectedNodes.length > 0){
          setNodes((nodes) => nodes.filter((node) => !selectedNodes.includes(node.id)))
          setEdges((edges) => 
            edges.filter((edge) => !selectedNodes.includes(edge.source) && !selectedNodes.includes(edge.target))
          )
          setSelectedNodes([])
        }
        if(selectedEdges.length > 0){
          setEdges((edges) => 
          edges.filter((edge) => !selectedEdges.includes(edge.id)))
          setSelectedEdges([])
        }
      }
    }
    window.addEventListener('keydown',handleKeyDown)
    return () => window.removeEventListener('keydown',handleKeyDown)
  },[selectedNodes, selectedEdges, setNodes, setEdges])


  //Functionality for autolayout
  const handleAutoLayout = useCallback(() => {
    const {nodes: layoutNodes, edges: layoutEdges} = AutoLayout(nodes, edges)
    setNodes(layoutNodes)
    setEdges(layoutEdges)
    setTimeout(() => {
      if(reactFlowInstance){
        reactFlowInstance.fitView({padding: 0.1})
      }
    },100)
  },[nodes, edges, setNodes, setEdges, reactFlowInstance])

  return (
    <div className="App">
      {/* Wrap reactflow components using ReacFlowProvider */}
      <ReactFlowProvider>
        <ControlPanel onAddNode={() => setDialogOpen(true)} onAutoLayout={handleAutoLayout}/>
        <div className="flow-container">

          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={handleNodesChange} 
            onEdgesChange={handleEdgesChange}
            onConnect={onConnect}
            fitView
            onInit={setReactFlowInstance}
            defaultEdgeOptions={{
              animated: true,
              style: {stroke: '#3b82f6', strokeWidth: 2},
              markerEnd:{
                type: MarkerType.ArrowClosed,
                color: '#3b82f6'
              }
            }}
          >
            <MiniMap nodeColor={(node) => {
              return '#3b82f6'
            }} className="minimap"/>
          </ReactFlow>
        </div>
        <div className="json-preview-validation-container">
          <div className="popup-wrapper">
            <button className="btn json-preview" onClick={() => setShowJsonPreview(prev => !prev)}>JSON Preview</button>
            {showJsonPreview && <JsonPreviewPanel nodes={nodes} edges={edges} />}
          </div>
          <ValidationPanel 
            validation={validation}
            nodeCount={nodes.length}
            edgeCount={edges.length}
          />
        </div>
        {isDialogOpen && 
          <NodeDialog
            isOpen={isDialogOpen}
            onClose={() => setDialogOpen(false)}
            onAddNode={onAddNode}
          />
        }
      </ReactFlowProvider>
    </div>
  );
}

export default App
