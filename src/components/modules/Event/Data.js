import { REGEX_PATTERNS } from "@/utils/constants/errors"

export const dummyShowData=[
    {
        name:'REMA',
        showImage:'/public/webp/show.png',
        isLive:true,
        venue:'O2 Cinema Arena Concert',
        id:1,
    },
    {
        name:'AFRO NATION',
        showImage:'/public/webp/show2.png',
        isLive:true,
        venue:'The world’s biggest Afrobeats festival',
        id:2,
    },
    {
        name:'BURNA BOY',
        showImage:'/public/webp/show2.png',
        isLive:true,
        venue:'The world’s biggest Afrobeats festival',
        id:3,
    },
    {
        name:'BIG WIZ',
        showImage:'/publicr/webp/show2.png',
        isLive:true,
        venue:'The world’s biggest Afrobeats festival',
        id:4,
    }
]

export const dummyShowDataII=[
    {
        name:'REMA',
        showImage:'/public/webp/show.png',
        isLive:true,
        venue:'O2 Cinema Arena Concert',
        id:1,
    },
    {
        name:'AFRO NATION',
        showImage:'/public/webp/show2.png',
        isLive:true,
        venue:'The world’s biggest Afrobeats festival',
        id:2,
    },
    {
        name:'BURNA BOY',
        showImage:'/public/webp/show2.png',
        isLive:true,
        venue:'The world’s biggest Afrobeats festival',
        id:3,
    },
    {
        name:'BIG WIZ',
        showImage:'/publicr/webp/show2.png',
        isLive:true,
        venue:'The world’s biggest Afrobeats festival',
        id:4,
    },
    {
        name:'REMA',
        showImage:'/public/webp/show.png',
        isLive:true,
        venue:'O2 Cinema Arena Concert',
        id:1,
    },
    {
        name:'AFRO NATION',
        showImage:'/public/webp/show2.png',
        isLive:true,
        venue:'The world’s biggest Afrobeats festival',
        id:2,
    },
    {
        name:'BURNA BOY',
        showImage:'/public/webp/show2.png',
        isLive:true,
        venue:'The world’s biggest Afrobeats festival',
        id:3,
    },
    {
        name:'BIG WIZ',
        showImage:'/publicr/webp/show2.png',
        isLive:true,
        venue:'The world’s biggest Afrobeats festival',
        id:4,
    }
]



export const LoginForm =()=>{
    return [
        {
            name:'email',
            label:'Email Address',
            // type:''
        },
        {
            name:'password',
            label:'Password',
            type:'password'
        },
    ]
}


export const SignUpForm =()=>{
    return [
        {
            name:'fullName',
            label:'Name',
            // type:''
        },
        {
            name:'email',
            label:'Email Address',
            pattern:REGEX_PATTERNS?.EMAIL
            // type:''
        },
        {
            name:'phoneNumber',
            label:'Phone number',
            type:'tel',
            pattern:REGEX_PATTERNS?.NUMBER
        },
        {
            name:'password',
            label:'Password',
            type:'password'
        },
    ]
}

export const ForgetPasswordForm =()=>{
    return [
        {
            name:'email',
            label:'Email Address',
            // type:''
        },
      
    ]
}



export const SecurityFormLabel =()=>{
    return [
       
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