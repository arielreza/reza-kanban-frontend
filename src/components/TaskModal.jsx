/* eslint-disable react/prop-types */
export default function TaskModal({
    isOpen, onClose, onSubmit, title, submitLabel, submitColor,
    taskTitle, setTaskTitle, taskDesc, setTaskDesc,
    taskPriority, setTaskPriority, taskStatus, setTaskStatus,
    taskDeadline, setTaskDeadline, columns
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-800 mb-4">{title}</h3>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Judul Tugas *</label>
                        <input
                            type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}
                            placeholder="Masukkan judul tugas..." className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Deskripsi</label>
                        <textarea
                            value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)}
                            placeholder="Masukkan detail deskripsi..." className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-20 resize-none"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Prioritas *</label>
                            <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white">
                                <option value="Low">Low</option><option value="Medium">Medium</option><option value="High">High</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Kolom Tujuan *</label>
                            <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white">
                                {columns.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Deadline</label>
                        <input type="date" value={taskDeadline} onChange={(e) => setTaskDeadline(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm" />
                    </div>
                    <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-slate-500 font-bold text-sm hover:bg-slate-50 rounded-xl">Batal</button>
                        <button type="submit" className={`px-5 py-2 ${submitColor} text-white font-bold text-sm rounded-xl`}>{submitLabel}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}