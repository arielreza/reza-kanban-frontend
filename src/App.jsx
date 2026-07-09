import { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import Login from './components/Login';
import TaskCard from './components/TaskCard';
import TaskModal from './components/TaskModal';
import UserProfile from './components/UserProfile';
import Toast from './components/Toast';
import ConfirmModal from './components/ConfirmModal';

// Konfigurasi URL base API Laravel
const API_BASE_URL = 'http://localhost:8000/api';

const colConfig = {
  'Backlog': { topBorder: 'border-t-4 border-t-slate-300 dark:border-t-slate-500', badge: 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300', dot: 'bg-slate-400' },
  'To Do': { topBorder: 'border-t-4 border-t-blue-400 dark:border-t-blue-500', badge: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300', dot: 'bg-blue-400' },
  'In Progress': { topBorder: 'border-t-4 border-t-amber-400 dark:border-t-amber-500', badge: 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300', dot: 'bg-amber-400' },
  'Done': { topBorder: 'border-t-4 border-t-emerald-400 dark:border-t-emerald-500', badge: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300', dot: 'bg-emerald-400' },
};

function App() {
  // State Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('kanban-darkMode') === 'true');

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('kanban-darkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  // State Autentikasi Nyata
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('board');

  // State Form Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // STATE UTAMA: Tugas ditarik dari DB MySQL
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');

  // STATE: Manajemen Toast Notification
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  // --- EFFECT: Cek Session Token saat web direfresh ---
  useEffect(() => {
    const token = localStorage.getItem('kanban-token');
    const savedUser = localStorage.getItem('kanban-user');
    if (token && savedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(savedUser));
      fetchTasks(token);
    }
  }, []);

  // --- API FETCH: Ambil data tugas milik user aktif ---
  const fetchTasks = async (token) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Gagal mengambil data tugas:", err);
    }
  };

  // State TAMBAH Card
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newDeadline, setNewDeadline] = useState('');
  const [newStatus, setNewStatus] = useState('Backlog');

  // State EDIT Card
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPriority, setEditPriority] = useState('Medium');
  const [editDeadline, setEditDeadline] = useState('');
  const [editStatus, setEditStatus] = useState('Backlog');

  // State Drag and Drop
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  // State Konfirmasi Hapus
  const [confirmModal, setConfirmModal] = useState({ show: false, taskId: null });

  // --- API: Fungsi Login Nyata ke Laravel ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email dan password wajib diisi.');
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/login`, { email, password });
      const { token, user: userData } = res.data;

      localStorage.setItem('kanban-token', token);
      localStorage.setItem('kanban-user', JSON.stringify(userData));

      setIsLoggedIn(true);
      setUser(userData);
      setCurrentView('board');
      fetchTasks(token);
      showToast('Selamat datang kembali!', 'success');
    } catch (err) {
      setError(err.response?.data?.message || 'Email atau password salah!');
    }
  };

  // --- API: Fungsi Logout Nyata ---
  const handleLogout = async () => {
    const token = localStorage.getItem('kanban-token');
    try {
      await axios.post(`${API_BASE_URL}/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error("Logout backend error:", err);
    }

    localStorage.removeItem('kanban-token');
    localStorage.removeItem('kanban-user');
    setIsLoggedIn(false);
    setUser(null);
    setEmail('');
    setPassword('');
    setSearchTerm('');
    setFilterPriority('All');
    setTasks([]);
    showToast('Berhasil keluar akun', 'info');
  };

  // --- API: Fungsi Tambah Tugas Baru Ke MySQL ---
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const token = localStorage.getItem('kanban-token');
    try {
      const res = await axios.post(`${API_BASE_URL}/tasks`, {
        title: newTitle,
        description: newDescription,
        priority: newPriority,
        deadline: newDeadline,
        status: newStatus
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTasks([...tasks, res.data]);
      setNewTitle(''); setNewDescription(''); setNewPriority('Medium'); setNewDeadline(''); setNewStatus('Backlog'); setIsModalOpen(false);
      showToast('Tugas baru berhasil ditambahkan!');
    } catch (err) {
      console.error("Gagal menambahkan tugas:", err);
    }
  };

  const openEditModal = (task) => {
    setEditingTaskId(task.id); setEditTitle(task.title); setEditDescription(task.description); setEditPriority(task.priority); setEditDeadline(task.deadline || ''); setEditStatus(task.status); setIsEditModalOpen(true);
  };

  // --- API: Fungsi Edit Simpan Perubahan Tugas ---
  const handleUpdateTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('kanban-token');

    try {
      const res = await axios.put(`${API_BASE_URL}/tasks/${editingTaskId}`, {
        title: editTitle,
        description: editDescription,
        priority: editPriority,
        deadline: editDeadline,
        status: editStatus
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const updatedTasks = tasks.map((task) => task.id === editingTaskId ? res.data : task);
      setTasks(updatedTasks);
      setIsEditModalOpen(false);
      setEditingTaskId(null);
      showToast('Tugas berhasil diperbarui!');
    } catch (err) {
      console.error("Gagal mengupdate tugas:", err);
    }
  };

  const handleDeleteTask = (taskId) => {
    setConfirmModal({ show: true, taskId });
  };

  // --- API: Fungsi Hapus Permanen dari MySQL ---
  const handleConfirmDelete = async () => {
    const token = localStorage.getItem('kanban-token');
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${confirmModal.taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTasks(tasks.filter((task) => task.id !== confirmModal.taskId));
      setConfirmModal({ show: false, taskId: null });
      showToast('Tugas berhasil dihapus', 'info');
    } catch (err) {
      console.error("Gagal menghapus tugas:", err);
    }
  };

  const handleCancelDelete = () => {
    setConfirmModal({ show: false, taskId: null });
  };

  // --- API: Drag & Drop (Menggunakan Request PATCH Khusus) ---
  const handleDragStart = (taskId) => setDraggedTaskId(taskId);
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = async (targetColumn) => {
    if (!draggedTaskId) return;

    const token = localStorage.getItem('kanban-token');
    
    // Optimistic UI Update
    // Simpan status asal untuk fallback/rollback jika error
    const taskToMove = tasks.find(t => t.id === draggedTaskId);
    const originalStatus = taskToMove?.status;
    
    // Jangan lakukan apa-apa jika drop di kolom yang sama
    if (originalStatus === targetColumn) {
      setDraggedTaskId(null);
      return;
    }

    // 1. Update UI secara instan (tanpa menunggu API)
    setTasks(tasks.map((task) => task.id === draggedTaskId ? { ...task, status: targetColumn } : task));
    setDraggedTaskId(null);

    // 2. Request API di background
    try {
      await axios.patch(`${API_BASE_URL}/tasks/${draggedTaskId}/status`, {
        status: targetColumn
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // 3. Tampilkan toast sukses jika API berhasil
      showToast(`Kartu dipindahkan ke ${targetColumn}`);
    } catch (err) {
      console.error("Gagal memindahkan kolom kartu:", err);
      // 4. Rollback state jika API gagal
      setTasks(tasks.map((task) => task.id === draggedTaskId ? { ...task, status: originalStatus } : task));
      showToast('Gagal memindahkan kartu. Koneksi bermasalah.', 'error');
    }
  };

  const columns = ['Backlog', 'To Do', 'In Progress', 'Done'];
  const priorities = ['All', 'High', 'Medium', 'Low'];
  const filteredTasksBySearch = tasks
    .filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((task) => filterPriority === 'All' || task.priority === filterPriority);

  return (
    <div className={`min-h-screen font-sans select-none transition-all duration-500 flex flex-col
      ${!isLoggedIn
        ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-950 items-center justify-center p-6'
        : 'bg-gradient-to-br from-blue-200 via-slate-200 to-indigo-200/70 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 items-center justify-start p-6'
      }`
    }>

      {!isLoggedIn ? (
        <Login
          email={email} setEmail={setEmail}
          password={password} setPassword={setPassword}
          error={error} onLogin={handleLogin}
          isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}
        />
      ) : (
        <div className="w-full max-w-7xl">
          {currentView === 'board' && (
            <div className="animate-fade-in">
              {/* ========== HEADER ========== */}
              <div className="grid grid-cols-1 md:grid-cols-3 items-center bg-white dark:bg-slate-800/80 backdrop-blur-md px-5 py-4 rounded-2xl shadow-md border border-slate-200/80 dark:border-slate-700/60 mb-5 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-white text-sm font-black">K</span>
                  </div>
                  <div>
                    <h1 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight leading-none">Workspace Kanban</h1>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      Selamat bekerja,{' '}
                      <button onClick={() => setCurrentView('profile')} className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
                        {user?.name} 👤
                      </button>
                    </p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <input
                    type="text" placeholder="🔍 Cari tugas..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-xs px-4 py-2.5 border border-slate-200 dark:border-slate-600 rounded-xl text-sm bg-slate-50 dark:bg-slate-700 dark:text-slate-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <button onClick={toggleDarkMode} className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-2.5 rounded-xl text-sm hover:bg-slate-200 transition-all">
                    {isDarkMode ? '☀️' : '🌙'}
                  </button>
                  <button onClick={() => setIsModalOpen(true)} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md hover:scale-[1.02] transition-all">
                    + Tambah
                  </button>
                  <button onClick={handleLogout} className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-rose-500 hover:text-white transition-all">
                    Logout
                  </button>
                </div>
              </div>

              {/* ========== FILTER PRIORITAS ========== */}
              <div className="flex items-center gap-2 mb-5 flex-wrap bg-white dark:bg-slate-800/60 backdrop-blur-sm px-4 py-3 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mr-1">Prioritas:</span>
                {priorities.map((p) => {
                  const isActive = filterPriority === p;
                  const colorMap = {
                    All: isActive ? 'bg-slate-700 dark:bg-slate-200 text-white dark:text-slate-800 shadow-sm' : 'bg-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700',
                    High: isActive ? 'bg-rose-500 text-white shadow-sm' : 'bg-transparent text-rose-500 dark:text-rose-400 hover:bg-rose-50',
                    Medium: isActive ? 'bg-amber-400 text-white shadow-sm' : 'bg-transparent text-amber-500 dark:text-amber-400 hover:bg-amber-50',
                    Low: isActive ? 'bg-emerald-500 text-white shadow-sm' : 'bg-transparent text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50',
                  };
                  return (
                    <button key={p} onClick={() => setFilterPriority(p)} className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 ${colorMap[p]} ${isActive ? 'scale-[1.04]' : ''}`}>
                      {p === 'All' ? 'Semua' : p === 'High' ? '🔴 High' : p === 'Medium' ? '🟡 Medium' : '🟢 Low'}
                    </button>
                  );
                })}
              </div>

              {/* ========== BOARD GRID ========== */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {columns.map((col) => {
                  const cfg = colConfig[col];
                  const filteredTasks = filteredTasksBySearch.filter((task) => task.status === col);
                  return (
                    <div key={col} onDragOver={handleDragOver} onDrop={() => handleDrop(col)} className={`bg-white dark:bg-slate-800/70 rounded-2xl border border-slate-200 dark:border-slate-700/60 min-h-[520px] flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${cfg.topBorder}`}>
                      <div className="flex justify-between items-center px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                          <h3 className="font-bold text-slate-700 dark:text-slate-200 text-sm">{col}</h3>
                        </div>
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${cfg.badge}`}>{filteredTasks.length}</span>
                      </div>
                      <div className="mx-4 border-t border-slate-100 dark:border-slate-700/60 mb-3" />
                      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-2.5">
                        {filteredTasks.map((task) => (
                          <div key={task.id} className="hover:scale-[1.01] transition-transform duration-150">
                            <TaskCard task={task} onEdit={openEditModal} onDelete={handleDeleteTask} onDragStart={handleDragStart} />
                          </div>
                        ))}
                        {filteredTasks.length === 0 && (
                          <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 dark:text-slate-600 mt-2">
                            <span className="text-3xl mb-2 opacity-50">📭</span>
                            <p className="text-xs font-medium text-center">{searchTerm || filterPriority !== 'All' ? 'Tidak ada hasil' : 'Belum ada tugas'}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {currentView === 'profile' && (
            <UserProfile user={user} onBack={() => setCurrentView('board')} onLogout={handleLogout} />
          )}

          <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddTask} title="✨ Tambah Tugas Baru" submitLabel="Simpan Tugas" submitColor="bg-gradient-to-r from-blue-600 to-indigo-600" taskTitle={newTitle} setTaskTitle={setNewTitle} taskDesc={newDescription} setTaskDesc={setNewDescription} taskPriority={newPriority} setTaskPriority={setNewPriority} taskStatus={newStatus} setTaskStatus={setNewStatus} taskDeadline={newDeadline} setTaskDeadline={setNewDeadline} columns={columns} />
          <TaskModal isOpen={isEditModalOpen} onClose={() => { setIsEditModalOpen(false); setEditingTaskId(null); }} onSubmit={handleUpdateTask} title="✏️ Edit Tugas" submitLabel="Simpan Perubahan" submitColor="bg-gradient-to-r from-emerald-600 to-teal-600" taskTitle={editTitle} setTaskTitle={setEditTitle} taskDesc={editDescription} setTaskDesc={setEditDescription} taskPriority={editPriority} setTaskPriority={setEditPriority} taskStatus={editStatus} setTaskStatus={setEditStatus} taskDeadline={editDeadline} setTaskDeadline={setEditDeadline} columns={columns} />
        </div>
      )}

      {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />}
      <ConfirmModal isOpen={confirmModal.show} message="Apakah Anda yakin ingin menghapus tugas ini? Tindakan ini tidak dapat dibatalkan." onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
    </div>
  );
}

export default App;