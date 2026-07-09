import { useState } from 'react';
import { initialTasks } from './utils/initialData';

function App() {
  // State Autentikasi
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // State Form Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // STATE UTAMA: Menyimpan data kartu kanban
  const [tasks, setTasks] = useState(initialTasks);

  // Fungsi Login
  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email dan password wajib diisi.');
      return;
    }

    if (
      (email === 'admin@admin.com' && password === 'password123') ||
      (email === 'user1@example.com' && password === 'password123')
    ) {
      setIsLoggedIn(true);
      setUser({
        name: email === 'admin@admin.com' ? 'Admin User' : 'User Testing 1',
        email: email
      });
    } else {
      setError('Email atau password salah!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setEmail('');
    setPassword('');
  };

  // Definisi 4 Kolom Utama Kanban
  const columns = ['Backlog', 'To Do', 'In Progress', 'Done'];

  // Helper fungsi untuk mewarnai badge prioritas agar UI tambah rapi
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-start p-6 font-sans">
      {!isLoggedIn ? (
        // --- HALAMAN LOGIN ---
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100 mt-20">
          <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-2">Mini Kanban</h2>
          <p className="text-sm text-center text-slate-400 mb-6">Silakan masuk ke akun Anda</p>

          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-3 text-sm text-red-700 rounded-r-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@admin.com"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition duration-200 shadow-md shadow-blue-200"
            >
              Sign In
            </button>
          </form>
        </div>
      ) : (
        // --- HALAMAN UTAMA KANBAN BOARD ---
        <div className="w-full max-w-7xl">
          {/* Header Workspace */}
          <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-8">
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">Workspace Kanban</h1>
              <p className="text-sm text-slate-400">Selamat bekerja, <span className="font-semibold text-slate-600">{user?.name}</span> ({user?.email})</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-rose-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-rose-600 transition shadow-sm shadow-rose-100"
            >
              Logout
            </button>
          </div>

          {/* Grid 4 Kolom Kanban */}
          <div className="grid grid-cols-1 md-grid-cols-2 lg:grid-cols-4 gap-5">
            {columns.map((col) => {
              // Filter data kartu sesuai status kolom saat ini
              const filteredTasks = tasks.filter((task) => task.status === col);

              return (
                <div key={col} className="bg-slate-100/80 rounded-2xl p-4 border border-slate-200/60 min-h-[500px] flex flex-col">
                  {/* Judul Kolom & Badge Jumlah Item */}
                  <div className="flex justify-between items-center mb-4 px-1">
                    <h3 className="font-bold text-slate-700 tracking-wide text-md">{col}</h3>
                    <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {filteredTasks.length}
                    </span>
                  </div>

                  {/* Isi Kolom / List Cards */}
                  <div className="space-y-3 flex-1 overflow-y-auto">
                    {filteredTasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/40 hover:shadow-md transition group"
                      >
                        {/* Tag Prioritas */}
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md border ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>

                        {/* Judul & Deskripsi Tugas */}
                        <h4 className="font-bold text-slate-800 text-sm mb-1 leading-snug group-hover:text-blue-600 transition">
                          {task.title}
                        </h4>
                        <p className="text-xs text-slate-400 mb-3 line-clamp-2">
                          {task.description || 'Tidak ada deskripsi.'}
                        </p>

                        {/* Deadline */}
                        {task.deadline && (
                          <div className="flex items-center text-[11px] text-slate-400 border-t border-slate-100 pt-2 mt-2">
                            <span className="font-medium">📅 Deadline: {task.deadline}</span>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* State Kosong Jika Kolom Gak Ada Isinya */}
                    {filteredTasks.length === 0 && (
                      <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl text-xs text-slate-400 font-medium">
                        Belum ada tugas
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;