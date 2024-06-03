import { REGEX_PATTERNS } from "@/utils/constants/errors"

export const LoginForm =()=>{
    return [
        {
            name:'',
            label:'Email Address',
            type:'text'
        },
        {
            name:'',
            label:'Password',
            type:'password'
        },
    ]
}


export const GiftTicketForm =()=>{
    return [
        {
            name:'recipient_name',
            label:'Name of who you want to gift',
            required: true
            // type:''
        },
        {
            name:'recipient_email',
            label:'Email Address',
            pattern:REGEX_PATTERNS?.EMAIL,
            required: true
            // type:''
        },
       
        {
            name:'message',
            label:'Type your message here (Optional)',
            type:'textarea',
            required: true
        },
    ]
}