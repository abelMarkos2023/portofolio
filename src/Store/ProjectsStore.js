import { create } from "zustand";

export const projectsStore = create(set => ({
    projects:[],
    updateProData:{},
    setProjects : project => set(state => ({
        projects:[...project]
    })),
    setUpdateProData : pro => set(state => ({
        updateProData : {...pro}
    })),
    addProject : pro => set(state => ({
        projects:[...state.projects,pro]
    })),
    removeProject : id => set(state => ({
        projects : state.projects.filter(pro => pro.id !== id)
    })),
    updatePro : (id,doc) => set(state => ({
        projects : [...state.projects.filter(pro => pro.id !== id),doc].sort((a,b) => a.createdAt - b.createdAt)
    }))

}))