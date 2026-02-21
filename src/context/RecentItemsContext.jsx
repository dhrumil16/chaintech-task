import { createContext, useContext, useState, useEffect } from 'react';

const RecentItemsContext = createContext();

export const useRecentItems = () => useContext(RecentItemsContext);

export const RecentItemsProvider = ({ children }) => {
    const [recentItems, setRecentItems] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('recentItems');
        if (saved) {
            try {
                setRecentItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse recent items", e);
            }
        }
    }, []);

    const addRecentItem = (product) => {
        setRecentItems(prev => {
            // Remove if already exists and move to front
            const filtered = prev.filter(item => item.id !== product.id);
            const newRecent = [product, ...filtered].slice(0, 10); // Keep last 10
            localStorage.setItem('recentItems', JSON.stringify(newRecent));
            return newRecent;
        });
    };

    return (
        <RecentItemsContext.Provider value={{ recentItems, addRecentItem }}>
            {children}
        </RecentItemsContext.Provider>
    );
};
