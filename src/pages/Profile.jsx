import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { User, Lock, Mail, Edit3, Settings, Shield, Calendar } from 'lucide-react';

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                password: user.password || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            updateProfile(formData);
            showToast('Profile updated successfully!', 'success');
            setIsEditing(false);
        } catch (err) {
            showToast('Failed to update profile.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in font-sans pb-10">
            {/* Header Card */}
            <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 transition-all hover:shadow-[0_25px_60px_rgba(0,0,0,0.05)]">
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6">
                    {/* Avatar Initials */}
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-indigo-100 uppercase">
                        {getInitials(formData.name)}
                    </div>

                    <div className="text-center sm:text-left space-y-1">
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">{formData.name || 'User'}</h1>
                        <p className="text-gray-400 font-bold">{formData.email}</p>
                        <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[11px] font-black uppercase tracking-wider">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                Active Session
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 transition-all active:scale-95 group font-black text-sm ${isEditing
                            ? 'border-red-100 text-red-500 hover:bg-red-50'
                            : 'border-slate-50 text-slate-500 hover:bg-slate-50'
                            }`}
                    >
                        {isEditing ? (
                            <>
                                <Lock size={16} />
                                Cancel Edit
                            </>
                        ) : (
                            <>
                                <Edit3 size={16} className="group-hover:text-indigo-600" />
                                Edit Profile
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Form */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100">
                        <div className="flex items-center gap-3 mb-10 pb-4 border-b border-gray-50">
                            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                                <User size={20} />
                            </div>
                            <h2 className="text-xl font-black text-gray-900 tracking-tight">Personal Information</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                id="name"
                                label="Full Name"
                                type="text"
                                icon={User}
                                placeholder="Display Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                disabled={!isEditing}
                                className={!isEditing ? "opacity-60 bg-slate-50/30 cursor-not-allowed" : ""}
                            />

                            <Input
                                id="email"
                                label="Email Address"
                                type="email"
                                icon={Mail}
                                value={formData.email}
                                onChange={handleChange}
                                disabled
                                className="opacity-60 bg-slate-50/50 cursor-not-allowed"
                            />

                            <Input
                                id="password"
                                label="Update Password"
                                type="password"
                                icon={Lock}
                                placeholder="Enter new password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                disabled={!isEditing}
                                className={!isEditing ? "opacity-60 bg-slate-50/30 cursor-not-allowed" : ""}
                            />

                            {isEditing && (
                                <div className="pt-6 border-t border-gray-50 flex justify-end animate-fade-in">
                                    <Button
                                        type="submit"
                                        isLoading={loading}
                                        className="!w-auto px-10 !py-4 !rounded-2xl !bg-indigo-600 shadow-xl shadow-indigo-100 hover:scale-[1.02] active:scale-[0.98] transition-all font-black text-lg"
                                    >
                                        Save Changes
                                    </Button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                {/* Right Column - Account Stats/Details */}
                <div className="space-y-6">
                    <div className="bg-white rounded-[2rem] p-8 shadow-[0_20px_50_rgba(0,0,0,0.03)] border border-gray-100">
                        <h3 className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-6">Account Details</h3>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-50 text-slate-400 rounded-lg">
                                        <Shield size={16} />
                                    </div>
                                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Account Type</span>
                                </div>
                                <span className="text-sm font-black text-gray-900">Standard User</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-50 text-slate-400 rounded-lg">
                                        <Calendar size={16} />
                                    </div>
                                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Member Since</span>
                                </div>
                                <span className="text-sm font-black text-gray-900">{user?.memberSince || 'February 2026'}</span>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-50">
                            <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest leading-relaxed">
                                Manage your account credentials and personal preferences from this panel.
                            </p>
                        </div>
                    </div>

                    {/* Pro Tip Card */}
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2rem] p-8 shadow-2xl shadow-indigo-200 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-125 transition-transform duration-700">
                            <Shield size={120} />
                        </div>
                        <h4 className="text-lg font-black mb-3 pr-4">Security Tip</h4>
                        <p className="text-sm text-indigo-100 font-medium leading-relaxed opacity-90">
                            Keep your password strong and unique. We recommend changing it every 3 months.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
