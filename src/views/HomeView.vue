<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-btn @click="goToComponent('/CreateBirthday')">Перейти к CreateBirthday</v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn @click="goToComponent('/Registration')">Перейти к Registration</v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn @click="goToComponent('/CustomMessage')">Перейти к CustomMessage</v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn @click="goToComponent('/EditUser')">Перейти к EditUser</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    goToComponent(path: string) {
      // Проверка текущего маршрута
      if (this.$route.path !== path) {
        this.$router.push(path).catch(err => {
          if (err.name !== 'NavigationDuplicated') {
            console.error(err)
          }
        })
      }
    }
  }
})
</script>