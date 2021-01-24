import axios from 'axios'

const SET_DATA_BY_FIELD = 'SET_DATA_BY_FIELD'

export default {
  state: {
    item: {},
    versions: [],
    files: [],
    isModalVisible: false,
    isLoading: false
  },
  actions: {
    fetchVersions ({ commit }, payload) {
      commit(SET_DATA_BY_FIELD, {
        item: payload.package,
        isLoading: true,
        isModalVisible: true
      })

      axios.get(`https://data.jsdelivr.com/v1/package/npm/${payload.package.name}`)
        .then(({ data: { versions } }) => {
          commit(SET_DATA_BY_FIELD, { versions })
        })
        .catch(error => {
          console.log('getItems', error)
        })
        .finally(() => {
          commit(SET_DATA_BY_FIELD, { isLoading: false })
        })
    },
    fetchExtendedInfo ({ state: { item: { name } }, commit }, version) {
      commit(SET_DATA_BY_FIELD, {
        isLoading: true
      })

      axios.get(`https://data.jsdelivr.com/v1/package/npm/${name}@${version}`)
        .then(({ data: { files } }) => {
          commit(SET_DATA_BY_FIELD, { files })
        })
        .catch(error => {
          console.log('getItems', error)
        })
        .finally(() => {
          commit(SET_DATA_BY_FIELD, { isLoading: false })
        })
    }
  },
  mutations: {
    [SET_DATA_BY_FIELD] (state, payload = {}) {
      for (const key in payload) {
        state[key] = payload[key]
      }
    }
  },
  namespaced: true
}
