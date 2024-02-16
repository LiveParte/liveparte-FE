
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
            name:'',
            label:'Name of who you want to gift',
            // type:''
        },
        {
            name:'',
            label:'Email Address',
            // type:''
        },
       
        {
            name:'',
            label:'Type your message here (Optional)',
            type:'textarea'
        },
    ]
}