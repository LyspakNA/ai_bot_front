<template>
  <div class="wrapper fill-height">
    <div class="container">
      <v-row>
        <v-col>
          <p>
            Select your department:
          </p>
        </v-col>
      </v-row>
      <v-row >
        <v-col>
          <v-autocomplete
            style="width: inherit;"
            :items="departments"
            item-value="value"
            item-text="text"
            placeholder="Department"
            clearable
            :rules="[required]"
            filled
            @input="setField('department_id', $event)"
            />
        </v-col>
      </v-row>
      <v-row >
        <v-col>
          <p>
            Enter your last name and first name:
          </p>
        </v-col>
      </v-row>
      <v-row >
        <v-col>
          <v-text-field
            placeholder="Last name and first name"
            clearable
            :rules="[required]"
            filled
            @blur="setField('surname', $event.target.value)"
            />
        </v-col>
      </v-row>
      <v-row >
        <v-col>
          <p>
            Choose your date of born:
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <date-picker
          @input="setField('date_of_born', $event)"
          />
        </v-col>
      </v-row>
    </div>
    <v-btn 
      style="width: 100%; border-radius: 0;"
      x-large
      color="primary"
      :disabled="!isValid"
      @click="onSend(entity)"
      >
        Send
    </v-btn>
  </div>
  
</template>

<script lang="ts" setup>
import DatePicker from './tools/DatePicker.vue'
import { required } from './helper/common'
import useTelegram from './helper/composables/telegram'
import { onSend } from './helper/api'
import { DataForm, DataRegistration } from './helper/interface'
import { computed, ref } from 'vue';

const tg = useTelegram()
const entity = ref<DataForm>({
  registration: {
      surname: '',
      department_id: 0,
      date_of_born: new Date(),
    }
  }
);

const departments = [
  { text: 'Develop', value: 1 },
  { text: 'Support', value: 2 },
];

function setField<T extends keyof DataRegistration>(field: T, value: DataRegistration[T]) {
  if (entity.value && entity.value.registration) {
    entity.value.registration[field] = value;
  }
  console.log(tg)
}

const isValid = computed(() => {
  const { surname, department_id, date_of_born } = entity.value.registration;
  return surname.trim() !== '' && department_id !== 0 && new Date(date_of_born).getFullYear() < 2010;
});

</script>

<style lang="scss" scoped>
 .wrapper{
  display: flex;
  height: 100%;
  flex-direction: column;

  align-items: flex-start;
  justify-content: space-between;
 }
 .container{
  margin: 0;
  width: 100%;
  max-width: none;
  padding-left: 10px;
  padding-right: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 }
  p{
    font-size: 2.5vh;
    margin-bottom: 0px;
  }
</style>
