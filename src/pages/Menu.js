import React, { useEffect, useState } from 'react';
import { db, collection, onSnapshot, query } from '../firebase';
import { Link } from 'react-router-dom';

import { Saucer } from '../components/ui/Saucer';

export const Menu = () => {

    const [saucers, setSaucers] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'products'));
        const getSaucers = () => {
            onSnapshot(q, (querySnapshot) => {
                const snapshotData = querySnapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                });
                setSaucers(snapshotData);
            })
        }

        getSaucers();

    }, [])

    return (
        <>
            <h1 className='text-3xl font-light mb-4'>Menu</h1>
            <Link
                className='bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white uppercase font-bold'
                to='/new-saucer'
            >
                Add saucer
            </Link>
            {
                saucers.map((saucer) => (
                    <Saucer
                        key={saucer.id}
                        saucer={saucer}

                    />

                ))
            }


        </>
    )
}
