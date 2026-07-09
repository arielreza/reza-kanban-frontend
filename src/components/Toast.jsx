/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

export default function Toast({ message, type, onClose }) {
    // State untuk mengontrol animasi keluar (fade-out)
    const [isLeaving, setIsLeaving] = useState(false);

    useEffect(() => {
        // Jalankan animasi keluar setelah 2.7 detik (300ms sebelum ditutup total)
        const leaveTimer = setTimeout(() => {
            setIsLeaving(true);
        }, 2700);

        // Tutup total komponen setelah 3 detik
        const closeTimer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => {
            clearTimeout(leaveTimer);
            clearTimeout(closeTimer);
        };
    }, [onClose]);

    const bgColor = type === 'success' ? 'bg-emerald-500' : type === 'error' ? 'bg-rose-500' : 'bg-blue-500';

    return (
        <div
            className={`fixed bottom-5 right-5 ${bgColor} text-white px-5 py-3 rounded-xl shadow-lg font-bold text-sm z-50 flex items-center gap-2 transition-all duration-300 transform
        ${isLeaving ? 'opacity-0 translate-y-2 scale-95' : 'opacity-100 translate-y-0 scale-100 animate-bounce'}
      `}
        >
            <span>{type === 'success' ? '✅' : 'ℹ️'}</span>
            {message}
        </div>
    );
}