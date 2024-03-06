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
            pattern:REGEX_PATTERNS?.EMAIL
        },
        {
            name:'phone',
            label:'Phone number',
            type:'number',
            pattern:REGEX_PATTERNS?.NUMBER
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