// import { db, collection, onSnapshot, query } from '../firebase';

// const q = query(collection(db, 'products'));

// export const getFirestoreData = async () => {
//     onSnapshot(q, (querySnapshot) => {
//         const snapshotData = querySnapshot.docs.map((doc) => {
//             return {
//                 id: doc.id,
//                 ...doc.data()
//             }
//         });

//         console.log('snap', snapshotData)
//         return snapshotData;

//     })
// };


    // const q = query(collection(db, 'products'));
    // // const unsubscribe = onSnapshot(q)

    // const unsub = onSnapshot(q, (snapshot) => {
    //     const data = [];
    //     snapshot.forEach((doc) => {
    //         data.push(doc.data());
    //     })
    //     console.log(data)
    // });

    // unsub()


    // const querySnapshot = await getDocs(collection(db, 'products'));
    // return querySnapshot;
