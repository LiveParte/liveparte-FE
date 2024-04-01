import { REGEX_PATTERNS } from "@/utils/constants/errors";

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
            type:'text',
            pattern:REGEX_PATTERNS?.EMAIL,
            disabled:true,
            className:'cursor-'
        },
        {
            name:'phone',
            label:'Phone number',
            type:'number',
            pattern:REGEX_PATTERNS?.NUMBER
        },
    ]
};


export const SecurityFormLabel =(confirmPassword)=>{
    return [
        {
            name:'currentPassword',
            label:'Current password',
            type:'password'
        },
        {
            name:'newPassword',
            label:'New password',
            type:'password',
          
        },
        {
            name:'confirmPassword',
            label:'Confirm New password',
            type:'password',
            handlePasswordValidate:(value)=>value === confirmPassword || "The passwords do not match"
            // handlePasswordValidate:(value)=>console.log(value,confirmPassword,value===confirmPassword,'confirmPassword')
        },
    ]
}