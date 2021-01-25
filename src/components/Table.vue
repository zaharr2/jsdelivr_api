<template>
  <div class="">
    <h1 style="text-align: center;">Packages</h1>
    <v-data-table
      :page="page"
      :pageCount="pageCount"
      :headers="headers"
      :items="items"
      :items-per-page="10"
      :options.sync="options"
      :server-items-length="totalNumberOfPackages"
      :hide-default-footer="!items.length"
      :loading="isLoading"
      :footer-props="{
        'disable-items-per-page': true,
        'disable-pagination': isLoading,
        'items-per-page-options': [],
        'items-per-page-text': ''
      }"
      :item-class="() => 'cursor-pointer'"
      single-select
      disable-sort
      @click:row="fetchData"
      class="elevation-1"
    >
      <!--<template v-slot:[`item.logo`]="{ item }">
        <img :src="item.airline.logo" style="width: 10%;" />
      </template>
      <template v-slot:[`item.website`]="{ item }">
        <a :href="item.airline.website">{{ item.airline.website }}</a>
      </template>-->
    </v-data-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'DatatableComponent',
  props: {
    searchStr: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      page: 1,
      options: {},
      headers: [
        {
          text: 'Name',
          value: 'package.name',
          align: 'start'
        },
        {
          text: 'Author',
          value: 'package.author.name',
          align: 'start'
        },
        {
          text: 'Description',
          value: 'package.description',
          align: 'start'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      pageCount: state => state.packages.pageCount,
      totalNumberOfPackages: state => state.packages.totalNumberOfPackages,
      items: state => state.packages.items,
      isLoading: state => state.packages.isLoading
    })
  },
  watch: {
    searchStr () {
      if (this.options.page !== 1) this.options.page = 1
    },
    options: {
      handler ({ page }) {
        this.$emit('pageChanged', page - 1)
      }
    },
    deep: true
  },
  methods: {
    ...mapActions({
      fetchVersions: 'selectedPackage/fetchVersions'
    }),

    fetchData ($event) {
      this.fetchVersions($event)
      this.$emit('toggleModal')
    }
  }
}
</script>

<style lang="scss">
.cursor-pointer {
  cursor: pointer;
}
</style>
