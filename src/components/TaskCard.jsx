/* eslint-disable react/prop-types */
export default function TaskCard({ task, onEdit, onDelete, onDragStart }) {
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'bg-red-100 text-red-700 border-red-200';
            case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Low': return 'bg-green-100 text-green-700 border-green-200';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div
            draggable
            onDragStart={() => onDragStart(task.id)}
            className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/40 hover:shadow-md transition group relative cursor-grab active:cursor-grabbing"
        >
            <div className="flex justify-between items-start mb-2">
                <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md border ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                </span>

                <div className="flex gap-1.5 opacity-60 group-hover:opacity-100 transition">
                    <button onClick={() => onEdit(task)} className="text-slate-400 hover:text-blue-600 text-xs font-semibold p-0.5">✏️</button>
                    <button onClick={() => onDelete(task.id)} className="text-slate-400 hover:text-rose-600 text-xs font-semibold p-0.5">🗑️</button>
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
    );
}