import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import UseTable from '@/Components/UseTable';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Categories({ auth, categories }) {
    const {
        get,
        put,
        processing,
    } = useForm();
    const [search, setSearch] = useState('');
    const [direction, setDirection] = useState('desc');
    const handleEdit = true;


    const handleSoftDelete = (id) => {
        put(route('softDelete', id));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // console.log(e.target.elements.search.value)
        const searchText = e.target.elements.search.value;

        setSearch(searchText);
        console.log(searchText, direction);

        get(route('categories', {
            search: searchText,
            direction: direction,
        }));
        // Inertia.reload({ only: ['UseTable'] });
    };

    const handleDirection = (direction) => {
        setDirection(direction);
        console.log(search, direction);

        get(route('categories', {
            search: search,
            direction: direction,
        }));
    };

    const categoryColumns = [
        { key: 'name', field: 'Name' },
        { key: 'link', field: 'Link' },
        { key: 'is_draft', field: 'Drafted' },
    ]

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Categories</h2>}
        >
            <Head title="Categories" />

            <div className="max-w-7xl mx-auto px-2 pb-20">
                <div className='flex justify-between my-5'>
                    <Link className='border p-3 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white' href={route('trashCategories')}>Trash List</Link>
                    <Link className='border p-3 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white' href={route('addCategory')}>Add Category</Link>
                </div>


                <UseTable
                    filterData={categories}
                    columns={categoryColumns}
                    search={search}
                    direction={direction}
                    handleEdit={handleEdit}
                    handleSoftDelete={handleSoftDelete}
                    handleSearch={handleSearch}
                    handleDirection={handleDirection}
                    processing={processing}
                />
            </div>
        </AuthenticatedLayout>
    );
}
