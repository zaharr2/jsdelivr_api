<template>
  <v-card>
    <v-card-actions class="pa-0">
      <v-spacer />
      <v-btn
        icon
        rounded
        @click="$emit('close')"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <v-row class="py-0">
        <v-col cols="12" md="6" class="text--primary">
          <h1>{{ item.name }}</h1>
        </v-col>
        <v-spacer />
        <v-col cols="12" md="6" class="text--secondary text-end">version: {{ item.version }}</v-col>
      </v-row>
      <v-card-text>
        {{ item.description }}
      </v-card-text>
      <template v-if="item.author">
        <h4 class="pb-0">Author</h4>
        <p
          v-for="(value, name) in item.author"
          :key="`link-${name}`"
          class="mr-2"
        >{{ `${name}: ${value}` }}</p>
      </template>
      <template v-if="item.links">
        <h4 class="pb-0">Links</h4>
        <a
          v-for="(value, name) in item.links"
          :key="`link-${name}`"
          :href="value"
          target="_blank"
          class="mr-2"
        >{{ name }}</a>
      </template>
      <template v-if="versions.length">
        <h4 class="pb-0 pt-3">Versions</h4>
        <v-select
          v-model="packageVersion"
          @change="fetchExtendedInfo"
          :items="versions"
          menu-props="auto"
          label="Select version for more info"
          hide-details
          prepend-icon="mdi-git"
          single-line
          dense
        ></v-select>
      </template>
      <TreeView
        v-if="packageVersion"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import TreeView from '@/components/TreeView'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ExtendedInformation',
  components: {
    TreeView
  },
  data: () => ({
    packageVersion: ''
  }),
  computed: {
    ...mapState({
      isLoading: state => state.selectedPackage.isLoading,
      versions: state => state.selectedPackage.versions,
      files: state => state.selectedPackage.files,
      item: state => state.selectedPackage.item
    })
  },
  methods: {
    ...mapActions({
      fetchExtendedInfo: 'selectedPackage/fetchExtendedInfo'
    })
  }
}
</script>

<style scoped>

</style>
