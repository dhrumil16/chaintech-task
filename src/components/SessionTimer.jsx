import { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import { Timer } from 'lucide-react';

const SessionTimer = ({ startMinutes = 60 }) => {
    const [timeLeft, setTimeLeft] = useState(startMinutes * 60);
    const { showToast } = useToast();
    const [hasNotified, setHasNotified] = useState(false);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const intervalId = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        // Notify when 1 minute remains
        if (timeLeft === 60 && !hasNotified) {
            showToast('1 minute remaining until session ends!', 'warning');
            setHasNotified(true);
        }

        return () => clearInterval(intervalId);
    }, [timeLeft, showToast, hasNotified]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const isCritical = timeLeft < 60;

    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-500 ${isCritical
                ? 'bg-red-50 border-red-200 text-red-600 animate-pulse'
                : 'bg-indigo-50 border-indigo-100 text-indigo-600'
            }`}>
            <Timer size={16} className={isCritical ? 'animate-spin-slow' : ''} />
            <span className="font-mono font-bold text-sm">
                {formatTime(timeLeft)}
            </span>
        </div>
    );
};

export default SessionTimer;
