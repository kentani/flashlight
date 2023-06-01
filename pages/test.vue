<template>
  <v-container class="my-6">
    <v-card color="#26c6da" width="520" class="my-6">
      <v-icon dark size="512">mdi-teddy-bear</v-icon>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'TestPage',
  components: {
  },
  data: () => ({
    image: require('@/assets/images/teddy-bear.png'),
  }),
  async mounted() {
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
