import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications, markRead, reset } from '../redux/notificationSlice';
import { FaBell, FaCheckCircle, FaCircle } from 'react-icons/fa';

function Notifications() {
    const dispatch = useDispatch();
    const { notifications, isLoading } = useSelector((state) => state.notifications);

    useEffect(() => {
        dispatch(getNotifications());
        return () => {
            dispatch(reset());
        }
    }, [dispatch]);

    const handleMarkRead = (id) => {
        dispatch(markRead(id));
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-slate-950 p-6 transition-colors duration-300">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                        <FaBell className="text-blue-600 dark:text-blue-400" /> Notifications
                    </h1>
                </div>

                {isLoading ? (
                    <div className="text-center dark:text-gray-300">Loading notifications...</div>
                ) : (
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-slate-800">
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <div
                                    key={notification._id}
                                    className={`p-4 border-b border-gray-100 dark:border-slate-800 last:border-b-0 flex items-start gap-3 transition ${notification.read ? 'bg-white dark:bg-slate-900' : 'bg-blue-50 dark:bg-blue-900/10'}`}
                                >
                                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                                        {notification.sender && notification.sender.profilePic ? (
                                            <img src={notification.sender.profilePic} alt={notification.sender.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center font-bold text-gray-500 dark:text-gray-400">
                                                {notification.sender ? notification.sender.name.charAt(0) : '?'}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
                                            <span className="font-bold text-gray-900 dark:text-white">{notification.sender ? notification.sender.name : 'Someone'}</span> {notification.message}
                                        </p>
                                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                                            {new Date(notification.createdAt).toLocaleDateString()} {new Date(notification.createdAt).toLocaleTimeString()}
                                        </span>
                                    </div>

                                    {!notification.read && (
                                        <button onClick={() => handleMarkRead(notification._id)} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mt-1" title="Mark as read">
                                            <FaCircle size={10} />
                                        </button>
                                    )}
                                    {notification.read && <FaCheckCircle className="text-gray-300 dark:text-slate-700 mt-1" size={12} />}
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center text-gray-500 dark:text-gray-400">No new notifications.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Notifications;
