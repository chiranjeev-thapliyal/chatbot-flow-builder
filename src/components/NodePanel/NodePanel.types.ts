interface NodeType {
  type: string;
  label: string;
}

interface NodePanelProps {
  nodeTypes: NodeType[];
}

export default NodePanelProps;
