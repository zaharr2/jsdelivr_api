<template>
  <div class="spinner-wrap d-flex align-center justify-center" >
    <v-progress-circular
      :size="70"
      indeterminate
      color="primary"
      class="m-0"
    />
  </div>
</template>

<script>
export default {
  name: 'Spinner'
}
</script>

<style scoped>
.spinner-wrap {
  background: white;
  width: 100%;
  min-height: 100px;
}
</style>
