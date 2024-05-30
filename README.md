# Chatbot Flow Builder

Deployed Here: [Chatbot Flow Builder](https://chatbot-flow-builder-4-git-bc3451-chiranjeevthapliyals-projects.vercel.app/)

## Folder Structure
   - __public__
     - __icons__
       - [whatsapp.png](public/icons/whatsapp.png)
   - __src__
     - [App.css](src/App.css)
     - [App.tsx](src/App.tsx)
     - __components__
       - __NodePanel__
         - [NodePanel.css](src/components/NodePanel/NodePanel.css)
         - [NodePanel.types.ts](src/components/NodePanel/NodePanel.types.ts)
         - [index.tsx](src/components/NodePanel/index.tsx)
       - __SettingsPanel__
         - [SettingsPanel.css](src/components/SettingsPanel/SettingsPanel.css)
         - [SettingsPanel.types.ts](src/components/SettingsPanel/SettingsPanel.types.ts)
         - [index.tsx](src/components/SettingsPanel/index.tsx)
       - __TextNode__
         - [TextNode.css](src/components/TextNode/TextNode.css)
         - [index.tsx](src/components/TextNode/index.tsx)
     - __hooks__
       - [useDragAndDrop.ts](src/hooks/useDragAndDrop.ts)
       - [useNodeSelection.ts](src/hooks/useNodeSelection.ts)
       - [useReactFlowEdges.ts](src/hooks/useReactFlowEdges.ts)
       - [useReactFlowNodes.ts](src/hooks/useReactFlowNodes.ts)
     - [index.css](src/index.css)
     - [main.tsx](src/main.tsx)
     - __utils__
       - [helper.ts](src/utils/helper.ts)



## Features:
#### 1. Text Node
a. Our flow builder currently supports only one type of message (i.e Text
Message).
b. There can be multiple Text Nodes in one flow.
c. Nodes are added to the flow by dragging and dropping a Node from the
Nodes Panel.
#### 2. Nodes Panel
a. This panel houses all kind of Nodes that our Flow Builder supports.
b. Right now there is only Message Node, but we’d be adding more types
of Nodes in the future so make this section extensible
#### 3. Edge
a. Connects two Nodes together
#### 4. Source Handle
a. Source of a connecting edge
b. Can only have one edge originating from a source handle
#### 5. Target Handle
a. Target of a connecting edge
b. Can have more than one edge connecting to a target handle
#### 6. Settings Panel
1. Settings Panel will replace the Nodes Panel when a Node is selected
2. It has a text field to edit text of the selected Text Node
3. Save Button
a. Button to save the flow
b. Save button press will show an error if there are more than one Nodes
and more than one Node has empty target handles