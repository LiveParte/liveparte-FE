import dynamic from 'next/dynamic'
 
const CheckOtherShows = dynamic(() => import('@/components/Agora/modules/CheckOtherShows'), {
  loading: () => <p>Loading...</p>,
})
// import CheckOtherShows from '@/components/Agora/modules/CheckOtherShows'
// import React from 'react'

export default function index() {
  return (
    <div>
        <CheckOtherShows/>
    </div>
  )
}
