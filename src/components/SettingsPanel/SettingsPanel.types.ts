import { ChangeEvent } from "react";
import { Node } from "reactflow";

interface SettingsPanelProps {
  node: Node;
  handleNodeLabelChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleBackAction: () => void;
}

export default SettingsPanelProps;
