import axios from "axios";
import { DataForm } from "./interface";
import useTelegram from "./composables/telegram";

const tg = useTelegram()

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
axios.defaults.headers.common['x-api-key'] = 'SimpleForHackingKey'
axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'any'

export async function onSend(data: DataForm){
    tg.sendData(JSON.stringify(data));
    tg.close()
}

export async function getUsers(department: number){
    try {
        const res = await axios.get('/api/user', {
            params: {
                department_id: department
            }
        });
        const users = res.data.map((user: { surname: string; }) => user.surname)
        return users
    } catch(err) {
        console.log(err)
    }
}

export async function getAllUsersObjects(){
    try {
        const res = await axios.get('/api/user', {});
        const users = res.data.map((user:any) => user)
        return users
    } catch(err) {
        console.log(err)
    }
}