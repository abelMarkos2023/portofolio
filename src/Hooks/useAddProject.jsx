import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import React, { useState } from 'react'
import {Firestore, Storage } from '../Firebase/Firebase'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { projectsStore } from '../Store/ProjectsStore'

const useAddProject = () => {

    const [loading,setLoading] = useState(false)
    const {addProject} = projectsStore()
    const insertData = async (data,imgUrl) => {
        try {
            setLoading(true)
            const storageRef = ref(Storage,`project/${data.githubLink}`);

        await uploadString(storageRef,imgUrl,'data_url');
        const imageURL = await getDownloadURL(storageRef);

        data.imageUrl = imageURL;
        data.createdAt = Date.now();
        const docRef = collection(Firestore,'projects');

        const projectRef = await addDoc(docRef,data);
        console.log(projectRef)
        addProject(data)
        setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)

        }

    }
  return {insertData,loading}
}

export default useAddProject