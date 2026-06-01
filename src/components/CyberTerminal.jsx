import React, { useState, useEffect, useRef } from 'react';

const CyberTerminal = () => {
  const [history, setHistory] = useState([
    { text: 'DS SECURE LOGIN SYSTEM v1.0.7...', type: 'info' },
    { text: 'ACCESS PASS LEVEL: 5 (TOP SECRET)', type: 'info' },
    { text: 'Type "help" to view available systems commands or click the tags below.', type: 'info' },
  ]);
  const [input, setInput] = useState('');
  const terminalEndRef = useRef(null);

  const commands = {
    help: 'Available Commands: \n  - about: System bio info\n  - skills: Tech stack clearance logs\n  - projects: List project files\n  - clearance: Access authorization status\n  - secret: Top-secret operational data\n  - clear: Purge system visual buffer',
    about: 'Name: Dhanush Siddilingam\nRole: AI Developer & SaaS Builder\nMission: Build production-ready AI infrastructure and scale robust MVPs.\nLocation: Sri Venkateswara College of Engineering (B.Tech ECE)',
    skills: 'LOGGING CORE COMPETENCIES:\n  - Language: Python, JavaScript, SQL\n  - AI Core: OpenAI API, LangChain, AI Memory Graph SDKs\n  - Backend: FastAPI, Supabase, PostgreSQL, Node.js\n  - Frontend: React, Tailwind CSS, Vite, Three.js',
    projects: 'PROJECT MANIFEST:\n  - [LIVE] AI Memory SDK: https://ai-memorysdk.netlify.app/\n  - [DEV]  Vital: Sleeping companion & coach\n  - [DEV]  Stira, Aria, Unscrollr, Secure Vision (Coming Soon)',
    clearance: 'STATUS: AUTHORIZED\nNAME: DHANUSH SIDDILINGAM\nID: DS-792-LEVEL5\nDEPT: FULL-STACK AI DEVS\nACCESS GRANTED TO ALL SYSTEMS.',
    secret: '⚠️ DECRYPTING OPERATIONAL ARCHIVES // CLASSIFIED:\nProject "Vital" - Sleep intelligence coach using edge AI heuristics.\nCore: Real-time biometric analysis & dynamic cognitive behavioral advice.\nLaunch Status: Beta simulation running.',
  };

  const handleCommand = (cmdText) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    let newOutput = '';
    if (trimmed === 'clear') {
      setHistory([]);
      return;
    } else if (commands[trimmed]) {
      newOutput = commands[trimmed];
    } else {
      newOutput = `Unknown command: "${trimmed}". Type "help" to list valid systems commands.`;
    }

    setHistory((prev) => [
      ...prev,
      { text: `visitor@ds-terminal:~# ${cmdText}`, type: 'command' },
      { text: newOutput, type: 'response' },
    ]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="w-full max-w-2xl rounded-xl border border-violet-500/30 bg-[#080414]/90 backdrop-blur-md shadow-[0_0_35px_-5px_rgba(139,92,246,0.25)] overflow-hidden font-mono text-sm text-slate-300">
      {/* Terminal Title Bar */}
      <div className="bg-[#120a2e] px-4 py-3 flex items-center justify-between border-b border-violet-500/20">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
          <span className="text-xs font-semibold tracking-wider text-violet-300 ml-2">DHANUSH_SYSTEM_CORE.sh</span>
        </div>
        <div className="text-[10px] text-violet-400 bg-violet-950/50 px-2 py-0.5 rounded border border-violet-500/30">
          SECURE SHELL v1.0
        </div>
      </div>

      {/* Quick Tags / Hotkeys */}
      <div className="bg-[#0f0826] px-4 py-2 border-b border-violet-500/10 flex flex-wrap gap-2 items-center">
        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Quick Commands:</span>
        {Object.keys(commands).map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="text-xs px-2 py-0.5 rounded bg-violet-900/30 hover:bg-violet-900/60 border border-violet-500/20 hover:border-violet-400/40 text-violet-300 transition-all"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal Logs Window */}
      <div className="p-4 h-64 overflow-y-auto space-y-2 flex flex-col scrollbar-thin scrollbar-thumb-violet-900/50">
        {history.map((log, index) => (
          <div
            key={index}
            className={`whitespace-pre-wrap leading-relaxed ${
              log.type === 'command'
                ? 'text-violet-400 font-bold'
                : log.type === 'response'
                ? 'text-slate-300 border-l border-violet-900/40 pl-2'
                : 'text-emerald-400'
            }`}
          >
            {log.text}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Input Line */}
      <form onSubmit={onSubmit} className="bg-[#0f0826] px-4 py-3 border-t border-violet-500/20 flex items-center gap-2">
        <span className="text-violet-400 font-bold">visitor@ds-terminal:~#</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type help or operational commands..."
          className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-slate-200 placeholder-slate-600 font-mono"
          autoFocus
        />
        <button type="submit" className="text-xs px-3 py-1 bg-violet-600 hover:bg-violet-500 text-white rounded font-bold transition-all">
          RUN
        </button>
      </form>
    </div>
  );
};

export default CyberTerminal;
