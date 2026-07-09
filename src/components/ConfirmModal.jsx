/* eslint-disable react/prop-types */
export default function ConfirmModal({ isOpen, message, onConfirm, onCancel }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl border border-slate-100 animate-fade-in">
                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 mx-auto mb-4">
                    <span className="text-2xl">🗑️</span>
                </div>

                {/* Judul */}
                <h3 className="text-lg font-bold text-slate-800 text-center mb-2">
                    Hapus Tugas?
                </h3>

                {/* Pesan */}
                <p className="text-sm text-slate-500 text-center mb-6">
                    {message || 'Tindakan ini tidak dapat dibatalkan.'}
                </p>

                {/* Tombol Aksi */}
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2.5 text-slate-600 font-bold text-sm border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2.5 bg-rose-500 text-white font-bold text-sm rounded-xl hover:bg-rose-600 shadow-sm hover:scale-[1.02] transition-all"
                    >
                        Ya, Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}
