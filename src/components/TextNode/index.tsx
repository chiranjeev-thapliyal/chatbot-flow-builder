import { Handle, NodeProps, Position } from "reactflow"
import './TextNode.css'

function TextNode({ data }: NodeProps) {
    return <div className="text-node-wrapper">
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
        <div className="top-bar">
            <div className="top-bar-type">
                <i className='bi bi-chat-text' />
                <span className="top-bar-type-title">Send Message</span>
            </div>
            <img src="icons/whatsapp.png" />
        </div>
        <div className="message-card">
            <span>{data.label}</span>
        </div>
    </div>
}

export default TextNode