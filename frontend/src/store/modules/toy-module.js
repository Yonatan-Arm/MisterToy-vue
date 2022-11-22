import { toyService } from "../../services/toy-service.js"

export default {
    state: {
        toys: [],
        isLoading: false,
        filterBy:{},
    },
    getters: {
        isLoading(state) {
            return state.isLoading
        },
        getToys(state) {
            return state.toys
        }
    },
    mutations: {
        setToys(state, { toys }) {
            state.toys = toys
        },
        setIsLoading(state, { isLoading }) {
            state.isLoading = isLoading
        },
        removeToy(state, { toyId }) {
            const idx = state.toys.findIndex(toy => toy._id === toyId)
            state.toys.splice(idx, 1)
        },
        saveToy(state, {toyToSave} ) {
            const idx = state.toys.findIndex((currtoy) => currtoy._id === toyToSave._id)
            if (idx !== -1) state.toys.splice(idx, 1, toyToSave)
            else state.toys.unshift(toyToSave.ops[0])
          },
          setFilter(state, { filterBy }) {
            state.filterBy = filterBy;
          },

    },
    actions: {
      async loadToys({context,commit, state}) {
            commit({ type: 'setIsLoading', isLoading: true })
            const toys = await  toyService.query(state.filterBy)
            try{
                commit({ type: 'setToys', toys })
            } catch(err){
                console.error('Cannot Load Toys', err)
                throw err
            }finally {
                    commit({ type: 'setIsLoading', isLoading: false })
                }
        },
        setFilter({ commit , dispatch}, { filterBy }) {
            commit({ type: 'setFilter', filterBy });
            dispatch({type: 'loadToys'});
          },
    

       async removeToy(context, payload) {
             const removedToy= await toyService.remove(payload.toyId)
              try{
                  context.commit(payload)
                  return removedToy

              }catch(err){
                console.error('Cannot Load Toys', err)
                throw err
            }
        },
       async saveToy({ commit }, { toyToSave }) {
           try {
           const toy = await toyService.save(toyToSave)
              commit({ type: 'saveToy', toyToSave: toy })
            }catch(err){
                console.error('Cannot save Toys', err)
                throw err
            }
          
       }
        
  
    
}
}
