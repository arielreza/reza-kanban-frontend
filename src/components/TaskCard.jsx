/* eslint-disable react/prop-types */
export default function TaskCard({ task, onEdit, onDelete, onDragStart }) {
    const getPriorityStyle = (priority) => {
        switch (priority) {
            case 'High': return {
                leftBorder: 'border-l-rose-500',
                cardBg: 'bg-rose-50/50 dark:bg-rose-900/20',
                badge: 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60',
            };
            case 'Medium': return {
                leftBorder: 'border-l-amber-400',
                cardBg: 'bg-amber-50/50 dark:bg-amber-900/20',
                badge: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60',
            };
            case 'Low': return {
                leftBorder: 'border-l-emerald-400',
                cardBg: 'bg-emerald-50/50 dark:bg-emerald-900/20',
                badge: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60',
            };
            default: return {
                leftBorder: 'border-l-slate-300',
                cardBg: 'bg-white dark:bg-slate-700/80',
                badge: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300',
            };
        }
    };

    const style = getPriorityStyle(task.priority);

    return (
        <div
            draggable
            onDragStart={() => onDragStart(task.id)}
            className={`${style.cardBg} rounded-xl shadow border border-slate-200/70 dark:border-slate-600/40 border-l-4 ${style.leftBorder} hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] active:shadow-lg transition-all duration-200 group cursor-grab active:cursor-grabbing overflow-hidden`}
        >
            <div className="p-4">
                {/* Header: Badge + Actions */}
                <div className="flex justify-between items-center mb-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${style.badge}`}>
                        ● {task.priority}
                    </span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <button
                            onClick={() => onEdit(task)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors text-xs"
                            title="Edit tugas"
                        >
                            ✏️
                        </button>
                        <button
                            onClick={() => onDelete(task.id)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-rose-50 dark:bg-rose-900/30 text-rose-500 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors text-xs"
                            title="Hapus tugas"
                        >
                            🗑️
                        </button>
                    </div>
                </div>

                {/* Title */}
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-1.5 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150 line-clamp-2">
                    {task.title}
                </h4>

                {/* Description */}
                {task.description && (
                    <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                        {task.description}
                    </p>
                )}

                {/* Deadline */}
                {task.deadline && (
                    <div className="flex items-center gap-1.5 pt-2.5 border-t border-slate-100 dark:border-slate-600/50 mt-1">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">📅</span>
                        <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">{task.deadline}</span>
                    </div>
                )}
            </div>
        </div>
    );
}