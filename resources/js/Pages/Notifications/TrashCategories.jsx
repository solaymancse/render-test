import UseTable from '@/Components/UseTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function TrashCategories({ auth, trashCategories }) {
    const {
        get,
        put,
        delete: destroy,
        processing,
    } = useForm();
    const [search, setSearch] = useState('');
    const [direction, setDirection] = useState('desc');


    const handleRestore = (id) => {
        put(route('softDelete', id));
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            destroy(route('deleteCategory', id));
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const searchText = e.target.elements.search.value;

        setSearch(searchText);

        get(route('trashCategories', {
            search: searchText,
        }));
    };

    const handleDirection = (direction) => {
        setDirection(direction);
        console.log(direction);

        get(route('trashCategories', {
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

            <div className="max-w-7xl mx-auto px-2">
                <div className='flex justify-between my-5'>
                    <Link className='border p-3 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white' href={route('categories')}>Back</Link>
                </div>

                <UseTable
                    filterData={trashCategories}
                    columns={categoryColumns}
                    search={search}
                    direction={direction}
                    handleRestore={handleRestore}
                    handleDelete={handleDelete}
                    handleSearch={handleSearch}
                    handleDirection={handleDirection}
                    processing={processing}
                />
            </div>
        </AuthenticatedLayout>
    );
}
