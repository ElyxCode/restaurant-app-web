import { useState } from "react";
import { storage, ref, getDownloadURL, uploadBytesResumable } from "../firebase";

export const useUploadFileFB = () => {
    const [imgUrl, setImgUrl] = useState(null);
    const [progressPercent, setProgressPercent] = useState(0);

    const uploadImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgressPercent(progress);
                console.log('upload progress:', progress);
            },
            (error) => {
                console.log('upload error:', error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('get url file:', downloadURL)
                    setImgUrl(downloadURL)
                });
            }
        );
    }

    return {
        uploadImage,
        imgUrl,
        progressPercent,
    }
}