import React, { useRef, useEffect, useState } from 'react';

const nodesData = [
  { id: 1, label: 'Long-term AI Memory', desc: 'Designing persistence loops, memory graphs, and recall mechanisms for agents.', color: '#00ffd0' },
  { id: 2, label: 'FastAPI Backend', desc: 'Building secure, high-throughput backend APIs with robust validations.', color: '#8b5cf6' },
  { id: 3, label: 'SaaS Multi-tenancy', desc: 'Designing DB schemas, subscription flows, and tenant isolation.', color: '#a78bfa' },
  { id: 4, label: 'Vector Databases', desc: 'Managing PostgreSQL with pgvector, vector searches, and indices.', color: '#00ffd0' },
  { id: 5, label: 'Agentic Workflows', desc: 'Creating autonomous looping tasks with tool calling & self-correction.', color: '#8b5cf6' },
  { id: 6, label: 'LLM Orchestration', desc: 'Fine-tuning prompt structures, model selection, and prompt engineering.', color: '#a78bfa' },
];

const MemoryGraph = () => {
  const canvasRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(nodesData[0]);
  const nodesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Make canvas responsive
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth || 600;
      canvas.height = 320;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize nodes
    nodesRef.current = nodesData.map((node, i) => ({
      ...node,
      x: Math.random() * (canvas.width - 100) + 50,
      y: Math.random() * (canvas.height - 100) + 50,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      radius: i === 0 ? 30 : 25,
      pulse: Math.random() * Math.PI,
    }));

    let animationId;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;

      // Draw connections/edges
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.15;
            ctx.strokeStyle = `rgba(167, 139, 250, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Update & Draw nodes
      nodes.forEach((node) => {
        // Move
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.02;

        // Pulse size
        const currentRadius = node.radius + Math.sin(node.pulse) * 2;

        // Bounce walls
        if (node.x - currentRadius < 0 || node.x + currentRadius > canvas.width) node.vx *= -1;
        if (node.y - currentRadius < 0 || node.y + currentRadius > canvas.height) node.vy *= -1;

        // Hover glowing shadow
        ctx.shadowColor = node.color;
        ctx.shadowBlur = selectedNode?.id === node.id ? 20 : 6;

        // Outer glow circle
        ctx.fillStyle = selectedNode?.id === node.id ? 'rgba(0, 255, 208, 0.15)' : 'rgba(139, 92, 246, 0.05)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius + 8, 0, Math.PI * 2);
        ctx.fill();

        // Node circle
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        // Reset shadow
        ctx.shadowBlur = 0;

        // Label
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(node.label.split(' ')[0], node.x, node.y + 4);
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    // Mouse click handling
    const handleCanvasClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      nodesRef.current.forEach((node) => {
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < node.radius + 15) {
          setSelectedNode(node);
        }
      });
    };

    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
      if (canvas) canvas.removeEventListener('click', handleCanvasClick);
    };
  }, [selectedNode]);

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 items-center p-6 rounded-2xl border border-violet-500/20 bg-[#0c0620]/60 backdrop-blur-md">
      <div className="flex-1 w-full min-h-[320px] bg-[#070313] rounded-xl overflow-hidden border border-violet-500/10 relative">
        <div className="absolute top-3 left-4 text-xs font-mono text-slate-500">AI_PERSISTENT_MEMORY_GRAPH.log</div>
        <canvas ref={canvasRef} className="block w-full h-[320px] cursor-pointer" />
      </div>

      <div className="w-full md:w-80 flex flex-col gap-4 text-left">
        <div className="text-xs font-bold uppercase tracking-wider text-violet-400 font-mono">SELECTED CORE MEMORY NODE:</div>
        <div className="p-4 rounded-xl bg-violet-950/20 border border-violet-500/20">
          <div className="text-lg font-bold font-moderniz text-[#00ffd0] mb-2">{selectedNode.label}</div>
          <p className="text-sm text-slate-300 leading-relaxed font-mono">{selectedNode.desc}</p>
        </div>
        <div className="text-[10px] text-slate-500 font-mono italic">
          * Click any moving node on the graph network map to retrieve details from Dhanush's active skill registry.
        </div>
      </div>
    </div>
  );
};

export default MemoryGraph;
