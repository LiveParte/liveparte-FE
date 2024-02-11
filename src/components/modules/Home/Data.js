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


export const LoginForm =()=>{
    return [
        {
            name:'',
            label:'Email Address',
            // type:''
        },
        {
            name:'',
            label:'Password',
            type:'password'
        },
    ]
}


export const SignUpForm =()=>{
    return [
        {
            name:'',
            label:'Name',
            // type:''
        },
        {
            name:'',
            label:'Email Address',
            // type:''
        },
        {
            name:'',
            label:'Phone number',
            type:'tel'
        },
        {
            name:'',
            label:'Password',
            type:'password'
        },
    ]
}