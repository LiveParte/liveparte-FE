import {
  Feature1Icon,
  Feature2con,
  Feature3con,
} from "../../../../public/svg";

export const FeatureData = [
  {
    name: "Stream Live, on the go",
    dec: `Access live concert event on 
     your device at any location 
     and time.`,
    icon: <Feature1Icon />,
    color:'text-[#FA4354]'
  },
  {
    name: "Watch On demand",
    dec: `Replay and watch missed concerts as many times as possible on demand.`,
    icon: <Feature2con />,
    color:'text-[#00A699]'
  },
  {
    name: "Gift your favs",
    dec: "Send gifts to your favourite artistewith cash equivalent coins duringand after live shows.",
    icon: <Feature3con />,
    color:'text-[#FFC41B]'
  },
];



export const FAQData =[
  {
    name:`How long will livestreams  last?<br/> <div class='hidden xl:block invisible'> .</div>`,
    desc:`Livestreams are real live events and  the length of the event is entirely  up to the artist and venues.`

  },
  {
    name:`What payment methods are  accepted?`,
    desc:`We accept all methods of payment; Bank  transfer, Card payment, Mobile Money  transfer.`
  },
  {
    name:`Can I watch the event for  free? <br/> <div class='hidden xl:block invisible'>. </div>`,
    desc:`No, you have to pay for the event ticket to get  access to watch the event live, you can also  come back to watch the event even after it has  ended.`
  }
]