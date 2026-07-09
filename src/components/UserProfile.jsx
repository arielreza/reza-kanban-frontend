/* eslint-disable react/prop-types */
export default function UserProfile({ user, onBack, onLogout }) {
    return (
        <div className="w-full max-w-2xl mx-auto mt-6 animate-fade-in">
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors duration-300">

                {/* Gradient Header Band */}
                <div className="h-32 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 relative">
                    {/* Decorative circles */}
                    <div className="absolute top-[-30px] right-[-30px] w-32 h-32 bg-white/10 rounded-full" />
                    <div className="absolute bottom-[-20px] right-[80px] w-20 h-20 bg-white/10 rounded-full" />

                    {/* Nav buttons */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                        <button
                            onClick={onBack}
                            className="bg-white/20 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-white/35 transition-all flex items-center gap-1.5 shadow-sm"
                        >
                            ← Kembali ke Board
                        </button>
                        <button
                            onClick={onLogout}
                            className="bg-white/20 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-rose-500 transition-all shadow-sm"
                        >
                            🚪 Logout
                        </button>
                    </div>

                    {/* Avatar overlapping band */}
                    <div className="absolute -bottom-10 left-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl border-4 border-white dark:border-slate-800 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-blue-500/30 transition-colors duration-300">
                            {user?.name?.charAt(0)}
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="pt-14 px-8 pb-8">
                    {/* Name & Role */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">{user?.name}</h2>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-0.5 rounded-full border border-blue-100 dark:border-blue-800/50">
                                {user?.email === 'admin@admin.com' ? '👑 Administrator' : '🧑‍💻 Testing Member'}
                            </span>
                            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-800/50">
                                🟢 Aktif
                            </span>
                        </div>
                    </div>

                    {/* Detail Cards */}
                    <div className="space-y-3">
                        <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Informasi Akun</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-slate-50 dark:bg-slate-700/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-600/60 hover:border-blue-200 dark:hover:border-blue-800/60 transition-colors">
                                <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">ID Pengguna</span>
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200 font-mono">{user?.id || 'USR-2026'}</span>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-700/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-600/60 hover:border-blue-200 dark:hover:border-blue-800/60 transition-colors">
                                <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Alamat Email</span>
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{user?.email}</span>
                            </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-700/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-600/60">
                            <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Bio / Deskripsi</span>
                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                Akun ini digunakan khusus untuk melakukan pengujian sistem pada Mini Kanban Board Application (Front-End &amp; Back-End Integration Test).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}