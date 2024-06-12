import { InertiaLink } from '@inertiajs/inertia-react';
import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import { FaRegEdit, FaTrashAlt, FaTrashRestore } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { Button, Divider, Flex, Radio } from 'antd';

export default function UseTable({
    filterData,
    columns,
    handleEdit,
    handleSoftDelete,
    handleRestore,
    handleDelete,
    handleSearch,
    direction,
    handleDirection,
    search,
    processing,
}) {


    return (
        <div className='overflow-x-auto'>
            <div className='grid grid-cols-3'>
                <form className='pb-3' onSubmit={handleSearch}>
                    <label className="input input-bordered flex items-center gap-2 bg-white">
                        <input type="text" name="search" className="rounded"
                            //  onChange={handleSearch}
                            placeholder="Search" />
                        <button type='submit'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                        </button>
                    </label>
                </form>
                {handleDirection &&
                    <div className='flex justify-center items-center'>
                        <Radio.Group value={direction} onChange={(e) => handleDirection(e.target.value)}>
                            <Radio.Button value="desc">Recent</Radio.Button>
                            <Radio.Button value="asc">Old</Radio.Button>
                        </Radio.Group>
                    </div>
                }
            </div>
            <table className="table table-md border border-black table-pin-rows text-gray-900 mb-5">
                <thead>
                    <tr>
                        <th>SL</th>
                        {
                            columns?.map(column =>
                                <td key={column?.key}>{column?.field}</td>
                            )
                        }
                        {(handleEdit
                            || handleSoftDelete
                            || handleRestore
                            || handleDelete) &&
                            <td>Action</td>
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        filterData?.data?.map((data, index) => (
                            <tr key={data.id}>
                                <th>{index + 1}</th>
                                <td>{data.name}</td>
                                <td><a href={`${data.link}`}>Site</a></td>
                                <td>{data.is_draft ? 'True' : 'False'}</td>
                                {
                                    (handleEdit
                                        || handleSoftDelete
                                        || handleRestore
                                        || handleDelete)
                                    &&
                                    <td className='flex gap-2'>
                                        {handleEdit &&
                                            <Link className={`p-2 rounded-md border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white`} href={route('editCategory', data.id)}>
                                                <FaRegEdit size={'20'} />
                                            </Link>
                                        }
                                        {handleSoftDelete &&
                                            <button className={`p-2 rounded-md border border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white`} onClick={() => handleSoftDelete(data.id)} disabled={processing}>
                                                <FaTrashAlt size={'20'} />
                                            </button>
                                        }
                                        {handleRestore &&
                                            <button className={`p-2 rounded-md border border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white`} onClick={() => handleRestore(data.id)} disabled={processing}>
                                                <FaTrashRestore size={'20'} />
                                            </button>
                                        }
                                        {handleDelete &&
                                            <button className={`p-2 rounded-md border border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white`} onClick={() => handleDelete(data.id)} disabled={processing}>
                                                <MdDelete size={'20'} />
                                            </button>
                                        }
                                    </td>
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="join flex justify-center flex-wrap">
                {
                    filterData?.links?.map((link, index) =>
                        <InertiaLink
                            key={index}
                            className={`join-item btn ${link?.active ? "btn-active" : ""} ${link?.url ? "" : "btn-disabled"} text-white bg-[#1D232A] hover:bg-[#3b4551]`}
                            // href={search !== '' ? `${link?.url}&&search=${search}` : link?.url}
                            href={`${link?.url}${search && `&&search=${search}`}`}
                        >{link?.label.replace('&laquo;', '«').replace('&raquo;', '»')}</InertiaLink>
                    )
                }
            </div>
        </div>
    );
};
