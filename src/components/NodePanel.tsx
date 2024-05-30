interface NodePanelProps {
    nodeTypes: { type: string, label: string }[];
}

const NodePanel = ({ nodeTypes }: NodePanelProps) => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return <aside>
        {
            nodeTypes.map((node) => (
                <div className="dndnode input"
                    key={node.label}
                    onDragStart={(event) => onDragStart(event, node.type)}
                    draggable>
                    {node.label}
                </div>
            ))
        }
    </aside>
}

export default NodePanel;