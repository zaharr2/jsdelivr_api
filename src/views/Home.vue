<template>
  <v-container>
    <v-row class="align-center flex-column">
      <v-col cols="12">
        <Search
          @startSearching="searchStr = $event || ''"
        />
      </v-col>
    </v-row>
    <v-row class="align-center flex-column">
      <v-col
        class="mb-5"
        cols="12"
      >
        <Table
          @pageChanged="page = $event"
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
  watch: {
    searchStr (newVal) {
      if (newVal) {
        this.fetchPackages(this.queryParams())
      } else {
        this.setPackages()
      }
    },
    page () {
      this.fetchPackages(this.queryParams())
    }
  },
  methods: {
    ...mapActions({
      fetchPackages: 'packages/fetchItems'
    }),
    ...mapMutations({
      setPackages: 'packages/SET_ITEMS'
    }),

    queryParams () {
      return {
        page: this.page,
        searchStr: this.searchStr
      }
    },
    toggleModal (isModalVisible) {
      this.isModalVisible = isModalVisible
    }
  }
}
</script>
