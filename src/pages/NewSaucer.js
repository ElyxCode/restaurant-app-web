import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { saveFirestoreData } from '../api/saveFirestoreData';
import { useUploadFileFB } from '../hooks/useUploadFileFB';


export const NewSaucer = () => {

    const { uploadImage, imgUrl, progressPercent } = useUploadFileFB();

    // redirect hook
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            category: '',
            image: '',
            description: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'The saucer must have at least 3 character')
                .required('The name is required'),
            price: Yup.number()
                .min(1, 'You must add a number')
                .required('The price is required'),
            category: Yup.string()
                .required('The category is required'),
            description: Yup.string()
                .min(10, 'The description should be longuer')
                .required('The description is required'),
        }),
        onSubmit: (data) => {
            //console.log(' haciendo on submit', imgUrl);
            if (imgUrl) {
                data.image = imgUrl;
            }
            console.log(data)
            const isSaveFirestore = saveFirestoreData(data);
            if (isSaveFirestore) {
                return navigate('/menu');
            }
        }
    });

    return (
        <>
            <h1 className='text-3xl font-light mb-4'>Add Saucer</h1>
            <div className='flex justify-center mt-10'>
                <div className='w-full max-w-3xl'>
                    <form
                        onSubmit={formik.handleSubmit}
                    >
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>Name:</label>
                            <input
                                id='name'
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                type='text'
                                placeholder='Saucer name'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {
                            formik.touched.name && formik.errors.name ?
                                (
                                    <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5 rounded' role='alert'>
                                        <p className='font-bold'>There was a mistake:</p>
                                        <p>{formik.errors.name}</p>
                                    </div>
                                )
                                : null
                        }

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='price'>Price:</label>
                            <input
                                id='price'
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                type='number'
                                placeholder='$20'
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {
                            formik.touched.price && formik.errors.price ?
                                (
                                    <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5 rounded' role='alert'>
                                        <p className='font-bold'>There was a mistake:</p>
                                        <p>{formik.errors.price}</p>
                                    </div>
                                )
                                : null
                        }

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='category'>Category:</label>
                            <select
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='category'
                                value={formik.values.category}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value=''>-- Select --</option>
                                <option value='breakfast'>Breakfast</option>
                                <option value='food'>Food</option>
                                <option value='dinner'>Dinner</option>
                                <option value='drinks'>Drinks</option>
                                <option value='dessert'>Dessert</option>
                                <option value='salad'>Salad</option>
                            </select>
                        </div>
                        {
                            formik.touched.category && formik.errors.category ?
                                (
                                    <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5 rounded' role='alert'>
                                        <p className='font-bold'>There was a mistake:</p>
                                        <p>{formik.errors.category}</p>
                                    </div>
                                )
                                : null
                        }

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='image'>Image:</label>
                            <input
                                id='image'
                                type='file'
                                onChange={(e) => uploadImage(e)}
                            />
                        </div>
                        {
                            (!imgUrl && progressPercent > 0) &&
                            <div className='h-12 relative w-full border'>
                                <div className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center" style={{ width: `${progressPercent}%` }}>
                                    {progressPercent}%
                                </div>
                            </div>
                        }

                        {
                            imgUrl && (
                                <p className='bg-green-500 text-white p-3 text-center my-5'>
                                    Image uploaded successfull
                                </p>
                            )
                        }

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='description'>Description:</label>
                            <textarea
                                id='description'
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40'
                                placeholder='saucer description'
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            ></textarea>
                        </div>
                        {
                            formik.touched.description && formik.errors.description ?
                                (
                                    <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5 rounded' role='alert'>
                                        <p className='font-bold'>There was a mistake:</p>
                                        <p>{formik.errors.description}</p>
                                    </div>
                                )
                                : null
                        }

                        <input
                            type='submit'
                            className='bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold'
                            value='Add Saucer'
                        />
                    </form>
                </div>
            </div>
        </>


    )
}
