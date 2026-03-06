"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { generatePortfolio } from "@/utils/api";

const THEMES = [
    { id: "modern", label: "Modern", icon: "🌐", desc: "Clean, professional look" },
    { id: "minimalist", label: "Minimalist", icon: "✨", desc: "Elegant simplicity" },
    { id: "creative", label: "Creative", icon: "🎨", desc: "Bold and expressive" },
];

export default function GeneratePage() {
    const router = useRouter();
    const [form, setForm] = useState({
        linkedinUrl: "",
        targetRole: "",
        themePreference: "modern",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const portfolio = await generatePortfolio(form);
            // Store result in sessionStorage and navigate to portfolio view
            sessionStorage.setItem("portfolio_data", JSON.stringify(portfolio));
            router.push("/portfolio");
        } catch (err) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="gradient-bg min-h-screen">
            <div className="max-w-2xl mx-auto px-6 py-16">
                {/* Header */}
                <div className="text-center mb-12 fade-in-up">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                        Generate Your <span className="glow-text">Portfolio</span>
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Enter your details below and let AI transform your profile.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="glass-card p-8 sm:p-10 space-y-6 fade-in-up fade-in-up-delay-1"
                >
                    {/* LinkedIn URL */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            LinkedIn Profile URL
                        </label>
                        <input
                            type="url"
                            required
                            placeholder="https://linkedin.com/in/your-profile"
                            className="input-field"
                            value={form.linkedinUrl}
                            onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
                        />
                    </div>

                    {/* Target Role */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Target Role
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Senior ML Engineer, Full Stack Developer"
                            className="input-field"
                            value={form.targetRole}
                            onChange={(e) => setForm({ ...form, targetRole: e.target.value })}
                        />
                    </div>

                    {/* Theme Selector */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">
                            Portfolio Theme
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {THEMES.map((theme) => (
                                <button
                                    key={theme.id}
                                    type="button"
                                    onClick={() => setForm({ ...form, themePreference: theme.id })}
                                    className={`p-4 rounded-xl border text-center transition-all duration-300 cursor-pointer ${form.themePreference === theme.id
                                            ? "border-indigo-500 bg-[rgba(99,102,241,0.15)] shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                                            : "border-[rgba(99,102,241,0.15)] bg-[rgba(15,10,30,0.4)] hover:border-[rgba(99,102,241,0.3)] hover:bg-[rgba(99,102,241,0.05)]"
                                        }`}
                                >
                                    <div className="text-2xl mb-1">{theme.icon}</div>
                                    <div className="text-sm font-medium text-white">{theme.label}</div>
                                    <div className="text-xs text-slate-500 mt-0.5">{theme.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full !py-4 text-lg"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-3">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Processing with AI...
                            </span>
                        ) : (
                            "Generate Portfolio 🚀"
                        )}
                    </button>

                    <p className="text-slate-600 text-xs text-center">
                        Your data is processed securely and never stored beyond caching.
                    </p>
                </form>
            </div>
        </div>
    );
}
