import React, { useCallback } from "react";
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  FitView,
  Edge
} from "reactflow";
import {
  FiBox,
  FiCreditCard,
  FiHome,
  FiUser,
  FiUserCheck,
  FiUserMinus,
  FiUserPlus
} from "react-icons/fi";

import "reactflow/dist/base.css";
import "./index.css";
import TurboNode, { TurboNodeData } from "./TurboNode.tsx";
import TurboEdge from "./TurboEdge.tsx";

const proOptions = { hideAttribution: true };

const initialNodes: Node<TurboNodeData>[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: {
      icon: <FiUser />,
      title: "Client",
      subline: "Requests a new card"
    },
    type: "turbo"
  },
  {
    id: "2",
    position: { x: 250, y: 0 },
    data: {
      icon: <FiHome />,
      title: "Financial Institution",
      subline: "Check if Client Exists"
    },
    type: "turbo"
  },
  {
    id: "3",
    position: { x: 600, y: -100 },
    data: {
      icon: <FiUserCheck />,
      title: "Client Exists",
      subline: ""
    },
    type: "turbo"
  },
  {
    id: "4",
    position: { x: 600, y: 100 },
    data: {
      icon: <FiUserMinus />,
      title: "Client Doesn't Exist",
      subline: ""
    },
    type: "turbo"
  },
  {
    id: "5",
    position: { x: 900, y: 100 },
    data: {
      icon: <FiUserPlus />,
      title: "Create New Client",
      subline: "Client Create API"
    },
    type: "turbo"
  },
  {
    id: "6",
    position: { x: 1250, y: 0 },
    data: {
      icon: <FiBox />,
      title: "Create new account",
      subline: "Account Create API"
    },
    type: "turbo"
  },
  {
    id: "7",
    position: { x: 1600, y: 0 },
    data: {
      icon: <FiCreditCard />,
      title: "Create New Card",
      subline: "Card Create API"
    },
    type: "turbo"
  }
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true
  },
  {
    id: "e2-4",
    source: "2",
    target: "4",
    animated: true
  },
  {
    id: "e3-6",
    source: "3",
    target: "6",
    animated: true
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    animated: true
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
    animated: true
  },
  {
    id: "e6-7",
    source: "6",
    target: "7",
    animated: true
  }
];

const nodeTypes = {
  turbo: TurboNode
};

const edgeTypes = {
  turbo: TurboEdge
};

const defaultEdgeOptions = {
  type: "turbo",
  markerEnd: "edge-circle"
};

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
      proOptions={proOptions}
    >
      <Controls showInteractive={false} />
      <svg>
        <defs>
          <linearGradient id="edge-gradient">
            <stop offset="0%" stopColor="#ae53ba" />
            <stop offset="100%" stopColor="#2a8af6" />
          </linearGradient>

          <marker
            id="edge-circle"
            viewBox="-5 -5 10 10"
            refX="0"
            refY="0"
            markerUnits="strokeWidth"
            markerWidth="10"
            markerHeight="10"
            orient="auto"
          >
            <circle stroke="#2a8af6" strokeOpacity="0.75" r="2" cx="0" cy="0" />
          </marker>
        </defs>
      </svg>
    </ReactFlow>
  );
};

export default Flow;
