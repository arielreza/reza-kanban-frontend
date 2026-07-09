import { useState } from 'react';
import { initialTasks } from './utils/initialData';
import Login from './components/Login';
import TaskCard from './components/TaskCard';
import TaskModal from './components/TaskModal';

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
  const [searchTerm, setSearchTerm] = useState('');

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

  // Fungsi Login & Logout
  const handleLogin = (e) => {
    e.preventDefault(); setError('');
    if (!email || !password) { setError('Email dan password wajib diisi.'); return; }
    if ((email === 'admin@admin.com' && password === 'password123') || (email === 'user1@example.com' && password === 'password123')) {
      setIsLoggedIn(true);
      setUser({ name: email === 'admin@admin.com' ? 'Admin User' : 'User Testing 1', email: email });
    } else { setError('Email atau password salah!'); }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); setUser(null); setEmail(''); setPassword(''); setSearchTerm('');
  };

  // Fungsi CRUD
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newTask = { id: Date.now().toString(), title: newTitle, description: newDescription, priority: newPriority, deadline: newDeadline, status: newStatus };
    setTasks([...tasks, newTask]);
    setNewTitle(''); setNewDescription(''); setNewPriority('Medium'); setNewDeadline(''); setNewStatus('Backlog'); setIsModalOpen(false);
  };

  const openEditModal = (task) => {
    setEditingTaskId(task.id); setEditTitle(task.title); setEditDescription(task.description); setEditPriority(task.priority); setEditDeadline(task.deadline); setEditStatus(task.status); setIsEditModalOpen(true);
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();
    const updatedTasks = tasks.map((task) => task.id === editingTaskId ? { ...task, title: editTitle, description: editDescription, priority: editPriority, deadline: editDeadline, status: editStatus } : task);
    setTasks(updatedTasks); setIsEditModalOpen(false); setEditingTaskId(null);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  // Drag & Drop Handlers
  const handleDragStart = (taskId) => setDraggedTaskId(taskId);
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (targetColumn) => {
    if (!draggedTaskId) return;
    setTasks(tasks.map((task) => task.id === draggedTaskId ? { ...task, status: targetColumn } : task));
    setDraggedTaskId(null);
  };

  const columns = ['Backlog', 'To Do', 'In Progress', 'Done'];
  const filteredTasksBySearch = tasks.filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-start p-6 font-sans">
      {!isLoggedIn ? (
        <Login email={email} setEmail={setEmail} password={password} setPassword={setPassword} error={error} onLogin={handleLogin} />
      ) : (
        <div className="w-full max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">Workspace Kanban</h1>
              <p className="text-sm text-slate-400">Selamat bekerja, <span className="font-semibold text-slate-600">{user?.name}</span></p>
            </div>
            <div className="w-full md:w-72 relative">
              <input type="text" placeholder="🔍 Cari tugas berdasarkan judul..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 shadow-sm">+ Tambah Tugas</button>
              <button onClick={handleLogout} className="bg-rose-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-rose-600 shadow-sm">Logout</button>
            </div>
          </div>

          {/* Board */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {columns.map((col) => {
              const filteredTasks = filteredTasksBySearch.filter((task) => task.status === col);
              return (
                <div key={col} onDragOver={handleDragOver} onDrop={() => handleDrop(col)} className="bg-slate-100/80 rounded-2xl p-4 border border-slate-200/60 min-h-[500px] flex flex-col">
                  <div className="flex justify-between items-center mb-4 px-1">
                    <h3 className="font-bold text-slate-700 text-md">{col}</h3>
                    <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2.5 py-0.5 rounded-full">{filteredTasks.length}</span>
                  </div>
                  <div className="space-y-3 flex-1 overflow-y-auto">
                    {filteredTasks.map((task) => (
                      <TaskCard key={task.id} task={task} onEdit={openEditModal} onDelete={handleDeleteTask} onDragStart={handleDragStart} />
                    ))}
                    {filteredTasks.length === 0 && <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl text-xs text-slate-400">{searchTerm ? 'Tidak ada hasil' : 'Belum ada tugas'}</div>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Modal Tambah */}
          <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddTask} title="Tambah Tugas Baru" submitLabel="Simpan Tugas" submitColor="bg-blue-600 hover:bg-blue-700" taskTitle={newTitle} setTaskTitle={setNewTitle} taskDesc={newDescription} setTaskDesc={setNewDescription} taskPriority={newPriority} setTaskPriority={setNewPriority} taskStatus={newStatus} setTaskStatus={setNewStatus} taskDeadline={newDeadline} setTaskDeadline={setNewDeadline} columns={columns} />

          {/* Modal Edit */}
          <TaskModal isOpen={isEditModalOpen} onClose={() => { setIsEditModalOpen(false); setEditingTaskId(null); }} onSubmit={handleUpdateTask} title="✏️ Edit Tugas" submitLabel="Simpan Perubahan" submitColor="bg-emerald-600 hover:bg-emerald-700" taskTitle={editTitle} setTaskTitle={setEditTitle} taskDesc={editDescription} setTaskDesc={setEditDescription} taskPriority={editPriority} setTaskPriority={setEditPriority} taskStatus={editStatus} setTaskStatus={setEditStatus} taskDeadline={editDeadline} setTaskDeadline={setEditDeadline} columns={columns} />
        </div>
      )}
    </div>
  );
}

export default App;