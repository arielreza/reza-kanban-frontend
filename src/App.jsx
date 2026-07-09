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

  // State Untuk Pencarian Tugas
  const [searchTerm, setSearchTerm] = useState('');

  // State Untuk Mengontrol Modal & Form TAMBAH Card
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newDeadline, setNewDeadline] = useState('');
  const [newStatus, setNewStatus] = useState('Backlog');

  // State Untuk Mengontrol Modal & Form EDIT Card
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPriority, setEditPriority] = useState('Medium');
  const [editDeadline, setEditDeadline] = useState('');
  const [editStatus, setEditStatus] = useState('Backlog');

  // --- STATE BARU: Menyimpan ID kartu yang sedang didrag ---
  const [draggedTaskId, setDraggedTaskId] = useState(null);

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
    setSearchTerm('');
  };

  // Fungsi Untuk Menambahkan Card Baru
  const handleAddTask = (e) => {
    e.preventDefault();

    if (!newTitle.trim() || !newPriority || !newStatus) {
      alert('Judul, Prioritas, dan Kolom Tujuan wajib diisi!');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: newTitle,
      description: newDescription,
      priority: newPriority,
      deadline: newDeadline,
      status: newStatus
    };

    setTasks([...tasks, newTask]);

    // Reset Form
    setNewTitle('');
    setNewDescription('');
    setNewPriority('Medium');
    setNewDeadline('');
    setNewStatus('Backlog');
    setIsModalOpen(false);
  };

  // Fungsi Membuka Modal Edit & Set Isi Data Lama
  const openEditModal = (task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditPriority(task.priority);
    setEditDeadline(task.deadline);
    setEditStatus(task.status);
    setIsEditModalOpen(true);
  };

  // Fungsi Menyimpan Perubahan Data Card (Edit)
  const handleUpdateTask = (e) => {
    e.preventDefault();

    if (!editTitle.trim() || !editPriority || !editStatus) {
      alert('Judul, Prioritas, dan Status wajib diisi!');
      return;
    }

    const updatedTasks = tasks.map((task) => {
      if (task.id === editingTaskId) {
        return {
          ...task,
          title: editTitle,
          description: editDescription,
          priority: editPriority,
          deadline: editDeadline,
          status: editStatus
        };
      }
      return task;
    });

    setTasks(updatedTasks);
    setIsEditModalOpen(false);
    setEditingTaskId(null);
  };

  // Fungsi Menghapus Card dengan Konfirmasi
  const handleDeleteTask = (taskId) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus tugas ini?');
    if (confirmDelete) {
      const filteredTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(filteredTasks);
    }
  };

  // --- FUNGSI BARU: DRAG & DROP HANDLERS ---
  const handleDragStart = (taskId) => {
    setDraggedTaskId(taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Wajib diisi agar HTML mengizinkan drop data
  };

  const handleDrop = (targetColumn) => {
    if (!draggedTaskId) return;

    // Update status kolom kartu yang sedang didrag
    const updatedTasks = tasks.map((task) => {
      if (task.id === draggedTaskId) {
        return { ...task, status: targetColumn };
      }
      return task;
    });

    setTasks(updatedTasks);
    setDraggedTaskId(null); // Reset state drag
  };

  // Definisi 4 Kolom Utama Kanban
  const columns = ['Backlog', 'To Do', 'In Progress', 'Done'];

  // Helper fungsi untuk mewarnai badge prioritas
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  // Menyaring tugas berdasarkan pencarian
  const filteredTasksBySearch = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">Workspace Kanban</h1>
              <p className="text-sm text-slate-400">Selamat bekerja, <span className="font-semibold text-slate-600">{user?.name}</span></p>
            </div>

            {/* Input Search */}
            <div className="w-full md:w-72 relative">
              <input
                type="text"
                placeholder="🔍 Cari tugas berdasarkan judul..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50 focus:bg-white transition"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-2.5 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Tombol Akses */}
            <div className="flex gap-3 w-full md:w-auto justify-end">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-sm text-sm"
              >
                + Tambah Tugas
              </button>
              <button
                onClick={handleLogout}
                className="bg-rose-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-rose-600 transition shadow-sm text-sm"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Grid 4 Kolom Kanban */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {columns.map((col) => {
              const filteredTasks = filteredTasksBySearch.filter((task) => task.status === col);

              return (
                // --- INTEGRASI DROP ZONE PADA KOLOM ---
                <div
                  key={col}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(col)}
                  className="bg-slate-100/80 rounded-2xl p-4 border border-slate-200/60 min-h-[500px] flex flex-col transition duration-200 focus-within:bg-slate-200"
                >
                  <div className="flex justify-between items-center mb-4 px-1">
                    <h3 className="font-bold text-slate-700 tracking-wide text-md">{col}</h3>
                    <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {filteredTasks.length}
                    </span>
                  </div>

                  {/* Isi Kolom / List Cards */}
                  <div className="space-y-3 flex-1 overflow-y-auto">
                    {filteredTasks.map((task) => (
                      // --- INTEGRASI DRAGGABLE PADA CARD KANBAN ---
                      <div
                        key={task.id}
                        draggable
                        onDragStart={() => handleDragStart(task.id)}
                        className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/40 hover:shadow-md transition group relative cursor-grab active:cursor-grabbing"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md border ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>

                          <div className="flex gap-1.5 opacity-60 group-hover:opacity-100 transition">
                            <button
                              onClick={() => openEditModal(task)}
                              className="text-slate-400 hover:text-blue-600 text-xs font-semibold p-0.5"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => handleDeleteTask(task.id)}
                              className="text-slate-400 hover:text-rose-600 text-xs font-semibold p-0.5"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>

                        <h4 className="font-bold text-slate-800 text-sm mb-1 leading-snug group-hover:text-blue-600 transition">
                          {task.title}
                        </h4>
                        <p className="text-xs text-slate-400 mb-3 line-clamp-2">
                          {task.description || 'Tidak ada deskripsi.'}
                        </p>

                        {task.deadline && (
                          <div className="flex items-center text-[11px] text-slate-400 border-t border-slate-100 pt-2 mt-2">
                            <span>📅 Deadline: {task.deadline}</span>
                          </div>
                        )}
                      </div>
                    ))}

                    {filteredTasks.length === 0 && (
                      <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl text-xs text-slate-400 font-medium">
                        {searchTerm ? 'Tidak ada hasil cocok' : 'Belum ada tugas'}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* --- MODAL UNTUK TAMBAH CARD --- */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
              <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Tambah Tugas Baru</h3>
                <form onSubmit={handleAddTask} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Judul Tugas *</label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Masukkan judul tugas..."
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Deskripsi</label>
                    <textarea
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      placeholder="Masukkan detail penjelasan deskripsi..."
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-20 resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Prioritas *</label>
                      <select
                        value={newPriority}
                        onChange={(e) => setNewPriority(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Kolom Tujuan *</label>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                      >
                        {columns.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Deadline</label>
                    <input
                      type="date"
                      value={newDeadline}
                      onChange={(e) => setNewDeadline(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 mt-6">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-500 font-bold text-sm hover:bg-slate-50 rounded-xl">Batal</button>
                    <button type="submit" className="px-5 py-2 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700">Simpan Tugas</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* --- MODAL UNTUK EDIT CARD --- */}
          {isEditModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
              <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-800 mb-4">✏️ Edit Tugas</h3>
                <form onSubmit={handleUpdateTask} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Judul Tugas *</label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Deskripsi</label>
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-20 resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Prioritas *</label>
                      <select
                        value={editPriority}
                        onChange={(e) => setEditPriority(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Status/Kolom *</label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                      >
                        {columns.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Deadline</label>
                    <input
                      type="date"
                      value={editDeadline}
                      onChange={(e) => setEditDeadline(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 mt-6">
                    <button type="button" onClick={() => { setIsEditModalOpen(false); setEditingTaskId(null); }} className="px-4 py-2 text-slate-500 font-bold text-sm hover:bg-slate-50 rounded-xl">Batal</button>
                    <button type="submit" className="px-5 py-2 bg-emerald-600 text-white font-bold text-sm rounded-xl hover:bg-emerald-700 transition">Simpan Perubahan</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;