import axios from 'axios'

const SET_ITEMS = 'SET_ITEMS'
const SET_PARAMS = 'SET_PARAMS'
const SET_LOADING = 'SET_LOADING'

export default {
  state: {
    items: [],
    totalNumberOfPackages: undefined,
    pageCount: 0,
    from: 0,
    size: 10,
    isLoading: false
  },
  actions: {
    fetchItems ({ state: { from, size }, commit }, { page, searchStr }) {
      commit(SET_LOADING, true)

      axios.get(`https://registry.npmjs.org/-/v1/search?&size=${size}&from=${page * size}&text=${searchStr}`)
        .then(({ data: { total, objects } }) => {
          commit(SET_PARAMS, total)
          commit(SET_ITEMS, objects)
        })
        .catch(error => {
          console.log('getItems', error)
        })
        .finally(() => {
          commit(SET_LOADING, false)
        })
    }
  },
  mutations: {
    [SET_PARAMS] (state, totalNumberOfPackages) {
      state.totalNumberOfPackages = totalNumberOfPackages
      state.pageCount = totalNumberOfPackages / state.size
    },
    [SET_ITEMS] (state, items = []) {
      state.items = items
    },
    [SET_LOADING] (state, isLoading = false) {
      state.isLoading = isLoading
    }
  },
  namespaced: true
}
