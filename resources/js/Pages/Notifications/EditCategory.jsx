import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function EditCategory({ auth, category }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: category.name,
        link: category.link,
        is_draft: category.is_draft,
    });


    const submit = (e) => {
        e.preventDefault();

        put(route('updateCategory', category.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Categories</h2>}
        >
            <Head title="Categories" />

            <div className='max-w-7xl mx-auto px-2'>
                <div className='flex justify-between my-5'>
                    <Link className='border p-3 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white' href={route('categories')}>Back</Link>
                </div>
                <div className='bg-white text-gray-900 p-5'>
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="link" value="Link" />

                            <TextInput
                                id="link"
                                type="text"
                                name="link"
                                value={data.link}
                                className="mt-1 block w-full"
                                autoComplete="link"
                                onChange={(e) => setData('link', e.target.value)}
                                required
                            />

                            <InputError message={errors.link} className="mt-2" />
                        </div>

                        <div className='mt-4 flex items-center gap-5'>
                            <InputLabel className='label cursor-pointer' htmlFor="draft" value="Draft" />

                            <TextInput
                                id="draft"
                                type="checkbox"
                                name="is_draft"
                                // value={data.is_draft}
                                className="checkbox"
                                autoComplete="is_draft"
                                onChange={(e) => setData('is_draft', e.target.checked)}
                                checked={data.is_draft}
                            />

                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton className="ms-4" disabled={processing}>
                                Submit
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
