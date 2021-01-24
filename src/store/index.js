import Vue from 'vue'
import Vuex from 'vuex'

import selectedPackage from './modules/selectedPackage'
import packages from './modules/packages'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    selectedPackage,
    packages
  }
})
