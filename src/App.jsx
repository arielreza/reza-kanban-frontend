import { useState, useEffect } from 'react';
import { initialTasks } from './utils/initialData';
import Login from './components/Login';
import TaskCard from './components/TaskCard';
import TaskModal from './components/TaskModal';
import UserProfile from './components/UserProfile';
import Toast from './components/Toast';
import ConfirmModal from './components/ConfirmModal';

function App() {
  // State Dark Mode — baca dari localStorage, default false
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('kanban-darkMode') === 'true';
  });

  // Sinkronkan class 'dark' ke <html> setiap kali isDarkMode berubah
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('kanban-darkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  // State Autentikasi
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('board');

  // State Form Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // STATE UTAMA: Menyimpan data kartu kanban
  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState('');

  // --- STATE: Manajemen Toast Notification ---
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
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

  // Fungsi Login & Logout
  const handleLogin = (e) => {
    e.preventDefault(); setError('');
    if (!email || !password) { setError('Email dan password wajib diisi.'); return; }
    if ((email === 'admin@admin.com' && password === 'password123') || (email === 'user1@example.com' && password === 'password123')) {
      setIsLoggedIn(true);
      setUser({ id: email === 'admin@admin.com' ? 'USR-ADMIN' : 'USR-TEST-01', name: email === 'admin@admin.com' ? 'Admin User' : 'User Testing 1', email: email });
      setCurrentView('board');
      showToast('Selamat datang kembali!', 'success');
    } else { setError('Email atau password salah!'); }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); setUser(null); setEmail(''); setPassword(''); setSearchTerm('');
    showToast('Berhasil keluar akun', 'info');
  };

  // Fungsi CRUD dengan Trigger Toast
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newTask = { id: Date.now().toString(), title: newTitle, description: newDescription, priority: newPriority, deadline: newDeadline, status: newStatus };
    setTasks([...tasks, newTask]);
    setNewTitle(''); setNewDescription(''); setNewPriority('Medium'); setNewDeadline(''); setNewStatus('Backlog'); setIsModalOpen(false);
    showToast('Tugas baru berhasil ditambahkan!');
  };

  const openEditModal = (task) => {
    setEditingTaskId(task.id); setEditTitle(task.title); setEditDescription(task.description); setEditPriority(task.priority); setEditDeadline(task.deadline); setEditStatus(task.status); setIsEditModalOpen(true);
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();
    const updatedTasks = tasks.map((task) => task.id === editingTaskId ? { ...task, title: editTitle, description: editDescription, priority: editPriority, deadline: editDeadline, status: editStatus } : task);
    setTasks(updatedTasks); setIsEditModalOpen(false); setEditingTaskId(null);
    showToast('Tugas berhasil diperbarui!');
  };

  const handleDeleteTask = (taskId) => {
    setConfirmModal({ show: true, taskId });
  };

  const handleConfirmDelete = () => {
    setTasks(tasks.filter((task) => task.id !== confirmModal.taskId));
    setConfirmModal({ show: false, taskId: null });
    showToast('Tugas berhasil dihapus', 'info');
  };

  const handleCancelDelete = () => {
    setConfirmModal({ show: false, taskId: null });
  };

  // Drag & Drop Handlers
  const handleDragStart = (taskId) => setDraggedTaskId(taskId);
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (targetColumn) => {
    if (!draggedTaskId) return;
    setTasks(tasks.map((task) => task.id === draggedTaskId ? { ...task, status: targetColumn } : task));
    setDraggedTaskId(null);
    showToast(`Kartu dipindahkan ke ${targetColumn}`);
  };

  const columns = ['Backlog', 'To Do', 'In Progress', 'Done'];
  const filteredTasksBySearch = tasks.filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-start p-6 font-sans select-none transition-colors duration-300">
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
            <div className="animate-fade-in duration-300">
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 mb-6 gap-4 transition-colors duration-300">
                <div>
                  <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Workspace Kanban</h1>
                  <p className="text-sm text-slate-400 dark:text-slate-500">Selamat bekerja, <button onClick={() => setCurrentView('profile')} className="font-bold text-blue-600 hover:underline cursor-pointer">{user?.name} 👤</button></p>
                </div>
                <div className="w-full md:w-72 relative">
                  <input
                    type="text" placeholder="🔍 Cari tugas berdasarkan judul..."
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-xl text-sm bg-slate-50 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-400 focus:bg-white dark:focus:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  />
                </div>
                <div className="flex gap-3">
                  {/* Dark Mode Toggle */}
                  <button
                    onClick={toggleDarkMode}
                    title={isDarkMode ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
                    className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
                  >
                    {isDarkMode ? '☀️' : '🌙'}
                  </button>
                  <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 shadow-md hover:scale-[1.02] transition-all">+ Tambah Tugas</button>
                  <button onClick={handleLogout} className="bg-rose-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-rose-600 shadow-sm transition-all">Logout</button>
                </div>
              </div>

              {/* Board Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {columns.map((col) => {
                  const filteredTasks = filteredTasksBySearch.filter((task) => task.status === col);
                  return (
                    <div
                      key={col}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(col)}
                      className="bg-slate-100/80 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200/60 dark:border-slate-700 min-h-[500px] flex flex-col hover:border-slate-300 dark:hover:border-slate-500 transition-all duration-300"
                    >
                      <div className="flex justify-between items-center mb-4 px-1">
                        <h3 className="font-bold text-slate-700 dark:text-slate-200 text-md">{col}</h3>
                        <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold px-2.5 py-0.5 rounded-full">{filteredTasks.length}</span>
                      </div>
                      <div className="space-y-3 flex-1 overflow-y-auto">
                        {filteredTasks.map((task) => (
                          <div key={task.id} className="hover:scale-[1.02] transition-transform duration-200">
                            <TaskCard task={task} onEdit={openEditModal} onDelete={handleDeleteTask} onDragStart={handleDragStart} />
                          </div>
                        ))}
                        {filteredTasks.length === 0 && (
                          <div className="text-center py-8 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-400 dark:text-slate-600">
                            {searchTerm ? 'Tidak ada hasil' : 'Belum ada tugas'}
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
            <div className="animate-fade-in">
              <UserProfile user={user} onBack={() => setCurrentView('board')} onLogout={handleLogout} />
            </div>
          )}

          {/* Modals */}
          <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddTask} title="Tambah Tugas Baru" submitLabel="Simpan Tugas" submitColor="bg-blue-600 hover:bg-blue-700" taskTitle={newTitle} setTaskTitle={setNewTitle} taskDesc={newDescription} setTaskDesc={setNewDescription} taskPriority={newPriority} setTaskPriority={setNewPriority} taskStatus={newStatus} setTaskStatus={setNewStatus} taskDeadline={newDeadline} setTaskDeadline={setNewDeadline} columns={columns} />
          <TaskModal isOpen={isEditModalOpen} onClose={() => { setIsEditModalOpen(false); setEditingTaskId(null); }} onSubmit={handleUpdateTask} title="✏️ Edit Tugas" submitLabel="Simpan Perubahan" submitColor="bg-emerald-600 hover:bg-emerald-700" taskTitle={editTitle} setTaskTitle={setEditTitle} taskDesc={editDescription} setTaskDesc={setEditDescription} taskPriority={editPriority} setTaskPriority={setEditPriority} taskStatus={editStatus} setTaskStatus={setEditStatus} taskDeadline={editDeadline} setTaskDeadline={setEditDeadline} columns={columns} />
        </div>
      )}

      {/* RENDER TOAST COMPONENT */}
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />
      )}

      {/* RENDER CONFIRM MODAL */}
      <ConfirmModal
        isOpen={confirmModal.show}
        message="Apakah Anda yakin ingin menghapus tugas ini? Tindakan ini tidak dapat dibatalkan."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default App;