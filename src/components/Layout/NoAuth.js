import React from 'react';

function NoAuth({
    children
}) {
    return (
        <div className='min-h-[100vh] bg-white'>
            {children}
        </div>
    );
}

export default NoAuth;