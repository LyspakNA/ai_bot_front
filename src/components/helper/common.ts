export function required(value: number | string | undefined | null){
    return !!value || value === 0 || 'Required field'
   }

export function dateIsValid(value: string){
    if (!isNaN(Date.parse(value))){
        const year = new Date(value).getFullYear()
        if (year > 2010) return 'Date must be less 2010'
    }
    return true
   }
