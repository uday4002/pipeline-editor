import dagre from 'dagre'

const nodeWidth = 180
const nodeHeight = 100

const AutoLayout = (nodes, edges) => {
    const dagreGraph = new dagre.graphlib.Graph()
    dagreGraph.setDefaultEdgeLabel(() => ({}))

    dagreGraph.setGraph({
        rankdir: 'TB',
        nodesep: 30,
        ranksep: 50,
        marginx: 20,
        marginy: 20,
    })

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, {width: nodeWidth, height: nodeHeight})
    })

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target)
    })

    dagre.layout(dagreGraph)

    const layoutNodes = nodes.map((node) => {
        const pos = dagreGraph.node(node.id)
        return{
            ...node,
            position:{
                x: pos.x - nodeWidth/2,
                y: pos.y - nodeHeight/2,
            }
        }
    })
    return {nodes: layoutNodes, edges}
}

export default AutoLayout