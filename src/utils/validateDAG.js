const validateDAG = (nodes, edges) => {

    //Functionality for detecting a cycle in pipeline
    const hasCycle = (nodes, edges) => {
        const graph = {}
        const visited = new Set()
        const inStack = new Set()

        nodes.forEach((node) => {
            graph[node.id] = []
        })

        edges.forEach((edge) => {
            if(graph[edge.source]){
                graph[edge.source].push(edge.target)
            }
        })

        //DFS logic 
        const dfs = (nodeId) => {
            visited.add(nodeId)
            inStack.add(nodeId)

            for(const neighbor of graph[nodeId]){
                if(!visited.has(neighbor)){
                    if(dfs(neighbor)) return true
                }else if(inStack.has(neighbor)){
                    return true //cycle found
                }
            }

            inStack.delete(nodeId)
            return false
        }

        for(const node of nodes){
            if(!visited.has(node.id)){
                if(dfs(node.id)) return true
            }
        }
        return false
    }


    const errors = []
    const warnings = []

    //minimum two nodes check
    if(nodes.length < 2){
        errors.push('At least 2 nodes are required for a valid pipeline')
    }

    //check for unconnected nodes
    const connectedNodeIds = new Set()
    edges.forEach((edge) => {
        connectedNodeIds.add(edge.source)
        connectedNodeIds.add(edge.target)
    })

    const unconnectedNodes = nodes.filter(node => !connectedNodeIds.has(node.id))
    if(unconnectedNodes.length > 0){
        errors.push(`${unconnectedNodes.length} nodes are not connected to any edge`)
    }

    //cycle detection
    if(hasCycle(nodes, edges)){
        errors.push('Cyclic dependencies detected - DAG must not contain cycles')
    }

    if(nodes.length > 10){
        warnings.push('Large - pipeline consider breaking into smaller modules')
    }

    if(edges.length === 0 && nodes.length > 0){
        warnings.push('No connection between nodes')
    }

    const isValid = errors.length === 0

    return {isValid, errors, warnings}
} 

export default validateDAG