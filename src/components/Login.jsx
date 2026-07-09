/* eslint-disable react/prop-types */
export default function Login({ email, setEmail, password, setPassword, error, onLogin }) {
    return (
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100 mt-20">
            <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-2">Mini Kanban</h2>
            <p className="text-sm text-center text-slate-400 mb-6">Silakan masuk ke akun Anda</p>

            {error && (
                <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-3 text-sm text-red-700 rounded-r-lg">
                    {error}
                </div>
            )}

            <form onSubmit={onLogin} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Email</label>
                    <input
                        type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@admin.com" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Password</label>
                    <input
                        type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition duration-200 shadow-md shadow-blue-200">
                    Sign In
                </button>
            </form>
        </div>
    );
}