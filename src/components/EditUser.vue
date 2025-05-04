<template>
  <div class="wrapper fill-height">
    <div class="container">
      <v-row>
        <v-col>
          <p>Select user to edit:</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-autocomplete
            style="width: inherit;"
            :items="users"
            item-value="id" 
            item-text="surname"
            placeholder="User"
            clearable
            :rules="[required]"
            filled
            :loading="loading"
            @input="setUserField('id', $event)" 
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <p>Department:</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-autocomplete
            v-model="entity.editUser.department_id"
            style="width: inherit;"
            :items="departments"
            item-value="value"
            item-text="text"
            
            placeholder="Department"
            :rules="[required]"
            filled
            clearable
            @input="setField('department_id', $event)"
          />
        </v-col>
      </v-row>
      
      <v-row>
        <v-col>
          <p>Enter last name and first name:</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="entity.editUser.surname" 
            placeholder="Last name and first name"
            clearable
            :rules="[required]"
            filled
            @blur="setField('surname', $event)"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p>Choose date of born:</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <date-picker
            :date="entity.editUser?.date_of_born"
            @input="setField('date_of_born', $event)"
            
            :rules="[required]"
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
import DatePicker from './tools/DatePicker.vue';
import { required } from './helper/common';
import useTelegram from './helper/composables/telegram';
import { onSend, getAllUsersObjects } from './helper/api';
import { DataEdit, DataForm } from './helper/interface';
import { computed, ref, onMounted } from 'vue';

const users = ref([]); // Список пользователей
const loading = ref(false); // Состояние загрузки

onMounted(async () => {
  loading.value = true; // Начало загрузки
  try {
    const tempUsers = await getAllUsersObjects(); // Получение всех пользователей
    console.log('Fetched users:', tempUsers); // Отладка

    // Обработка массива пользователей
    users.value = tempUsers.map((user: any) => ({
      id: user.id, // Используем id как уникальный идентификатор
      surname: user.surname, // Отображаемое имя
      department_id: user.department_id, // Дополнительное поле
      date_of_born: user.date_of_born // Дата рождения
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    loading.value = false; // Конец загрузки
  }
});

const tg = useTelegram();
const entity = ref<DataForm>({
  editUser: {
    id: 0,
    surname: '',
    department_id: 0,
    date_of_born: '',
  },
});

const departments = [
  { text: 'Develop', value: 1 },
  { text: 'Support', value: 2 },
];

// Обработчик выбора пользователя
async function setUserField<T extends keyof DataEdit>(field: T, value: DataEdit[T]) {
  console.log('Selected user id:', value);

  if (entity.value && entity.value.editUser) {
    // Найти выбранного пользователя по id
    const selectedUser = users.value.find((u: any) => u.id === value);

    if (selectedUser) {
      // Заполнить поля данными выбранного пользователя
      entity.value.editUser.id = selectedUser.id; // Установить id
      entity.value.editUser.surname = selectedUser.surname; // Установить фамилию
      entity.value.editUser.department_id = selectedUser.department_id; // Установить департамент
      entity.value.editUser.date_of_born = new Date(selectedUser.date_of_born); // Установить дату рождени
      console.log('Updated user data:', entity.value.editUser); // Отладка
      
    }
  }
}

function setField<T extends keyof DataEdit>(field: T, value: DataEdit[T]) {
  if (entity.value && entity.value.editUser) {
    entity.value.editUser[field] = value;
    console.log("Updated field: ",field, value)
  }
  console.log(tg);
}

const isValid = computed(() => {
  const { surname, department_id, date_of_born } = entity.value.editUser;
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
