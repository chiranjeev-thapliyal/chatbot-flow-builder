import { Handle, Position } from "reactflow"

function TextNode() {
    return <div>
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
        <div className="top-bar">
            <div>Send Message</div>
        </div>
        <div className="message-card">
            <div>text message 1</div>
        </div>
    </div>
}

export default TextNode