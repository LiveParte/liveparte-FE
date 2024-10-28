import React from 'react'
import AccessCard from './AccessCard';
import card1 from '../../../../public/images/liveparte-img-1.png';
import card2 from '../../../../public/images/liveparte-img-2.png';
import card3 from '../../../../public/images/liveparte-img-3.png';
import card4 from '../../../../public/images/liveparte-img-4.png';
import comment1 from '../../../../public/images/comment1.png';
import comment2 from '../../../../public/images/comment2.png';
import comment3 from '../../../../public/images/comment3.png';
// import jdjjd from '../../../../../public'

const DisplayCard = () => {
    return (
        <div>
            <h1 className="text-center text-white.200 font-mdtest font-bold md:text-[62px] md:leading-[62px] text-[32px] leading-[32px] tracking-[0.48px] mt-24">ACCESS LIKE NEVER BEFORE.</h1>
            <div className="grid lg:grid-cols-4 grid-cols-1 w-[85%] mx-auto mt-10 gap-6">
                <AccessCard
                    gradientColor="bg-linear-gradient-yellow"
                    imgBgColor="bg-yellow.100"
                    gradient
                    cardImg={card1}
                    hasComment
                    commentImg={comment1}
                    title="WATCH"
                    description="Get access to events live and on-demand across the world."
                />
                <AccessCard
                    imgBgColor="bg-green.100"
                    gradientColor="bg-linear-gradient-yellow"
                    cardImg={card2}
                    commentImg={comment2}
                    hasComment
                    commentWidth="w-[94%]"
                    title="ENGAGE"
                    description="Chat and engage with artists and other fans during live events."
                />
                <AccessCard
                    imgBgColor="bg-red.100"
                    gradientColor="bg-linear-gradient-red"
                    gradient
                    hasComment
                    cardImg={card3}
                    commentImg={comment3}
                    commentWidth="w-[156px] ml-11"
                    title="GIFT"
                    description="Send cash gifts to your favourite artiste during and after live shows."
                />
                <AccessCard
                    imgBgColor="bg-blue.100"
                    gradientColor="bg-linear-gradient-blue"
                    gradient
                    cardImg={card4}
                    commentImg={comment1}
                    title="MERCH"
                    description="Show off your fandom with limited edition t-shirts, signed CDs, and other merch."
                />
            </div>
        </div>
    );
};

export default DisplayCard;