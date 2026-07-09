/* eslint-disable react/prop-types */
export default function Login({ email, setEmail, password, setPassword, error, onLogin, isDarkMode, toggleDarkMode }) {
    return (
        <div className="w-full max-w-md animate-fade-in">

            {/* Tombol dark mode - melayang di atas card */}
            <div className="flex justify-end mb-3">
                <button
                    onClick={toggleDarkMode}
                    title={isDarkMode ? 'Mode Terang' : 'Mode Gelap'}
                    className="bg-white/20 dark:bg-slate-700 text-white dark:text-slate-300 p-2.5 rounded-xl hover:bg-white/30 dark:hover:bg-slate-600 transition-all backdrop-blur-sm shadow-sm"
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
            </div>

            {/* Card Utama */}
            <div className="bg-white/95 dark:bg-slate-800 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/20 dark:shadow-black/50 p-8 border border-white/50 dark:border-slate-700">

                {/* Logo & Brand */}
                <div className="text-center mb-7">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30 rotate-3 hover:rotate-0 transition-transform duration-300">
                        <span className="text-white text-2xl font-black tracking-tighter">K</span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Mini Kanban</h2>
                    <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Masuk ke workspace Anda</p>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="mb-5 bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800/60 p-3.5 text-sm text-rose-700 dark:text-rose-400 rounded-xl flex items-center gap-2">
                        <span>⚠️</span>
                        <span>{error}</span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={onLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Email</label>
                        <input
                            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@admin.com"
                            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-500 transition-all text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Password</label>
                        <input
                            type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-500 transition-all text-sm"
                        />
                    </div>
                    <div className="pt-1">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.01] active:scale-[0.99]"
                        >
                            Masuk ke Workspace →
                        </button>
                    </div>
                </form>

                {/* Demo Hint */}
                <div className="mt-6 p-3.5 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-600/60">
                    <p className="text-xs text-slate-400 dark:text-slate-500 text-center">
                        Demo: <span className="text-slate-600 dark:text-slate-300 font-semibold">admin@admin.com</span> / <span className="text-slate-600 dark:text-slate-300 font-semibold">password123</span>
                    </p>
                </div>
            </div>
        </div>
    );
}