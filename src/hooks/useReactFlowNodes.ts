import { useCallback, useState } from "react";
import { Node, applyNodeChanges, NodeChange, OnNodesChange } from "reactflow";

const useReactFlowNodes = (initialNodes: Node[]) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);

  const onNodesChange: OnNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((prevNodes) => applyNodeChanges(changes, prevNodes)),
    []
  );

  return { nodes, setNodes, onNodesChange };
};

export default useReactFlowNodes;
