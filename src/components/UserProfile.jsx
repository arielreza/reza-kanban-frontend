/* eslint-disable react/prop-types */
export default function UserProfile({ user, onBack, onLogout }) {
    return (
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-100 p-8 mx-auto mt-10">
            {/* Tombol Kembali */}
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={onBack}
                    className="text-sm font-bold text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
                >
                    ⬅️ Kembali ke Kanban Board
                </button>
                <button
                    onClick={onLogout}
                    className="bg-rose-500 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-rose-600 shadow-sm transition-all hover:scale-[1.02]"
                >
                    🚪 Logout
                </button>
            </div>

            <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 border-b border-slate-100 pb-6">
                {/* Avatar Bulat Besar */}
                <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center text-3xl font-black shadow-md shadow-blue-100">
                    {user?.name?.charAt(0)}
                </div>

                {/* Informasi Utama */}
                <div className="text-center sm:text-slate-700 sm:text-left space-y-1">
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">{user?.name}</h2>
                    <p className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-0.5 rounded-full inline-block">
                        {user?.email === 'admin@admin.com' ? 'Administrator' : 'Testing Member'}
                    </p>
                    <p className="text-sm text-slate-400 mt-2">ID Pengguna: {user?.id || 'USR-2026'}</p>
                </div>
            </div>

            {/* Detail Tambahan */}
            <div className="mt-6 space-y-4">
                <h3 className="text-md font-bold text-slate-800 tracking-wide uppercase text-xs text-slate-400">Detail Akun</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <span className="block text-xs font-bold text-slate-400 uppercase">Alamat Email</span>
                        <span className="text-sm font-semibold text-slate-700">{user?.email}</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <span className="block text-xs font-bold text-slate-400 uppercase">Status Workspace</span>
                        <span className="text-sm font-semibold text-emerald-600 flex items-center gap-1">🟢 Aktif</span>
                    </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mt-2">
                    <span className="block text-xs font-bold text-slate-400 uppercase">Bio / Deskripsi</span>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        Akun ini digunakan khusus untuk melakukan pengujian sistem pada Mini Kanban Board Application (Front-End & Back-End Integration Test).
                    </p>
                </div>
            </div>
        </div>
    );
}