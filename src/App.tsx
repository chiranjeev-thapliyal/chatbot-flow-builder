import { ChangeEvent, DragEvent, useCallback, useMemo, useState } from 'react';
import ReactFlow, { Controls, Background, applyNodeChanges, applyEdgeChanges, addEdge, OnNodesChange, OnEdgesChange, OnConnect, Node, Edge, ReactFlowInstance, NodeChange, NodeMouseHandler } from 'reactflow';
import 'reactflow/dist/style.css';
import TextNode from './components/TextNode/TextNode';
import NodePanel from './components/NodePanel/NodePanel';
import './App.css'
import SettingsPanel from './components/SettingsPanel';

const initialNodes: Node[] = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'text message 1' },
    type: 'textNode',
  },
  {
    id: '2',
    position: { x: 100, y: 100 },
    data: { label: 'text message 2' },
    type: 'textNode'
  },
];

const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

const allNodeTypes = [
  { type: 'textNode', label: 'Message' }
]

let id = 0;
const getId = () => `dndnode_${id++}`;

function App() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const onNodesChange: OnNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((prevNodes) => applyNodeChanges(changes, prevNodes)),
    []
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((prevEdges) => applyEdgeChanges(changes, prevEdges)),
    [],
  );

  const onConnect: OnConnect = useCallback((params) => {
    // Check if this source is already connected to a target
    const sourceEdge = edges.filter((edge) => edge.source == params.source)

    if (sourceEdge.length > 0) {
      alert("This source is already connected to a target")
      return;
    }

    setEdges((prevEdges) => addEdge(params, prevEdges))
  }, [edges]);

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      if (!reactFlowInstance) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((prevNodes) => prevNodes.concat(newNode));
    },
    [reactFlowInstance],
  );

  const handleNodeLabelChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === selectedNodeId ? { ...node, data: { ...node.data, label: value } } : node
      )
    );
  }, [selectedNodeId]);

  const handleBackAction = useCallback(() => {
    setSelectedNodeId(null);
  }, [])

  const onNodeClick: NodeMouseHandler = useCallback((_, node) => setSelectedNodeId(node.id), [])

  const selectedNode = nodes.find(node => node.id === selectedNodeId);
  const nodeTypes = useMemo(() => ({ textNode: TextNode }), []);

  return (
    <div className='container'>
      <div className='navbar'>
        <button className='navbar-button'>Save Changes</button>
      </div>
      <div className='main' style={{ height: "100%" }}>
        <div className="panel">
          {
            selectedNode ? <SettingsPanel node={selectedNode} handleNodeLabelChange={handleNodeLabelChange} handleBackAction={handleBackAction} /> : <NodePanel nodeTypes={allNodeTypes} />
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
