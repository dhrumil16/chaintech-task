import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { User, Lock } from 'lucide-react';

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

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
        } catch (err) {
            showToast('Failed to update profile.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
                <p className="text-gray-500 mt-2">View and edit your personal details.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                {/* Header/Banner */}
                <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
                    <div className="absolute -bottom-12 left-8 p-1 bg-white rounded-2xl shadow-lg">
                        <div className="h-24 w-24 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                            <User size={40} />
                        </div>
                    </div>
                </div>

                <div className="pt-16 pb-8 px-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <Input
                                id="name"
                                label="Display Name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                            />

                            <div className="relative">
                                <Input
                                    id="email"
                                    label="Email Address"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled
                                />
                                <div className="absolute right-4 top-[38px] text-gray-400">
                                    <Lock size={16} />
                                </div>
                            </div>

                            <Input
                                id="password"
                                label="New Password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Update your password"
                            />
                        </div>

                        <div className="flex items-center justify-end pt-4 border-t border-gray-50">
                            <Button type="submit" isLoading={loading} className="!w-auto px-8">
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
