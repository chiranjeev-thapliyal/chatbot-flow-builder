import { useCallback, useMemo, useState } from 'react';
import ReactFlow, { Controls, Background, applyNodeChanges, applyEdgeChanges, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import TextNode from './components/TextNode/TextNode';
import NodePanel from './components/NodePanel/NodePanel';
import './App.css'

const initialNodes = [
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

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
// const initialEdges = [];

const allNodeTypes = [
  { type: 'textNode', label: 'Message' }
]

let id = 0;
const getId = () => `dndnode_${id++}`;

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);


  const onNodesChange = useCallback((changes) => setNodes((prevNodes) => applyNodeChanges(changes, prevNodes)), []);
  const onEdgesChange = useCallback(
    (changes) => setEdges((prevEdges) => applyEdgeChanges(changes, prevEdges)),
    [],
  );

  const onConnect = useCallback((params) => setEdges((prevEdges) => addEdge(params, prevEdges)), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
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

  const nodeTypes = useMemo(() => ({ textNode: TextNode }), []);

  return (
    <div className='container'>
      <div className='navbar'>
        <button className='navbar-button'>Save Changes</button>
      </div>
      <div className='main' style={{ height: "100%" }}>
        <div className="panel">
          <NodePanel nodeTypes={allNodeTypes} />
        </div>
        <div className="flow">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
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
