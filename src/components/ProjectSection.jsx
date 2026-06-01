// src/components/ProjectSection.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
  FaExternalLinkAlt, FaReact, FaNodeJs, FaHtml5, FaCss3Alt,
  FaJsSquare, FaTools, FaFigma, FaGithub, FaTimes, FaDownload
} from 'react-icons/fa';
import {
  SiTailwindcss, SiNextdotjs, SiVercel, SiMongodb,
  SiExpress, SiPostgresql
} from 'react-icons/si';
import { PiCodeBold } from "react-icons/pi";
import { LuBadge } from "react-icons/lu";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { useNavbar } from '../contexts/NavbarContext';
import { supabase } from '../lib/supabase';

// ===================================
// DATA PROYEK (FALLBACK - will be replaced by Dhanush's data)
// ===================================
const dummyProjects = [
  {
    title: "AI Memory SDK",
    description: "Production-grade memory infrastructure designed to inject dynamic, long-term memory capabilities into AI applications, featuring FastAPI, PostgreSQL, Supabase, JWT, and context engineering loops.",
    tech: ["Python", "FastAPI", "PostgreSQL", "Supabase"],
    link: "https://ai-memorysdk.netlify.app/",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop",
    category: "Web/Apps",
    status: "Live"
  },
  {
    title: "Aria — AI Productivity Platform",
    description: "An intelligent task management and productivity application focused on helping users organize work, manage tasks, and improve daily execution through an AI-enhanced mobile experience.",
    tech: ["React", "TailwindCSS", "Node.js", "MongoDB"],
    link: "#",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop",
    category: "Web/Apps",
    status: "Under Development"
  },
  {
    title: "Stira — Behavioral Intelligence",
    description: "A data-driven platform designed to analyze behavioral patterns, user actions, habits, and interaction data to generate meaningful, personalized recommendations.",
    tech: ["Python", "FastAPI", "PostgreSQL", "Supabase"],
    link: "#",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    category: "Web/Apps",
    status: "Under Development"
  },
  {
    title: "Unscrollr — Digital Wellbeing",
    description: "A mobile application designed to help users reduce excessive social media consumption and regain control over their attention, habits, and daily digital routines.",
    tech: ["React", "TailwindCSS", "Node.js"],
    link: "#",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
    category: "Web/Apps",
    status: "Under Development"
  },
  {
    title: "SecureVision — Security & Monitoring",
    description: "A surveillance and monitoring platform focused on secure backend workflows, intelligent observation, and security-focused systems.",
    tech: ["FastAPI", "React", "PostgreSQL", "Python"],
    link: "#",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2069&auto=format&fit=crop",
    category: "Web/Apps",
    status: "Under Development"
  },
  {
    title: "Vital — Sleep Companion",
    description: "A sleep monitoring companion and coach designed to analyze sleep cycles, offer behavioral coaching, and support digital wellbeing.",
    tech: ["React Native", "TailwindCSS", "Node.js"],
    link: "#",
    image: "https://images.unsplash.com/photo-1511295742364-92767fa62d9f?q=80&w=2070&auto=format&fit=crop",
    category: "Web/Apps",
    status: "Coming Soon"
  }
];

// ===================================
// DATA SERTIFIKAT DHANUSH SIDDILINGAM
// ===================================
const userCertificates = [
  {
    title: "Microsoft Azure AI Internship",
    issuer: "Microsoft & Edunet Foundation",
    date: "June 2025",
    link: "#",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Full Stack Development training",
    issuer: "KodNest",
    date: "Ongoing",
    link: "#",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
  }
];

const techStack = {
  languages: [
    { name: "Python", icon: "🐍" },
    { name: "Java", icon: "☕" },
    { name: "SQL", icon: "📊" },
    { name: "C Language", icon: "💻" }
  ],
  backend: [
    { name: "FastAPI", icon: "⚡" },
    { name: "REST APIs", icon: "🔌" },
    { name: "JWT Auth", icon: "🔑" },
    { name: "API Design", icon: "🛠️" }
  ],
  ai_interfaces: [
    { name: "Prompt Eng.", icon: "🤖" },
    { name: "LLM Workflows", icon: "⚙️" },
    { name: "AI Evaluation", icon: "📈" },
    { name: "Memory Systems", icon: "🧠" }
  ],
  database: [
    { name: "PostgreSQL", icon: <SiPostgresql className="text-[#336791]" /> },
    { name: "Supabase", icon: "🟢" }
  ],
  tools: [
    { name: "Git & GitHub", icon: <FaGithub className="dark:text-white text-slate-900" /> },
    { name: "Postman", icon: "🚀" },
    { name: "VS Code", icon: "📝" },
    { name: "SaaS Dev", icon: "💼" }
  ],
};

// ===================================
// HELPER & ANIMATION COMPONENTS
// ===================================
const LineShadowText = ({ children, className, shadowColor = "#4079ff", ...props }) => {
  return (
    <motion.span
      style={{ "--shadow-color": shadowColor }}
      className={`relative z-0 line-shadow-effect ${className}`}
      data-text={children}
      {...props}
    >
      {children}
    </motion.span>
  );
};

// ===================================
// KOMPONEN KARTU SERTIFIKAT
// ===================================
const CertificateCard = ({ cert, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative cursor-pointer"
      whileHover={{ y: -8 }}
      onClick={() => onClick(cert)}
    >
      <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden dark:shadow-lg shadow-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-violet-400/30 transition-all duration-500">
        <div className="absolute inset-0">
          <img src={cert.image} alt={cert.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-slate-900/30 group-hover:from-slate-900/95 transition-all duration-500"></div>
        </div>
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <div className="flex-1 flex items-start justify-between">
            <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              <span className="text-xs font-semibold text-violet-300 uppercase tracking-wider">{cert.issuer}</span>
            </div>
            <div className="bg-emerald-500/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-400/30">
              <span className="text-xs font-bold text-emerald-300">{cert.date}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white line-clamp-2 leading-tight">{cert.title}</h3>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-300">
                <FaDownload className="text-sm" />
                <span className="text-sm font-medium">View Certificate</span>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-violet-500/20 backdrop-blur-md p-2 rounded-full border border-violet-400/30">
                  <FaExternalLinkAlt className="text-violet-300 text-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/0 via-transparent to-emerald-500/0 group-hover:from-violet-500/10 group-hover:to-emerald-500/10 transition-all duration-500"></div>
      </div>
    </motion.div>
  );
};

// ===================================
// KOMPONEN PREVIEW MODAL PROYEK
// ===================================
const ProjectDetailModal = ({ project, onClose }) => {
  if (!project) return null;

  const techIcons = {
    "Next.js": <SiNextdotjs />, "React": <FaReact />, "TailwindCSS": <SiTailwindcss />,
    "Framer Motion": " गति ", "Node.js": <FaNodeJs />, "Express": <SiExpress />,
    "MongoDB": <SiMongodb />, "JWT": "🔑", "Figma": <FaFigma />, "Storybook": "📚",
    "JavaScript": <FaJsSquare />, "HTML5": <FaHtml5 />, "CSS3": <FaCss3Alt />,
    "PostgreSQL": <SiPostgresql />, "Vercel": <SiVercel />, "Git & GitHub": <FaGithub />
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative max-w-5xl w-full dark:bg-slate-900/90 bg-white/95 backdrop-blur-xl rounded-3xl border dark:border-white/10 border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-20">
          <button onClick={onClose} className="dark:bg-black/40 bg-slate-200/80 hover:bg-red-500/20 backdrop-blur-md p-3 rounded-full dark:border-white/10 border-slate-300 hover:border-red-500/30 transition-all duration-300 group">
            <FaTimes className="dark:text-white/70 text-slate-600 group-hover:text-red-500" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row h-full overflow-y-auto custom-scrollbar">
          {/* Image Section */}
          <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full">
            <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col">
            <div className="flex-1">
              {/* Status Badge */}
              {project.status && (
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border mb-4 font-bold uppercase tracking-wider ${
                  project.status === 'Live'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.1)]'
                    : project.status === 'Coming Soon'
                    ? 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${project.status === 'Live' ? 'bg-emerald-400 animate-ping' : project.status === 'Coming Soon' ? 'bg-purple-400' : 'bg-amber-400'}`}></span>
                  <span>{project.status}</span>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t, i) => (
                  <span key={i} className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-full dark:bg-violet-500/10 bg-violet-100 dark:text-violet-300 text-violet-700 dark:border-violet-500/20 border-violet-300">
                    {techIcons?.[t]} {t}
                  </span>
                ))}
              </div>

              <h2 className="text-3xl font-bold dark:text-white text-slate-900 mb-4 leading-tight">{project.title}</h2>
              <p className="dark:text-slate-300 text-slate-600 leading-relaxed mb-6 text-lg">{project.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-white/10">
              {project.status === 'Live' ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 dark:bg-gradient-to-r dark:from-violet-600 dark:to-emerald-600 dark:hover:from-violet-500 dark:hover:to-emerald-500 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-violet-500/30 hover:-translate-y-1"
                >
                  <FaExternalLinkAlt />
                  <span>Live Demo</span>
                </a>
              ) : (
                <div className="flex-1 flex items-center justify-center gap-2 px-6 py-4 dark:bg-slate-800/40 bg-slate-100 dark:text-slate-400 text-slate-500 font-bold rounded-xl border dark:border-slate-800 border-slate-200 cursor-not-allowed select-none">
                  <span>🛠️ {project.status || 'Under Development'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ===================================
// KOMPONEN KARTU PROYEK
// ===================================
const ProjectCard = ({ project, onClick }) => {
  const techIcons = {
    "Next.js": <SiNextdotjs />, "React": <FaReact />, "TailwindCSS": <SiTailwindcss />,
    "Framer Motion": " गति ", "Node.js": <FaNodeJs />, "Express": <SiExpress />,
    "MongoDB": <SiMongodb />, "JWT": "🔑", "Figma": <FaFigma />, "Storybook": "📚"
  };

  return (
    <div
      onClick={() => onClick(project)}
      className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden transition-all duration-300 dark:shadow-none shadow-lg hover:shadow-xl dark:hover:shadow-violet-500/30 hover:-translate-y-2 cursor-pointer"
      style={{ background: `url('${project.image}') center/cover no-repeat` }}
    >
      <div className="absolute inset-0 dark:bg-black/60 bg-slate-900/70 dark:group-hover:bg-black/40 group-hover:bg-slate-900/50 transition-colors duration-500"></div>

      <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-100 transition-opacity duration-300">
        <div className="translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-bold text-white dark:group-hover:text-violet-300 group-hover:text-violet-400 transition-colors">{project.title}</h3>
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
              <FaExternalLinkAlt className="text-white" />
            </div>
          </div>
          <p className="text-slate-200 dark:text-slate-300 mt-2 text-sm line-clamp-2 leading-relaxed opacity-90 group-hover:opacity-100">{project.description}</p>
        </div>

        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 3).map((t, i) => (
              <span key={i} className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full bg-violet-500/20 text-violet-200 border border-violet-400/20 backdrop-blur-sm">
                {techIcons?.[t] || t}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                +{project.tech.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-violet-400/50 transition-colors duration-300 pointer-events-none"></div>
    </div>
  );
};

// ===================================
// KOMPONEN PREVIEW MODAL SERTIFIKAT
// ===================================
const CertificatePreviewModal = ({ certificate, onClose }) => {
  if (!certificate) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative max-w-4xl w-full dark:bg-slate-900/90 bg-white/95 backdrop-blur-xl rounded-3xl border dark:border-white/10 border-slate-200 shadow-2xl overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-20">
          <button onClick={onClose} className="dark:bg-black/40 bg-slate-200/80 hover:bg-red-500/20 backdrop-blur-md p-2 rounded-full dark:border-white/10 border-slate-300 hover:border-red-500/30 transition-all duration-300 group">
            <FaTimes className="dark:text-white/70 text-slate-600 group-hover:text-red-500" />
          </button>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-3/5 relative min-h-[300px] md:min-h-[500px] bg-slate-900">
          <img src={certificate.image} alt={certificate.title} className="absolute inset-0 w-full h-full object-contain p-4 bg-slate-950/50" />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-2/5 p-8 flex flex-col justify-center dark:bg-slate-900/50 bg-white">
          <div className="mb-6">
            <div className="inline-block px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold tracking-wider mb-4">
              {certificate.issuer}
            </div>
            <h2 className="text-2xl font-bold dark:text-white text-slate-900 mb-2 leading-tight">{certificate.title}</h2>
            <p className="text-slate-400 font-mono text-sm">{certificate.date}</p>
          </div>

          <div className="space-y-4 mt-auto">
            <a
              href={certificate.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-violet-500/25 group"
            >
              <FaDownload className="group-hover:animate-bounce" />
              <span>Download / View PDF</span>
            </a>

            <button
              onClick={onClose}
              className="w-full px-6 py-3 dark:bg-slate-800 bg-slate-200 dark:hover:bg-slate-700 hover:bg-slate-300 dark:text-slate-300 text-slate-700 font-semibold rounded-xl transition-all duration-300"
            >
              Close Preview
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ===================================
// KOMPONEN UTAMA SECTION PROJECT
// ===================================
function ProjectSection() {
  const [activeTab, setActiveTab] = useState('Projects');
  const [projectCategory, setProjectCategory] = useState('Web/Apps');
  const [previewCertificate, setPreviewCertificate] = useState(null);
  const [previewProject, setPreviewProject] = useState(null); // ✨ NEW STATE
  const { hideNavbar, showNavbar } = useNavbar();

  // === Database States ===
  const [projectsFromDB, setProjectsFromDB] = useState([]);
  const [certificatesFromDB, setCertificatesFromDB] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingCerts, setLoadingCerts] = useState(true);

  // === CHANGE START: State dan konstanta untuk Show More/Less ===
  const INITIAL_CERTIFICATES_TO_SHOW = 6;
  const [visibleCertificatesCount, setVisibleCertificatesCount] = useState(INITIAL_CERTIFICATES_TO_SHOW);
  // === CHANGE END ===

  // Fetch projects from database
  useEffect(() => {
    async function fetchProjects() {
      try {
        console.log('🔍 Fetching projects from Supabase...');
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('❌ Error fetching projects:', error);
          throw error;
        }

        if (data && data.length > 0) {
          console.log('✅ Projects loaded from database:', data.length, 'projects');
          console.log('📊 Projects data:', data);
          setProjectsFromDB(data);
        } else {
          console.log('⚠️ No projects found in database, using fallback data');
        }
      } catch (err) {
        console.error('❌ Error fetching projects:', err);
      } finally {
        setLoadingProjects(false);
      }
    }
    fetchProjects();
  }, []);

  // Fetch certificates from database
  useEffect(() => {
    async function fetchCertificates() {
      try {
        console.log('🔍 Fetching certificates from Supabase...');
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('issue_date', { ascending: false });

        if (error) {
          console.error('❌ Error fetching certificates:', error);
          throw error;
        }

        if (data && data.length > 0) {
          console.log('✅ Certificates loaded from database:', data.length, 'certificates');
          console.log('📜 Certificates data:', data);
          setCertificatesFromDB(data);
        } else {
          console.log('⚠️ No certificates found in database, using fallback data');
        }
      } catch (err) {
        console.error('❌ Error fetching certificates:', err);
      } finally {
        setLoadingCerts(false);
      }
    }
    fetchCertificates();
  }, []);

  useEffect(() => {
    // Hide navbar when any modal is open
    if (previewCertificate || previewProject) {
      hideNavbar();
    } else {
      showNavbar();
    }
  }, [previewCertificate, previewProject, hideNavbar, showNavbar]);

  useEffect(() => {
    return () => {
      showNavbar();
    };
  }, [showNavbar]);

  const tabs = [
    { id: 'Projects', label: 'Projects', icon: <PiCodeBold className="text-[1.7em] mb-1" /> },
    { id: 'Certificate', label: 'Certificates', icon: <LuBadge className="text-[1.5em] mb-1" /> },
    { id: 'Tech Stack', label: 'Tech Stack', icon: <LiaLayerGroupSolid className="text-[1.5em] mb-1" /> },
  ];

  // Use database projects if available, fallback to dummy data
  const activeProjects = projectsFromDB.length > 0 ? projectsFromDB : dummyProjects;

  console.log('🎯 Active projects source:', projectsFromDB.length > 0 ? 'DATABASE' : 'FALLBACK');
  console.log('📦 Total projects:', activeProjects.length);

  // Transform database projects to match UI format
  const transformedProjects = activeProjects.map(p => {
    // If has UUID id, it's from database - transform it
    if (p.id && typeof p.id === 'string' && p.id.includes('-')) {
      return {
        id: p.id,
        title: p.title,
        description: p.description,
        tech: p.tags || [],
        link: p.demo_url || p.github_url || '#', // Use demo_url as primary link
        github: p.github_url, // Add specific github field
        image: p.image_url,
        category: 'Database', // All DB projects in one category
        featured: p.featured || false
      };
    }
    // Static data already in correct format
    return p;
  });

  console.log('🔄 Transformed projects:', transformedProjects.length);

  // Filter projects by category (only applies to static dummy data)
  const filteredProjects = transformedProjects.filter((p) => {
    // If from database (has category 'Database'), show all
    if (p.category === 'Database') return true;
    // For dummy data, filter by selected category
    return p.category === projectCategory;
  });

  console.log('✨ Filtered projects to display:', filteredProjects.length);

  // Use database certificates if available, fallback to static data
  const activeCertificates = certificatesFromDB.length > 0 ? certificatesFromDB : userCertificates;

  // === CHANGE START: Handler untuk tombol Show More/Less ===
  const handleShowMore = () => {
    setVisibleCertificatesCount(activeCertificates.length);
  };

  const handleShowLess = () => {
    setVisibleCertificatesCount(INITIAL_CERTIFICATES_TO_SHOW);
  };
  // === CHANGE END ===

  return (
    <section id="project" className="py-20">

      <style>{`
        @keyframes line-shadow-anim { 0% { background-position: 0 0; } 100% { background-position: 100% 100%; } }
        .line-shadow-effect::after { content: attr(data-text); position: absolute; z-index: -1; left: 0.04em; top: 0.04em; background-image: linear-gradient(45deg, transparent 45%, var(--shadow-color) 45%, var(--shadow-color) 55%, transparent 0); background-size: 0.06em 0.06em; -webkit-background-clip: text; background-clip: text; color: transparent; animation: line-shadow-anim 30s linear infinite; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl font-bold font-moderniz">
          <span className="dark:text-[#00ffd0] text-violet-600"><LineShadowText shadowColor="#00b3a4">PORTFOLIO</LineShadowText></span>
          {' '}
          <span className="dark:text-white text-slate-800"><LineShadowText shadowColor="#bbbbbb">SHOWCASE</LineShadowText></span>
        </h2>
      </motion.div>

      <div className="w-full">
        <div className="flex justify-center mb-12">
          <motion.div
            layout
            className="inline-flex w-full max-w-4xl rounded-3xl p-2 shadow-lg border dark:border-slate-800 border-slate-200 dark:bg-gradient-to-r dark:from-[#101624] dark:via-[#0a1627] dark:to-[#0a223a] bg-white backdrop-blur-md"
            style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex flex-1 flex-col items-center justify-center px-2 py-7 rounded-2xl font-semibold text-base transition-colors duration-300 outline-none ${activeTab === tab.id ? "dark:text-white text-slate-900" : "text-slate-400 hover:text-violet-600 dark:hover:text-violet-300"}`}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                style={{ zIndex: 1, minWidth: 0 }}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute inset-0 dark:bg-gradient-to-br dark:from-[#0a223a] dark:to-[#101624] bg-slate-100 rounded-2xl border dark:border-transparent border-slate-200"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    style={{ zIndex: -1, opacity: 0.96 }}
                  />
                )}
                <span className="relative z-10 flex flex-col items-center gap-2">
                  {tab.icon}
                  <span className="font-bold">{tab.label}</span>
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        <div
          className="rounded-3xl p-0 md:p-6 shadow-xl border dark:border-slate-800/60 border-slate-100 mx-auto max-w-7xl bg-clip-padding dark:bg-slate-900/50 bg-white"
          style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-10"
            >
              {activeTab === 'Projects' && (
                <>
                  {/* Only show category buttons for dummy data */}
                  {projectsFromDB.length === 0 && (
                    <div className="flex justify-center gap-4 mb-8">
                      <button className={`px-5 py-2 rounded-full font-semibold transition-all duration-200 border ${projectCategory === 'Web/Apps' ? 'bg-violet-700/80 text-white border-violet-400 shadow-violet-500/10 shadow-lg' : 'bg-slate-900/60 text-violet-200 border-slate-700 hover:bg-violet-800/40 hover:text-white'}`} onClick={() => setProjectCategory('Web/Apps')}>Web/Apps</button>
                      <button className={`px-5 py-2 rounded-full font-semibold transition-all duration-200 border ${projectCategory === '3D Design' ? 'bg-violet-700/80 text-white border-violet-400 shadow-violet-500/10 shadow-lg' : 'bg-slate-900/60 text-violet-200 border-slate-700 hover:bg-violet-800/40 hover:text-white'}`} onClick={() => setProjectCategory('3D Design')}>3D Design</button>
                    </div>
                  )}

                  {loadingProjects ? (
                    <div className="flex justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-400"></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredProjects.length > 0 ? (
                        filteredProjects.map((p, i) => (
                          <ProjectCard
                            key={p.id || i}
                            project={p}
                            onClick={setPreviewProject} // ✨ PASS HANDLER
                          />
                        ))
                      ) : (
                        <div className="col-span-full text-center text-slate-400 py-12">
                          No projects available yet.
                          {projectsFromDB.length === 0 && (
                            <div className="mt-4 text-sm text-violet-400">
                              Add projects via Admin Dashboard to see them here!
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
              {activeTab === 'Certificate' && (
                <div className="space-y-8">
                  {loadingCerts ? (
                    <div className="flex justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <AnimatePresence>
                          {activeCertificates.slice(0, visibleCertificatesCount).map((cert, i) => {
                            // Transform DB data to match CertificateCard props
                            const certData = cert.id ? {
                              // From database (has UUID id)
                              title: cert.title,
                              issuer: cert.issuer,
                              date: cert.issue_date ? new Date(cert.issue_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '',
                              link: cert.credential_url || '#',
                              image: cert.image_url || ''
                            } : cert; // From static data

                            return <CertificateCard key={cert.id || i} cert={certData} onClick={setPreviewCertificate} />;
                          })}
                        </AnimatePresence>
                      </div>
                      {activeCertificates.length > INITIAL_CERTIFICATES_TO_SHOW && (
                        <div className="flex justify-center mt-12">
                          {visibleCertificatesCount < activeCertificates.length ? (
                            <motion.button
                              onClick={handleShowMore}
                              className="group dark:bg-gradient-to-r dark:from-violet-600 dark:to-emerald-600 dark:hover:from-violet-500 dark:hover:to-emerald-500 bg-violet-600 hover:bg-violet-500 px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-violet-500/25"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Show More ({activeCertificates.length - visibleCertificatesCount} more)
                            </motion.button>
                          ) : (
                            <motion.button
                              onClick={handleShowLess}
                              className="group bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 shadow-lg"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Show Less
                            </motion.button>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
              {activeTab === 'Tech Stack' && (
                <div className="max-w-4xl mx-auto space-y-8">
                  {Object.entries(techStack).map(([category, techs]) => (
                    <div key={category}>
                      <h3 className="text-xl font-bold dark:text-violet-300 text-violet-600 capitalize mb-4 border-b-2 dark:border-slate-800 border-slate-200 pb-2">{category}</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {techs.map((tech, i) => (
                          <div key={i} className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl dark:bg-slate-900/70 bg-white border dark:border-slate-800 border-slate-100 transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-violet-500/30 dark:shadow-none shadow-md hover:shadow-lg dark:hover:shadow-none">
                            <div className="text-4xl">{tech.icon}</div>
                            <p className="text-sm dark:text-slate-300 text-slate-600">{tech.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {previewCertificate && (
          <CertificatePreviewModal
            certificate={previewCertificate}
            onClose={() => setPreviewCertificate(null)}
          />
        )}
        {/* ✨ Project Detail Modal */}
        {previewProject && (
          <ProjectDetailModal
            project={previewProject}
            onClose={() => setPreviewProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default ProjectSection;
