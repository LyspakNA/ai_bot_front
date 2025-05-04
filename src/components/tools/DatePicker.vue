<template>
    <v-menu
        v-model="datePickerMenu"
        :close-on-content-click="false"
        transition="slide-x-reverse-transition"
        offset-y
        max-width="300"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="date"
                placeholder="Date of born"
                :rules="[required, dateIsValid]"
                clearable
                filled
                v-bind="attrs"
                v-on="on"
            />
        </template>
        <v-date-picker 
            v-model="date" 
            @input="updateDate" 
            no-title>
        </v-date-picker>
    </v-menu>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import { required, dateIsValid} from '../helper/common'
  
  const date = ref<string | null>(null) 
  const datePickerMenu = ref<boolean>(false) 
  
  const emit = defineEmits<{
    (event: 'input', value: Date): void;
  }>()

  const props = defineProps<{
    date?: Date
  }>()

  watch(() => props.date, () => {
    if (props.date) {
      date.value = new Date(props.date.getTime() - props.date.getTimezoneOffset() * 60000).toISOString().split('T')[0]
    }
  }, { immediate: true })
  
  function updateDate(selectedDate: Date) {
    datePickerMenu.value = false
    date.value = selectedDate.toISOString()
    emit('input', selectedDate)
  }
  
  watch(date, (newDate) => {
    if (newDate) {
      emit('input', new Date(newDate))
    }
  })
  </script>
  