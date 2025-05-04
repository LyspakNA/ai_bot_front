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
            @input="setDepartment('department_id', $event)"
            />
        </v-col>
      </v-row>
      <v-row >
        <v-col>
          <p>
            Select an employee:
          </p>
        </v-col>
      </v-row>
      <v-row >
        <v-col>
          <v-autocomplete
            style="width: inherit;"
            :items="user"
            placeholder="Name"
            clearable
            :rules="[required]"
            filled
            @input="setField('surname', $event)"
            />
        </v-col>
      </v-row>
      <v-row >
        <v-col>
          <p>
            Link:
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            placeholder="Last name and first name"
            clearable
            :rules="[required]"
            filled
            @blur="setField('link', $event.target.value)"
            />
        </v-col>
      </v-row>
    </div>
    <v-btn 
      style="width: 100%; border-radius: 0;"
      x-large
      :disabled="!isValid"
      color="primary"
      @click="onSend(entity)"
      >
        Send
    </v-btn>
  </div>
  
</template>

<script lang="ts" setup>
import { required } from './helper/common'
import { DataForm, DataBirthday } from './helper/interface'
import { computed, ref } from 'vue';
import { onSend,  getUsers} from './helper/api'

const departments = [
  { text: 'Develop', value: 1 },
  { text: 'Support', value: 2 },
];

const user = ref()
const entity = ref<DataForm>({
  birthday: {
      surname: '',
      department_id: 0,
      link: '',
    }
  }
);

async function setDepartment<T extends keyof DataBirthday>(field: T, value: number) {
  console.log(value)
  if (entity.value && entity.value.birthday) {
  entity.value.birthday['department_id'] = value;
  }
  user.value = (await getUsers(value)).sort()
}

function setField<T extends keyof DataBirthday>(field: T, value: DataBirthday[T]) {
  if (entity.value && entity.value.birthday) {
    entity.value.birthday[field] = value;
  }
}

const isValid = computed(() => {
  const { surname, department_id, link } = entity.value.birthday;
  return surname.trim() !== '' && department_id !== 0 && link !== '';
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
