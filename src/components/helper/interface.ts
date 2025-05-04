export interface DataForm {
    registration?: DataRegistration
    birthday?: DataBirthday
    customMessage?: DataCustom
    editUser?: DataEdit
}

export interface DataRegistration {
    surname: string
    department_id: number
    date_of_born: Date
}

export interface DataEdit {
    id: number
    tag_id: number
    surname: string
    department_id: number
    date_of_born: any
}

export interface DataBirthday {
    surname: string
    department_id: number
    link: string
}

export interface DataCustom {
    usersIgnore: []
    department_id: number
    message: string
}

export interface User {
    id: number
    surname: string
    department_id: number
    date_of_born: Date
}