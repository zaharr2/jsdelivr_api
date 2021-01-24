<template>
  <div>
    <v-card-title>Files tree</v-card-title>
    <Spinner
      v-if="isLoading"
    />
    <v-treeview
      v-else
      v-model="tree"
      :items="files"
      :item-children="'files'"
      activatable
      item-key="name"
      open-on-click
    >
      <template v-slot:prepend="{ item, open }">
        <v-icon v-if="item.type === 'directory'">
          {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
        </v-icon>
        <v-icon v-else>
          {{ filesIcons[item.name.substr(item.name.lastIndexOf(".") + 1)] || 'mdi-file' }}
        </v-icon>
      </template>
    </v-treeview>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Spinner from '@/components/Spinner'

export default {
  name: 'TreeView',
  components: {
    Spinner
  },
  data: () => ({
    tree: [],
    filesIcons: {
      html: 'mdi-language-html5',
      ts: 'mdi-nodejs',
      js: 'mdi-nodejs',
      json: 'mdi-code-json',
      md: 'mdi-language-markdown',
      pdf: 'mdi-file-pdf',
      png: 'mdi-file-image',
      txt: 'mdi-file-document-outline',
      xls: 'mdi-file-excel'
    }
  }),
  computed: {
    ...mapState({
      isLoading: state => state.selectedPackage.isLoading,
      files: state => state.selectedPackage.files
    })
  }
}
</script>

<style scoped>

</style>
