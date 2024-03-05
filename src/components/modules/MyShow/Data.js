export const SettingFormLabel =()=>{
    return [
        {
            name:'fullName',
            label:'Name',
            type:'text'
        },
        {
            name:'email',
            label:'Email Address',
            type:'text'
        },
        {
            name:'phone',
            label:'Phone number',
            type:'text'
        },
    ]
};


export const SecurityFormLabel =()=>{
    return [
        {
            name:'password',
            label:'Current password',
            type:'password'
        },
        {
            name:'password',
            label:'New password',
            type:'password'
        },
        {
            name:'confirmPassword',
            label:'Confirm password',
            type:'password'
        },
    ]
}