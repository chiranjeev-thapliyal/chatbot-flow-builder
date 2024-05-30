import { DragEvent } from 'react';
import './NodePanel.css'
import NodePanelProps from './NodePanel.types';

const NodePanel = ({ nodeTypes }: NodePanelProps) => {
    const onDragStart = (event: DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return <aside className='panel-wrapper'>
        {
            nodeTypes.map((node) => (
                <div
                    className={`dndnode ${node.type}`}
                    key={node.label}
                    onDragStart={(event) => onDragStart(event, node.type)}
                    draggable
                >
                    <i className='dndnode-icon bi bi-chat-text' />
                    <span className='dndnode-label'>{node.label}</span>
                </div>
            ))
        }
    </aside>
}

export default NodePanel;