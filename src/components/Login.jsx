/* eslint-disable react/prop-types */
export default function Login({ email, setEmail, password, setPassword, error, onLogin, isDarkMode, toggleDarkMode }) {
    return (
        <div className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 mt-20 relative transition-colors duration-300">

            {/* Tombol Dark Mode di sudut kanan atas */}
            <button
                onClick={toggleDarkMode}
                title={isDarkMode ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
                className="absolute top-4 right-4 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all text-base"
            >
                {isDarkMode ? '☀️' : '🌙'}
            </button>

            <h2 className="text-3xl font-extrabold text-center text-slate-800 dark:text-slate-100 mb-2">Mini Kanban</h2>
            <p className="text-sm text-center text-slate-400 dark:text-slate-500 mb-6">Silakan masuk ke akun Anda</p>

            {error && (
                <div className="mb-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-3 text-sm text-red-700 dark:text-red-400 rounded-r-lg">
                    {error}
                </div>
            )}

            <form onSubmit={onLogin} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1">Email</label>
                    <input
                        type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@admin.com"
                        className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-600 transition-colors"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1">Password</label>
                    <input
                        type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-600 transition-colors"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition duration-200 shadow-md shadow-blue-200 dark:shadow-blue-900/30">
                    Sign In
                </button>
            </form>
        </div>
    );
}