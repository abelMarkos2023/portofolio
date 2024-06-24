import React, { useState } from 'react'
import { projectsStore } from '../Store/ProjectsStore'
import { deleteObject, ref } from 'firebase/storage'
import { Firestore, Storage } from '../Firebase/Firebase'
import { deleteDoc, doc } from 'firebase/firestore'

const useDeleteProject = () => {
    const [loading,setLoading] = useState(false)
    const {removeProject} = projectsStore()

    const deleteProject = async (pro) => {
        try {
            setLoading(true)
            const storageRef = ref(Storage,`project/${pro.githubLink}`);
            await deleteObject(storageRef);
            await deleteDoc(doc(Firestore,`projects`,pro.id))
            removeProject(pro.id)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
  return {loading,deleteProject}
}

export default useDeleteProject