import { doc,updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import {Firestore} from '../Firebase/Firebase'
import { projectsStore } from '../Store/ProjectsStore';
const useUpdateDoc = () => {
    const [loading,setLoading] = useState(false);
    const {updatePro} = projectsStore()
    const updatesDoc = async (id,data) => {

        console.log(id)
        setLoading(true)
        try {
           

            const docRef = doc(Firestore,'projects',id);

            await updateDoc(docRef,{...data});

            updatePro(id,data)

            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
  return {loading,updatesDoc}
}

export default useUpdateDoc