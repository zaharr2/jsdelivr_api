<template>
  <v-text-field
    v-model="searchStr"
    :append-icon="searchStr ? 'mdi-magnify' : ''"
    :disabled="isLoading"
    @click:append="emitSearch()"
    label="Search"
    type="text"
    outlined
    clearable
  ></v-text-field>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Search',
  data: () => ({
    searchStr: '',
    timeout: undefined
  }),
  computed: {
    ...mapState({
      isLoading: state => state.packages.isLoading
    })
  },
  watch: {
    searchStr () {
      this.emitSearch()
    }
  },
  methods: {
    emitSearch () {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }

      this.timeout = setTimeout(() => {
        this.$emit('startSearching', this.searchStr)
      }, 1000)
    }
  }
}
</script>

<style scoped>

</style>
