import React, { useState } from 'react';
import { motion } from "framer-motion";
import { FaGithub, FaEnvelope, FaLinkedin, FaDownload, FaBriefcase, FaCode, FaCertificate, FaGlobe, FaArrowRight, FaCube } from 'react-icons/fa';
import Spline from '@splinetool/react-spline';
import { AnimatedGradientTextDemo } from '../components/AnimatedGradientTextDemo';
import GradientText from '../components/GradientText';
import TextGenerateEffect from "../components/text-generate-effect";
import Skills from '../components/Skills';
import Lanyard from '../components/Lanyard/Lanyard';
import { VelocityScroll } from '../components/VelocityScroll';
import { ButtonMovingBorder } from '../components/MovingBorderButton';
import ProjectSection from '../components/ProjectSection';
import Contact from '../components/Contact';
import { useTheme } from '../contexts/ThemeContext';
import CyberTerminal from '../components/CyberTerminal';
import MemoryGraph from '../components/MemoryGraph';

const Home = () => {
    const { theme } = useTheme();

    const [is3dEnabled, setIs3dEnabled] = useState(() => {
        if (typeof window !== 'undefined') {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            const isSmallScreen = window.innerWidth < 1024;
            return !isMobile && !isSmallScreen;
        }
        return true;
    });

    const toggle3dAssets = () => {
        setIs3dEnabled(prev => !prev);
    };

    const stats = [
        { icon: <FaCode />, value: "5+", title: "TOTAL PROJECTS", description: "AI & SaaS products built" },
        { icon: <FaCertificate />, value: "Azure AI", title: "INTERNSHIP", description: "Microsoft AI Model Evaluation" },
        { icon: <FaGlobe />, value: "8.83", title: "CGPA (ECE)", description: "Sri Venkateswara College of Engineering" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 px-8 max-w-7xl mx-auto"
        >
            <button
                onClick={toggle3dAssets}
                title={`Toggle 3D Assets (${is3dEnabled ? 'On' : 'Off'})`}
                className={`fixed top-24 right-4 z-50 p-3 rounded-full border backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-110
          ${is3dEnabled
                        ? 'bg-violet-500/20 border-violet-400 text-violet-300 shadow-[0_0_12px_2px_#00ffd080]'
                        : 'dark:bg-slate-800/50 dark:border-slate-700 dark:text-slate-400 bg-white border-slate-200 text-slate-600 shadow-sm'
                    }`}
            >
                <FaCube className="h-5 w-5" />
            </button>

            <section id="home" className="flex flex-col md:flex-row items-center gap-10 pt-20 pb-16 lg:pt-0 lg:pb-20">
                <div className="flex-1 dark:text-white text-slate-800 space-y-6 pt-16 md:pt-40 order-last md:order-none text-center md:text-left flex flex-col items-center md:items-start">
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}>
                        <AnimatedGradientTextDemo />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
                        className="text-4xl md:text-4xl font-moderniz font-bold leading-tight select-none main-heading"
                        style={{
                            color: theme === 'dark' ? "#00ffd0" : "#0f172a",
                            textShadow: theme === 'dark'
                                ? "2px 2px 0 #0c002b, 4px 4px 0 #6d28d9, 0 4px 12px rgba(0, 255, 208, 0.6), 0 1px 0 #00ffd0"
                                : "none"
                        }}
                    >
                        DHANUSH
                        <span style={{ display: 'block', marginTop: '0.4em' }}>SIDDILINGAM</span>
                    </motion.h1>
                    <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}>
                        <GradientText colors={["#a78bfa", "#6d28d9", "#00ffd0", "#6d28d9", "#a78bfa"]} animationSpeed={4} className="custom-class font-cascadia font-bold" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }} className="w-full mt-4">
                        <CyberTerminal />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}>
                        <Skills />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.0, ease: "easeOut" }} className="flex flex-row gap-4 mt-8">
                        <a href="https://github.com/Dhanush0792" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="group relative flex h-12 w-12 items-center justify-center rounded-full border dark:border-slate-700 border-slate-200 dark:bg-slate-900/[0.8] bg-white text-slate-600 dark:text-white transition-all duration-300 hover:border-violet-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-md dark:hover:shadow-[0_0_24px_2px_#00ffd0]">
                            <FaGithub className="h-6 w-6 dark:text-slate-400 text-slate-600 transition-all duration-300 group-hover:text-violet-600 dark:group-hover:text-violet-300" />
                        </a>
                        <a href="mailto:dhanushsiddilingam@gmail.com" aria-label="Secure Mail" className="group relative flex h-12 w-12 items-center justify-center rounded-full border dark:border-slate-700 border-slate-200 dark:bg-slate-900/[0.8] bg-white text-slate-600 dark:text-white transition-all duration-300 hover:border-violet-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-md dark:hover:shadow-[0_0_24px_2px_#00ffd0]">
                            <FaEnvelope className="h-6 w-6 dark:text-slate-400 text-slate-600 transition-all duration-300 group-hover:text-violet-600 dark:group-hover:text-violet-300" />
                        </a>
                        <a href="https://linkedin.com/in/dhanush-siddilingam-7a1bb9270" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="group relative flex h-12 w-12 items-center justify-center rounded-full border dark:border-slate-700 border-slate-200 dark:bg-slate-900/[0.8] bg-white text-slate-600 dark:text-white transition-all duration-300 hover:border-violet-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-md dark:hover:shadow-[0_0_24px_2px_#00ffd0]">
                            <FaLinkedin className="h-6 w-6 dark:text-slate-400 text-slate-600 transition-all duration-300 group-hover:text-violet-600 dark:group-hover:text-violet-300" />
                        </a>
                    </motion.div>
                </div>

                {/* 3. Render Lanyard secara kondisional */}
                <div className="hidden lg:flex flex-1 justify-center h-[600px] w-full order-first lg:order-none">
                  {is3dEnabled && (
                      <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} fov={18} transparent={true} />
                  )}
                </div>
            </section>

            <section
                id="about"
                className="py-12 md:py-18 gap-0 w-full mx-0 pt-20"
                style={{ width: "100vw", position: "relative", left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw" }}
            >
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: "easeOut" }} className="text-center">
                    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mb-20">
                        <VelocityScroll defaultVelocity={3} numRows={1} className="max-w-full">
                            <span className="font-moderniz font-bold" style={{ fontSize: "2.5rem", lineHeight: "1.1", color: theme === 'dark' ? "#00ffd0" : "#7c3aed", textShadow: theme === 'dark' ? "2px 2px 0 #0c002b, 4px 4px 0 #6d28d9, 0 4px 12px rgba(0, 255, 208, 0.6), 0 1px 0 #00ffd0" : "none", background: "none", WebkitBackgroundClip: "unset", WebkitTextFillColor: "unset", filter: theme === 'dark' ? 'none' : 'none', opacity: theme === 'dark' ? 1 : 0.3 }}>
                                ABOUT <span style={{ color: theme === 'dark' ? "#fff" : "#7c3aed" }}>ME</span>
                            </span>
                        </VelocityScroll>
                        <div className={`pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r ${theme === 'dark' ? 'from-[#080414]' : 'from-slate-50'}`}></div>
                        <div className={`pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l ${theme === 'dark' ? 'from-[#080414]' : 'from-slate-50'}`}></div>
                        <VelocityScroll defaultVelocity={-3} numRows={1} className="max-w-full">
                            <span className="font-moderniz font-bold" style={{ fontSize: "2.5rem", lineHeight: "1.1", color: theme === 'dark' ? "#00ffd0" : "#7c3aed", textShadow: theme === 'dark' ? "2px 2px 0 #0c002b, 4px 4px 0 #6d28d9, 0 4px 12px rgba(0, 255, 208, 0.6), 0 1px 0 #00ffd0" : "none", background: "none", WebkitBackgroundClip: "unset", WebkitTextFillColor: "unset", filter: theme === 'dark' ? 'none' : 'none', opacity: theme === 'dark' ? 1 : 0.3 }}>
                                ABOUT <span style={{ color: theme === 'dark' ? "#fff" : "#7c3aed" }}>ME</span>
                            </span>
                        </VelocityScroll>
                    </div>
                    <p className="text-lg dark:text-violet-200/70 text-slate-600 mt-2 font-cascadia px-1 mb-20">
                        ✧ Passionate about AI infrastructure and SaaS platforms ✧
                    </p>
                </motion.div>

                <div className="flex flex-col md:flex-row items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        className="dark:text-white text-slate-800 text-center md:text-left px-4 md:px-8 transition-all duration-700 md:w-2/3"
                    >
                        <p className="text-2xl dark:text-gray-300 text-slate-500 font-moderniz my" style={{ textShadow: theme === 'dark' ? "2px 2px 0 #0c002b, 4px 4px 0 #6d28d9, 0 4px 12px rgba(0, 255, 208, 0.6), 0 1px 0 #00ffd0" : "none" }}>Hello, I'm</p>
                        <h3 className="text-4xl font-bold dark:text-white text-slate-900 my-2 font-moderniz" style={{ textShadow: theme === 'dark' ? "2px 2px 0 #0c002b, 4px 4px 0 #6d28d9, 0 4px 12px rgba(0, 255, 208, 0.6), 0 1px 0 #00ffd0" : "none" }}>Dhanush Siddilingam</h3>
                        <p className="dark:text-white/80 text-slate-600 leading-relaxed mt-4 font-cascadia text-justify">
                            I am a Full-Stack Developer, AI Developer, and SaaS Builder currently pursuing a Bachelor of Technology in Electronics and Communication Engineering (ECE) at Sri Venkateswara College of Engineering (SVCE). I specialize in designing robust backend systems, building long-term memory infrastructure for AI workflows, and scaling MVPs into successful product ventures.
                        </p>
                        
                        <div className="mt-8">
                            <MemoryGraph />
                        </div>
                        
                        <div className="my-6 dark:bg-slate-900/50 bg-slate-50 border-l-4 dark:border-[#00ffd0] border-violet-600 p-4 rounded-r-lg italic dark:text-white/70 text-slate-700 font-cascadia dark:shadow-none shadow-md">
                            "Build AI systems that solve real problems, automate workflows, and create scalable SaaS ventures."
                        </div>
                        <div className="flex flex-row sm:flex-row gap-4 mt-8 justify-center md:justify-start items-center">
                            <ButtonMovingBorder as="a" href="/DHANUSH_SIDDILINGAM_AIDEVELOPER_RESUME.pdf" download duration={3000} borderRadius="0.75rem" className="dark:bg-slate-900/[0.8] bg-white border dark:border-slate-800 border-slate-200 dark:text-white text-slate-800 font-semibold flex items-center justify-center gap-2 transition-all duration-300 dark:shadow-none shadow-md hover:shadow-lg dark:hover:shadow-[0_0_24px_8px_#40ffaa]">
                                <FaDownload /> Download Resume
                            </ButtonMovingBorder>
                            <ButtonMovingBorder as="a" href="#projects" duration={3000} borderRadius="0.75rem" className="dark:bg-slate-900/[0.8] bg-white border dark:border-slate-800 border-slate-200 dark:text-white text-slate-800 font-semibold flex items-center justify-center gap-2 transition-all duration-300 dark:shadow-none shadow-md hover:shadow-lg dark:hover:shadow-[0_0_24px_8px_#40ffaa]">
                                <FaBriefcase /> View Projects
                            </ButtonMovingBorder>
                        </div>
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-10 px-4 md:px-0">
                    {stats.map((stat, index) => (
                        <div key={index} className="group relative p-6 rounded-2xl dark:bg-slate-900/90 bg-white border dark:border-slate-700/50 border-slate-200 dark:shadow-none shadow-lg transition-all duration-300 hover:border-violet-400/50 hover:shadow-xl dark:hover:shadow-[0_0_24px_0px_#00ffd050] cursor-pointer">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col">
                                    <div className="p-3 mb-4 rounded-full dark:bg-slate-800/80 bg-slate-50 border dark:border-slate-700/60 border-slate-100 w-max dark:group-hover:bg-violet-900/50 group-hover:bg-violet-50 group-hover:border-violet-200 transition-all duration-300">
                                        <div className="text-2xl dark:text-slate-400 text-slate-500 group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors duration-300">{stat.icon}</div>
                                    </div>
                                    <h3 className="text-sm font-semibold uppercase tracking-wider dark:text-slate-400 text-slate-500 group-hover:text-violet-700 dark:group-hover:text-slate-300 transition-colors duration-300">{stat.title}</h3>
                                    <p className="text-xs dark:text-slate-500 text-slate-400 mt-1">{stat.description}</p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <p className="text-5xl font-bold dark:text-white text-slate-900 transition-all duration-300 group-hover:text-violet-600 dark:group-hover:text-violet-300">{stat.value}</p>
                                    <FaArrowRight className="text-slate-400 mt-auto group-hover:text-violet-500 transition-all duration-300 -rotate-45" />
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </section>

            <section id="projects" className="md:py-18">
                <ProjectSection />
            </section>

            <section id="contact" className="py-20 pb-16">
                <Contact />
            </section>

            <footer className="py-12 pb-16 text-center text-gray-400 dark:bg-gradient-to-t dark:from-slate-900/50 dark:to-transparent bg-gradient-to-t from-slate-100/50 to-transparent">
                <div className="text-sm">© {new Date().getFullYear()} Dhanush Siddilingam. All rights reserved.</div>
                <div className="text-xs mt-2">Built with <span className="text-red-500">♥</span> using React, Tailwind CSS, and Three.js.</div>
            </footer>
        </motion.div>
    );
};

export default Home;
