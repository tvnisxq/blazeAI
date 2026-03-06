"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ──────────────────────────────────────────────
// Sub-components for the portfolio view
// ──────────────────────────────────────────────

function BioSection({ bios }) {
    const [activeTab, setActiveTab] = useState("executive");
    return (
        <div className="glass-card p-6 sm:p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">✍️</span> Professional Bios
            </h2>
            <div className="flex gap-2 mb-5">
                {[
                    { id: "executive", label: "Executive Summary" },
                    { id: "technical", label: "Technical Deep-Dive" },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${activeTab === tab.id
                                ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                                : "text-slate-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] border border-transparent"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                {activeTab === "executive" ? bios.executive_summary : bios.technical_deep_dive}
            </p>
        </div>
    );
}

function SkillsDisplay({ skills }) {
    return (
        <div className="glass-card p-6 sm:p-8">
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
                <span className="text-2xl">🧠</span> Skills & Expertise
            </h2>
            <div className="space-y-5">
                {skills.hard_skills?.length > 0 && (
                    <div>
                        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                            Hard Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.hard_skills.map((s) => (
                                <span key={s} className="skill-chip skill-chip-hard">{s}</span>
                            ))}
                        </div>
                    </div>
                )}
                {skills.soft_skills?.length > 0 && (
                    <div>
                        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                            Soft Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.soft_skills.map((s) => (
                                <span key={s} className="skill-chip skill-chip-soft">{s}</span>
                            ))}
                        </div>
                    </div>
                )}
                {skills.tools_and_frameworks?.length > 0 && (
                    <div>
                        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                            Tools & Frameworks
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.tools_and_frameworks.map((s) => (
                                <span key={s} className="skill-chip skill-chip-tool">{s}</span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function ExperienceTimeline({ experiences }) {
    if (!experiences?.length) return null;
    return (
        <div className="glass-card p-6 sm:p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-2xl">💼</span> Experience
            </h2>
            <div className="relative pl-8">
                <div className="timeline-line" />
                <div className="space-y-8">
                    {experiences.map((exp, i) => (
                        <div key={i} className="relative group">
                            <div className="absolute -left-8 top-1 timeline-dot" />
                            <div className="group-hover:translate-x-1 transition-transform duration-200">
                                <h3 className="text-white font-semibold group-hover:text-indigo-300 transition-colors">
                                    {exp.title}
                                </h3>
                                <p className="text-indigo-400 text-sm">{exp.company}</p>
                                {(exp.start_date || exp.end_date) && (
                                    <p className="text-slate-500 text-xs mt-1">
                                        {exp.start_date || "?"} → {exp.end_date || "Present"}
                                    </p>
                                )}
                                {exp.description && (
                                    <p className="text-slate-400 text-sm mt-2 leading-relaxed">{exp.description}</p>
                                )}
                                {exp.achievements?.length > 0 && (
                                    <ul className="mt-2 space-y-1">
                                        {exp.achievements.map((a, j) => (
                                            <li key={j} className="text-slate-400 text-sm flex items-start gap-2">
                                                <span className="text-indigo-400 mt-0.5">▸</span>
                                                {a}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function EducationCards({ education }) {
    if (!education?.length) return null;
    return (
        <div className="glass-card p-6 sm:p-8">
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
                <span className="text-2xl">🎓</span> Education
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {education.map((edu, i) => (
                    <div
                        key={i}
                        className="p-4 rounded-xl border border-[rgba(99,102,241,0.12)] bg-[rgba(15,10,30,0.4)] hover:border-[rgba(99,102,241,0.3)] hover:bg-[rgba(99,102,241,0.05)] transition-all duration-300"
                    >
                        <h3 className="font-semibold text-white">{edu.degree}</h3>
                        <p className="text-indigo-400 text-sm">{edu.institution}</p>
                        {edu.graduation_year && (
                            <p className="text-slate-500 text-xs mt-1">Class of {edu.graduation_year}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function LoadingSkeleton() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-6">
            <div className="skeleton h-32 w-full" />
            <div className="skeleton h-48 w-full" />
            <div className="skeleton h-64 w-full" />
            <div className="skeleton h-40 w-full" />
        </div>
    );
}

// ──────────────────────────────────────────────
// Main Portfolio Page
// ──────────────────────────────────────────────

export default function PortfolioPage() {
    const router = useRouter();
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = sessionStorage.getItem("portfolio_data");
        if (stored) {
            setPortfolio(JSON.parse(stored));
        }
        setLoading(false);
    }, []);

    if (loading) return <LoadingSkeleton />;

    if (!portfolio) {
        return (
            <div className="gradient-bg min-h-screen flex items-center justify-center">
                <div className="glass-card p-10 text-center max-w-md">
                    <div className="text-5xl mb-4">📭</div>
                    <h2 className="text-2xl font-bold mb-2">No Portfolio Found</h2>
                    <p className="text-slate-400 mb-6">
                        Generate a portfolio first to view it here.
                    </p>
                    <Link href="/generate" className="btn-primary">
                        Generate Now →
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="gradient-bg min-h-screen">
            <div className="max-w-4xl mx-auto px-6 py-16 space-y-6">
                {/* Header card */}
                <div className="glass-card p-8 sm:p-10 text-center fade-in-up">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                        {portfolio.user_name?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2">{portfolio.user_name}</h1>
                    {portfolio.contact_email && (
                        <p className="text-indigo-400 text-sm">{portfolio.contact_email}</p>
                    )}
                    <div className="mt-3">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[rgba(99,102,241,0.15)] text-indigo-300 border border-[rgba(99,102,241,0.2)]">
                            {portfolio.theme_config} theme
                        </span>
                    </div>
                </div>

                {/* Bio sections */}
                <div className="fade-in-up fade-in-up-delay-1">
                    <BioSection bios={portfolio.bios} />
                </div>

                {/* Skills */}
                <div className="fade-in-up fade-in-up-delay-2">
                    <SkillsDisplay skills={portfolio.skills} />
                </div>

                {/* Experience */}
                <div className="fade-in-up fade-in-up-delay-3">
                    <ExperienceTimeline experiences={portfolio.experience_history} />
                </div>

                {/* Education */}
                <div className="fade-in-up fade-in-up-delay-4">
                    <EducationCards education={portfolio.education_history} />
                </div>

                {/* Actions */}
                <div className="flex justify-center gap-4 pt-4">
                    <Link href="/generate" className="btn-secondary">
                        ← Generate Another
                    </Link>
                </div>
            </div>
        </div>
    );
}
