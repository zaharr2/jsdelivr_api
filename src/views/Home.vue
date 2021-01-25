<template>
  <v-container>
    <v-row class="align-center flex-column">
      <v-col cols="12">
        <Search
          @startSearching="setSearchStr"
        />
      </v-col>
    </v-row>
    <v-row class="align-center flex-column">
      <v-col
        class="mb-5"
        cols="12"
      >
        <Table
          :searchStr="searchStr"
          @pageChanged="setPage"
          @toggleModal="toggleModal(true)"
        />
      </v-col>
    </v-row>
    <v-dialog
      v-model="isModalVisible"
      scrollable
    >
      <Spinner
        v-if="isSelectedPackageInfoLoading"
      />
      <ExtendedInformation
        v-else
        @close="toggleModal(false)"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import ExtendedInformation from '@/components/ExtendedInformation'
import Spinner from '@/components/Spinner'
import Search from '@/components/Search'
import Table from '@/components/Table'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Home',
  components: {
    ExtendedInformation,
    Spinner,
    Search,
    Table
  },
  data: () => ({
    page: 0,
    searchStr: '',
    isModalVisible: false
  }),
  computed: {
    ...mapState({
      isSelectedPackageInfoLoading: 'selectedPackage/isLoading'
    })
  },
  methods: {
    ...mapActions({
      fetchPackages: 'packages/fetchItems'
    }),
    ...mapMutations({
      setPackages: 'packages/SET_ITEMS'
    }),

    setPage ($page) {
      this.page = $page

      if ($page) {
        this.fetchPackages({
          page: $page,
          searchStr: this.searchStr
        })
      }
    },
    setSearchStr ($searchStr) {
      this.searchStr = $searchStr || ''

      if ($searchStr) {
        this.fetchPackages({
          page: 0,
          searchStr: $searchStr
        })
      } else {
        this.setPackages()
      }
    },
    toggleModal (isModalVisible) {
      this.isModalVisible = isModalVisible
    }
  }
}
</script>
