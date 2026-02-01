'use client';

import React, { useState } from 'react';
import { personalInfo } from '@/data/personalInfo';
import { projects } from '@/data/projects';
import { techStackCategories } from '@/data/techStack';
import { timelineData } from '@/data/timeline';
import {
  Github,
  Linkedin,
  Scroll,
  Mail,
  Download,
  Globe,
  Award,
  GraduationCap,
  Briefcase,
  BrainCircuit,
  Smartphone,
  Terminal,
  Menu,
  Eye
} from 'lucide-react';

export default function Portfolio() {
  const [filter, setFilter] = useState('All');

  const filteredProjects = projects.filter(project =>
    filter === 'All' ? true : project.category === filter
  );

  // Danh sách menu links
  const navLinks = [
    { name: 'About', href: '#' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'History', href: '#history' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <main className="min-h-screen bg-[#0A0F1A] text-slate-400 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden">

      {/* --- HEADER --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0F1A]/80 backdrop-blur-md border-b border-slate-800/60 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo / Name */}
          <a href="#" className="text-lg font-bold text-slate-100 tracking-tight hover:text-blue-400 transition-colors">
            {personalInfo.name}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noreferrer"
              className="ml-4 p-2 bg-slate-800/50 rounded-full hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-transparent hover:border-slate-600"
            >
              <Github size={18} />
            </a>
          </nav>
          <button className="md:hidden text-slate-300 hover:text-white">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-16 px-6 max-w-6xl mx-auto">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* --- LEFT COLUMN: IDENTITY --- */}
          <div className="lg:col-span-4 flex flex-col items-center text-center lg:sticky lg:top-24">
            <div className="relative w-48 h-48 md:w-56 md:h-56 mb-8 group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative w-full h-full rounded-full p-1 bg-[#0A0F1A] ring-1 ring-slate-700/50 overflow-hidden">
                <img
                  src="/avatar.jpg"
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute bottom-2 right-3 bg-[#0A0F1A] border border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full shadow-lg shadow-emerald-900/20 flex items-center gap-1.5 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Open to Work
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2 tracking-tight whitespace-nowrap">
              {personalInfo.name}
            </h1>

            <div className="space-y-1 mb-6">
              <p className="text-lg font-semibold text-blue-400 whitespace-nowrap">{personalInfo.role}</p>
              <p className="text-sm text-slate-500 font-medium whitespace-nowrap">{personalInfo.year}</p>
            </div>

            <div className="flex justify-center gap-3">
              {[
                { icon: <Github size={18} />, href: personalInfo.socials.github },
                { icon: <Linkedin size={18} />, href: personalInfo.socials.linkedin },
                { icon: <Mail size={18} />, href: personalInfo.socials.email }
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="p-2.5 bg-[#121723] hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-all hover:-translate-y-1 border border-slate-800 hover:border-slate-600"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* --- RIGHT COLUMN: CONTENT --- */}
          <div className="lg:col-span-8 pt-1">
            <h2 className="text-2xl font-bold text-slate-100 mb-5 flex items-center gap-3">
              About Me
              <span className="h-px bg-slate-800 flex-grow ml-4 opacity-50"></span>
            </h2>

            <div className="text-base text-slate-300 leading-7 mb-8 font-light">
              {personalInfo.bio}
            </div>

            <div className="flex flex-wrap gap-3 mb-10">
              <a href="#" className="px-5 py-2 bg-slate-100 hover:bg-white text-slate-900 font-bold rounded-lg transition-all flex items-center gap-2 text-sm shadow-lg shadow-slate-900/20 hover:-translate-y-0.5">
                <Download size={16} /> Download CV
              </a>
              <a target="_blank" href={personalInfo.transcriptLink} className="px-5 py-2 bg-transparent border border-slate-700 text-slate-300 font-medium rounded-lg hover:border-slate-500 hover:text-white transition-all flex items-center gap-2 text-sm hover:bg-slate-800/30">
                <Eye size={16} /> View Transcript
              </a>
            </div>

            {/* GRID INFO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              <div>
                <h3 className="text-sm font-bold text-slate-100 mb-4 flex items-center gap-2 uppercase tracking-wider border-b border-slate-800 pb-2">
                  Interests
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-slate-300 text-[15px]">
                    <BrainCircuit size={20} className="text-purple-400 shrink-0" />
                    Artificial Intelligence / NLP
                  </li>
                  <li className="flex items-center gap-3 text-slate-300 text-[15px]">
                    <Smartphone size={20} className="text-blue-400 shrink-0" />
                    Mobile Application (Flutter)
                  </li>
                  <li className="flex items-center gap-3 text-slate-300 text-[15px]">
                    <Terminal size={20} className="text-emerald-400 shrink-0" />
                    Backend System & Data
                  </li>
                </ul>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-sm font-bold text-slate-100 mb-4 flex items-center gap-2 uppercase tracking-wider border-b border-slate-800 pb-2">
                  Education
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <GraduationCap size={20} className="text-blue-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-slate-200 font-bold text-base">{personalInfo.university}</h4>
                      <p className="text-sm text-slate-400 mt-1 leading-tight">{personalInfo.year}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Award size={20} className="text-yellow-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-slate-200 font-bold text-base">{personalInfo.gpa}</h4>
                      <p className="text-sm text-slate-400 mt-1 leading-tight">
                        Academic Scholarship ({personalInfo.scholarship} semesters) <span className="text-yellow-400 font-medium"><br />(4.0 GPA in {personalInfo.gpa_4} semesters)</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURED PROJECTS --- */}
      <section id="projects" className="py-24 px-6 max-w-6xl mx-auto border-t border-slate-800/60 scroll-mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-100 mb-3">Featured Projects</h2>
          <p className="text-slate-400 text-base">A selection of my recent work</p>

          <div className="flex justify-center gap-3 mt-8 flex-wrap">
            {['All', 'AI Research', 'Engineering'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-6 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 border ${filter === tab
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-900/30'
                  : 'bg-[#121723] text-slate-400 border-slate-800 hover:border-slate-600 hover:text-slate-200'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group bg-[#121723] rounded-xl overflow-hidden border border-slate-800 hover:border-slate-600/50 hover:-translate-y-1 transition-all duration-300 flex flex-col shadow-lg shadow-black/20">
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                />
                {project.isLive && (
                  <div className="absolute top-3 right-3 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Live
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-[15px] text-slate-300 mb-5 line-clamp-3 flex-grow leading-7 font-normal">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs font-semibold text-emerald-300 bg-emerald-900/20 px-3 py-1.5 rounded border border-emerald-500/20 group-hover:border-emerald-500/30 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 mt-auto pt-5 border-t border-slate-800/60 text-sm font-semibold">
                  <a target='_blank' href={project.links.code} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                    <Github size={18} /> Code
                  </a>
                  <a target='_blank' href={project.links.demo} className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors">
                    <Globe size={18} /> Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- TECH STACK --- */}
      <section id="skills" className="py-24 px-6 max-w-6xl mx-auto border-t border-slate-800/60 scroll-mt-20">
        <h2 className="text-3xl font-bold text-slate-100 text-center mb-4">Tech Stack</h2>
        <p className="text-slate-400 text-center mb-16 text-base">Technologies I use to build intelligent systems</p>

        <div className="space-y-16">
          {techStackCategories.map((cat, index) => (
            <div key={index}>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px bg-slate-800 w-20"></div>
                <h3 className="text-sm font-bold text-blue-400 tracking-widest uppercase">{cat.title}</h3>
                <div className="h-px bg-slate-800 w-20"></div>
              </div>
              <div className="flex flex-wrap justify-center gap-5">
                {cat.items.map((skill, idx) => {
                  const forceWhiteIcons = ['GitHub', 'Next.js', 'Pandas', 'Express', 'Vercel', 'Flask'];
                  const isDark = forceWhiteIcons.includes(skill.name) || ['181717', '000000'].includes(skill.icon.hex);
                  const iconColor = isDark ? 'ffffff' : skill.icon.hex;

                  return (
                    <div
                      key={idx}
                      className="group w-44 md:w-52 bg-[#121723] border border-slate-800 p-6 rounded-xl flex flex-col items-center justify-center gap-4 hover:border-slate-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20"
                    >
                      <div
                        className="transition-transform duration-300 group-hover:scale-110"
                        style={{
                          filter: `drop-shadow(0 0 20px #${iconColor}25)`
                        }}
                      >
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          className="w-12 h-12 transition-all duration-300 brightness-110 contrast-125"
                          style={{ fill: `#${iconColor}` }}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>{skill.icon.title}</title>
                          <path d={skill.icon.path} />
                        </svg>
                      </div>
                      <span className="text-[15px] font-medium text-slate-400 group-hover:text-slate-200 tracking-wide text-center truncate w-full">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- EXPERIENCE & EDUCATION --- */}
      <section id="history" className="py-24 px-6 max-w-6xl mx-auto border-t border-slate-800/60 scroll-mt-20">
        <h2 className="text-3xl font-bold text-slate-100 text-center mb-20">History & Milestones</h2>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-800 md:-translate-x-1/2"></div>
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}>
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0A0F1A] border-2 border-blue-500/80 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                  {item.type === 'education' ? (
                    <GraduationCap size={18} className="text-blue-400" />
                  ) : item.type === 'achievement' ? (
                    <Award size={18} className="text-purple-400" />
                  ) : item.type === 'certificate' ? (
                    <Scroll size={18} className="text-orange-400" />
                  ) : (
                    <Briefcase size={18} className="text-emerald-400" />
                  )}
                </div>
                <div className="w-full md:w-[calc(50%-3rem)] pl-14 md:pl-0">
                  <div className="bg-[#121723] border border-slate-800 p-7 rounded-2xl hover:border-slate-600 transition-all duration-300 group shadow-lg shadow-black/10 hover:shadow-xl">
                    <div className="flex flex-wrap justify-between items-start mb-3 gap-3">
                      <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h3>
                      <span className="text-xs font-bold font-mono text-emerald-300 bg-emerald-900/20 px-3 py-1.5 rounded-full border border-emerald-500/20 whitespace-nowrap">
                        {item.date}
                      </span>
                    </div>
                    <p className="text-blue-400 text-base font-semibold mb-4 flex items-center gap-2">
                      {item.place}
                    </p>
                    <p className="text-slate-300 text-[15px] mb-5 leading-7 font-normal">
                      {item.desc}
                    </p>
                    {item.details && (
                      <ul className="space-y-2.5 bg-[#0A0F1A]/40 p-4 rounded-xl border border-slate-800/50">
                        {item.details.map((detail, i) => (
                          <li key={i} className="text-sm text-slate-400 flex items-start gap-3 leading-6">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="hidden md:block w-[calc(50%-3rem)]"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section id="contact" className="py-24 px-6 text-center border-t border-slate-800/60 scroll-mt-20">
        <div className="max-w-3xl mx-auto bg-[#121723] border border-slate-800 p-12 rounded-2xl relative overflow-hidden shadow-2xl">

          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[100px] -z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/5 blur-[100px] -z-10 pointer-events-none"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-6 tracking-tight">
            Eager to Learn. Ready to Build.
          </h2>
          <p className="text-base md:text-lg text-slate-300 mb-10 max-w-xl mx-auto leading-relaxed font-light">
            I am seeking an <span className="text-blue-300 font-semibold border-b border-blue-500/30">AI Engineer</span> or <span className="text-blue-300 font-semibold border-b border-blue-500/30">Backend Developer</span> Internship to bridge the gap between academic theory and real-world application.
            <br className="hidden md:block" />
            <br className="hidden md:block" />
            While I am early in my journey, I bring a <strong>strong foundation</strong>, a <strong>relentless drive to learn</strong>, and the dedication to grow into a valuable team member under your mentorship.
          </p>
          <a
            href="mailto:leducnguyen07092005@gmail.com"
            className="group px-8 py-3.5 bg-slate-100 hover:bg-white text-slate-900 font-bold rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-[0_0_20px_rgba(59,130,246,0.3)] inline-flex items-center gap-2"
          >
            <Mail size={18} className="text-blue-600 group-hover:scale-110 transition-transform" />
            Let's Connect
          </a>

        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-8 text-center text-slate-600 text-xs border-t border-slate-800/60">
        <p>© 2026 Le Duc Nguyen. Built with Next.js & Tailwind CSS.</p>
      </footer>

    </main>
  );
}