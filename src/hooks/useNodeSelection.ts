import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { Node, NodeMouseHandler } from "reactflow";

const useNodeSelection = (
  nodes: Node[],
  setNodes: Dispatch<SetStateAction<Node[]>>
) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // SelectedNode for editing
  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  const handleNodeLabelChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === selectedNodeId
            ? { ...node, data: { ...node.data, label: value } }
            : node
        )
      );
    },
    [selectedNodeId, setNodes]
  );

  const handleBackAction = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  const onNodeClick: NodeMouseHandler = useCallback(
    (_, node) => setSelectedNodeId(node.id),
    []
  );

  return {
    selectedNodeId,
    setSelectedNodeId,
    selectedNode,
    handleNodeLabelChange,
    handleBackAction,
    onNodeClick,
  };
};

export default useNodeSelection;
