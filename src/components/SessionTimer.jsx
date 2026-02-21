import { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { Timer } from 'lucide-react';

const SessionTimer = ({ startMinutes = 5 }) => {
    const [timeLeft, setTimeLeft] = useState(startMinutes * 60);
    const { showToast } = useToast();
    const { logout } = useAuth();
    const [hasNotified, setHasNotified] = useState(false);

    useEffect(() => {
        if (timeLeft < 0) return;

        if (timeLeft === 0) {
            showToast('Session expired. Logging out...', 'error');
            setTimeout(() => {
                logout();
            }, 2000);
            return;
        }

        const intervalId = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        // Notify when 1 minute remains (60 seconds)
        if (timeLeft === 60 && !hasNotified) {
            showToast('Only 1 minute left before auto-logout!', 'warning');
            setHasNotified(true);
        }

        return () => clearInterval(intervalId);
    }, [timeLeft, showToast, hasNotified, logout]);

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
                {timeLeft > 0 ? formatTime(timeLeft) : "00:00"}
            </span>
        </div>
    );
};

export default SessionTimer;
