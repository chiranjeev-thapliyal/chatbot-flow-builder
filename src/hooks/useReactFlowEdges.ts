import { useCallback, useState } from "react";
import {
  addEdge,
  applyEdgeChanges,
  Edge,
  OnConnect,
  OnEdgesChange,
} from "reactflow";

const useReactFlowEdges = (
  initialEdges: Edge[],
  setError: (error: string) => void
) => {
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((prevEdges) => applyEdgeChanges(changes, prevEdges)),
    []
  );

  const onConnect: OnConnect = useCallback(
    (params) => {
      // Check if this source is already connected to a target
      const sourceEdge = edges.filter((edge) => edge.source == params.source);

      if (sourceEdge.length > 0) {
        setError("This source is already connected to a target");
        return;
      }

      setEdges((prevEdges) => addEdge(params, prevEdges));
    },
    [edges, setError]
  );

  return { edges, setEdges, onEdgesChange, onConnect };
};

export default useReactFlowEdges;
