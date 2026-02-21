import { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose, duration = 4000 }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 400); // Wait for exit animation
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const icons = {
        success: <CheckCircle size={22} className="text-emerald-500" />,
        error: <AlertCircle size={22} className="text-rose-500" />,
        warning: <AlertTriangle size={22} className="text-amber-500" />,
        info: <Info size={22} className="text-indigo-500" />
    };

    const styles = {
        success: 'border-emerald-100 bg-emerald-50/80 backdrop-blur-md text-emerald-900 shadow-emerald-500/10',
        error: 'border-rose-100 bg-rose-50/80 backdrop-blur-md text-rose-900 shadow-rose-500/10',
        warning: 'border-amber-100 bg-amber-50/80 backdrop-blur-md text-amber-900 shadow-amber-500/10',
        info: 'border-indigo-100 bg-indigo-50/80 backdrop-blur-md text-indigo-900 shadow-indigo-500/10'
    };

    return (
        <div
            className={`fixed top-6 right-6 z-[9999] flex items-center gap-4 px-5 py-4 rounded-2xl border shadow-2xl transition-all duration-500 ease-out transform ${isVisible
                    ? 'translate-y-0 opacity-100 scale-100'
                    : 'translate-y-[-20px] opacity-0 scale-95'
                } ${styles[type]}`}
            style={{ maxWidth: '400px' }}
        >
            <div className="flex-shrink-0 animate-bounce-subtle">{icons[type]}</div>
            <div className="flex-1">
                <p className="text-sm font-bold tracking-tight capitalize mb-0.5">{type}</p>
                <p className="text-sm font-medium opacity-90">{message}</p>
            </div>
            <button
                onClick={() => {
                    setIsVisible(false);
                    setTimeout(onClose, 400);
                }}
                className="p-1.5 rounded-xl hover:bg-black/5 text-gray-400 hover:text-gray-900 transition-all duration-200"
            >
                <X size={18} />
            </button>
        </div>
    );
};

export default Toast;
