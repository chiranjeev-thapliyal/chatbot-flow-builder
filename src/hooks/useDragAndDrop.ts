import { Dispatch, DragEvent, SetStateAction, useCallback } from "react";
import { Node, ReactFlowInstance } from "reactflow";
import { getId } from "../utils/helper";

const useDragAndDrop = (
  reactFlowInstance: ReactFlowInstance | null,
  setNodes: Dispatch<SetStateAction<Node[]>>
) => {
  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      if (!reactFlowInstance) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { label: "Enter a message" },
      };

      setNodes((prevNodes) => [...prevNodes, newNode]);
    },
    [reactFlowInstance, setNodes]
  );

  return { onDragOver, onDrop };
};

export default useDragAndDrop;
