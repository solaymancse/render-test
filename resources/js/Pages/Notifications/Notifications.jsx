import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import UseTable from '@/Components/UseTable';
import { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Echo from 'laravel-echo';

export default function Notifications({ auth, notifications }) {
    const {
        get,
        put,
        processing,
    } = useForm();
    const [newNotifications, setNewNotifications] = useState(notifications);

    useEffect(() => {
        const echo = new Echo({
            // broadcaster: 'pusher',
            // key: 'ABCDEFG',
            // cluster: 'mt1',
            // forceTLS: true,

            broadcaster: 'pusher',
            key: import.meta.env.VITE_PUSHER_APP_KEY,
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
            wssPort: import.meta.env.VITE_PUSHER_PORT ?? 6001,
            enabledTransports: ['ws', 'wss'],

            wsHost: window.location.hostname,
            wsPort: 6001,
            forceTLS: false,
            disableStats: true,
        });

        // Listen for the NotificationCreated event
        // echo.channel(`notifications.${auth.user.id}`)
        // echo.private('notifications')
        echo.private(`notifications.${auth.user.id}`)
            .listen("NotificationCreated", (notification) => {
                console.log(newNotifications);
                console.log(notification[0]);
                setNewNotifications((prevNotifications) => [notification[0], ...prevNotifications]);
            });

        // echo.join('status-update')
        //     .here((users) => {
        //         console.log(users);
        //     })
        //     .joining((user) => {
        //         console.log("User Joined:- " + user.name);
        //     })
        //     .leaving((user) => {
        //         console.log("User Leaved:- " + user.name);
        //     })
        //     .listen('UserStatusEvent', (e) => {
        //         console.log(e);
        //     })

        return () => {
            echo.disconnect();
        };
    }, [auth.user.id]);

    // useEffect(() => {
    //     // Listen for the NotificationCreated event
    //     // const channel = Echo.private(`notifications.${auth.user.id}`);
    //     const channel = Echo.channel(`notifications.${auth.user.id}`);

    //     channel.listen('NotificationCreated', (e) => {
    //         console.log('New notification received:', e);
    //         // Update your component state or perform any other necessary actions
    //     });

    //     return () => {
    //         channel.disconnect();
    //     };
    // }, [auth.user.id]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Categories</h2>}
        >
            <Head title="Categories" />

            <div className="max-w-7xl mx-auto px-2 pb-20">

                <h2>Notifications</h2>

                <ul>
                    {newNotifications.map((notification) => (
                        <div className='bg-blue-300 p-3 m-2 text-black' key={notification.id}>
                            <b>{notification.data.message}</b>
                            <Link href={route('markAsRead', notification.id)} className='p-2 bg-red-400 text-white rounded-lg'>Mark as Read</Link>
                        </div>
                    ))}
                </ul>

            </div>
        </AuthenticatedLayout>
    );
}
