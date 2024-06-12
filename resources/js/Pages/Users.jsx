import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Users({ auth, users }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>}
        >
            <Head title="Users" />

            <div className="overflow-x-auto max-w-7xl mx-auto">
                <table className="table table-md table-pin-rows text-gray-900">
                    <thead>
                        <tr>
                            <th></th>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Job</td>
                            <td>company</td>
                            <td>location</td>
                            <td>Last Login</td>
                            <td>Favorite Color</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr key={user.id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>Quality Control Specialist</td>
                                    <td>Littel, Schaden and Vandervort</td>
                                    <td>Canada</td>
                                    <td>12/16/2020</td>
                                    <td>Blue</td>
                                </tr>
                            ))
                        }
                    </tbody>
                    {/* <tfoot>
                        <tr>
                            <th></th>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Job</td>
                            <td>company</td>
                            <td>location</td>
                            <td>Last Login</td>
                            <td>Favorite Color</td>
                        </tr>
                    </tfoot> */}
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
