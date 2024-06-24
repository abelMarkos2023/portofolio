import { collection, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Firestore } from '../Firebase/Firebase';
import { projectsStore } from '../Store/ProjectsStore';

const useGetprojects = () => {

    const [loading,setLoading] = useState(false);
    const [projects,setProjects] = useState([])
    const {setProjects:storeProjects} = projectsStore();

    const getProjects = async () => {

        setLoading(true)

        try {
            const docref = collection(Firestore,'projects');

            const projectsSnap = await getDocs(docref)

            let pros = [];
       

            projectsSnap.forEach(doc => {
                pros.push({...doc.data(),id:doc.id})
            })

            setProjects(pros)
            storeProjects(pros)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)

        }

    }

    useEffect(() => {
        getProjects()
    },[])
  return {getProjects,loading,projects}
}

export default useGetprojects