import React, { useRef } from 'react';
import { db, doc, updateDoc } from '../../firebase'

export const Saucer = ({ saucer }) => {

    const { id, name, price, category, image, description, existence } = saucer;
    const existenceRef = useRef();

    // modify saurce state in firebase
    const updateAvailable = async () => {
        const existence = (existenceRef.current.value === 'true');

        try {
            const docRef = doc(db, 'products', id);
            await updateDoc(docRef, {
                existence
            })

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-full px-3 mb-4'>
            <div className='p-5 shadow-md bg-white'>
                <div className='lg:flex'>
                    <div className='lg:w-5/12 xl:w-3/12'>
                        <img src={image} alt="saucer image" />
                        <div className='sm:flex sm:-m-2 pl-2'>
                            <label className='block mt-5 sm:w-2/4'>
                                <span className='block text-gray-800 mb-2'>Existence</span>
                                <select
                                    className='bg-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                                    value={existence}
                                    ref={existenceRef}
                                    onChange={() => updateAvailable()}
                                >
                                    <option value='true'>Available</option>
                                    <option value='false'>Unavailable</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className='lg:w-7/12 xl:w-9/12 pl-5'>
                        <p className='font-bold text-2xl text-yellow-600 mb-4'>{name}</p>
                        <p className='text-gray-600 mb-4'>Category: {''}
                            <span className='text-gray-700 font-bold'>{category.toUpperCase()}</span>
                        </p>
                        <p className='text-gray-600 mb-4'>{description}</p>
                        <p className='text-gray-600 mb-4'>Price: {''}
                            <span className='text-gray-700 font-bold'>${price}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
