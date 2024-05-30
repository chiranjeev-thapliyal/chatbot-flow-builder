import { FunctionComponent, useMemo, useState } from 'react';
import ReactFlow, { Controls, Background, Node, Edge, ReactFlowInstance, NodeProps } from 'reactflow';

import TextNode from './components/TextNode';
import NodePanel from './components/NodePanel';
import SettingsPanel from './components/SettingsPanel';

import 'reactflow/dist/style.css';
import './App.css'

import useReactFlowNodes from './hooks/useReactFlowNodes';
import useReactFlowEdges from './hooks/useReactFlowEdges';
import useNodeSelection from './hooks/useNodeSelection';
import useDragAndDrop from './hooks/useDragAndDrop';

// Initial Nodes for sample
const initialNodes: Node[] = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'text message 1' }, type: 'textNode' },
  { id: '2', position: { x: 100, y: 100 }, data: { label: 'text message 2' }, type: 'textNode' },
];

// Initial Edges for sample
const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

// Extensible Node Types 
const additionalNodeTypes = [
  { type: 'textNode', label: 'Message', component: TextNode }
]

function App() {
  const [error, setError] = useState("");
  const { nodes, setNodes, onNodesChange } = useReactFlowNodes(initialNodes);
  const { edges, onConnect, onEdgesChange } = useReactFlowEdges(initialEdges, setError);
  const { selectedNode, handleNodeLabelChange, onNodeClick, handleBackAction } = useNodeSelection(nodes, setNodes);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const { onDrop, onDragOver } = useDragAndDrop(reactFlowInstance, setNodes);

  // Registering new node types to react-flow (making extensible)
  const nodeTypes = useMemo(() => {
    const types: Record<string, FunctionComponent<NodeProps>> = {};

    additionalNodeTypes.forEach(({ type, component }) => {
      types[type] = component
    })

    return types;
  }, []);

  const handleSave = () => {
    const edgesWithTarget = edges.map(edge => edge.target);
    const nodesWithoutEdge = nodes.filter(node => !edgesWithTarget.includes(node.id));

    if (nodesWithoutEdge.length > 1) {
      setError("Cannot save flow");
    }
  }

  return (
    <div className='container'>
      <div className='navbar'>
        {
          error.trim().length > 0 && <div className='navbar-error'>{error}</div>
        }
        <button onClick={handleSave} className='navbar-button'>Save Changes</button>
      </div>
      <div className='main' style={{ height: "100%" }}>
        <div className="panel">
          {
            selectedNode ? <SettingsPanel node={selectedNode} handleNodeLabelChange={handleNodeLabelChange} handleBackAction={handleBackAction} /> : <NodePanel nodeTypes={additionalNodeTypes} />
          }
        </div>
        <div className="flow">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onNodeClick={onNodeClick}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export default App;
