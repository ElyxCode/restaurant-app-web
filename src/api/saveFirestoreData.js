import { db, collection, addDoc } from '../firebase';

export const saveFirestoreData = async (data) => {
    data.existence = true;

    try {
        const docRef = await addDoc(collection(db, "products"), data);
        console.log("Document written with ID: ", docRef.id);
        return true;

    } catch (error) {
        console.error("Error adding document: ", error);
        return false;
    }
}