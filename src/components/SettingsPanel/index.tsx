import SettingsPanelProps from "./SettingsPanel.types";
import './SettingsPanel.css'

function SettingsPanel({ node, handleNodeLabelChange, handleBackAction }: SettingsPanelProps) {
    return <div className="settings-panel">
        <div className="settings-header">
            <i onClick={handleBackAction} className="settings-icon bi bi-arrow-left"></i>
            <span>Message</span>
            <span></span>
        </div>
        <div className="settings-main">
            <span>Text</span>
            <textarea
                value={node.data.label}
                onChange={handleNodeLabelChange}
            />
        </div>
    </div>
}

export default SettingsPanel;