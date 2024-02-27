import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
function WithAuth({
    children
}) {
    const router = useRouter()
    const isAuthenticated =true;


    useEffect(() => {
     if(isAuthenticated){
        router.push('/')
     }
    }, [isAuthenticated])
    
    return (
        <div className='min-h-[100vh] bg-white'>
            {!isAuthenticated?children:<div></div>}
        </div>
    );
}

export default WithAuth;