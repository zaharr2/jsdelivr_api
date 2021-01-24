<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <h2>Packages search</h2>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
    <v-footer
      color="primary"
      padless
      dark
    >
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            src="https://github.com/zaharr2.png?size=50"
            width="50"
            height="50"
            alt="ME"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Andrew Zakharchuk</v-list-item-title>
        </v-list-item-content>

        <a
          href="https://github.com/zaharr2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <v-icon class="mr-1">
            mdi-git
          </v-icon>
        </a>
      </v-list-item>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html {
  overflow-y: auto !important;
}
</style>
