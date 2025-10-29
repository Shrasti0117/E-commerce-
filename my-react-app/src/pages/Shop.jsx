import React from 'react'
import Hero from '../components/Hero/Hero'
import Popular from '../components/popular/Popular'
import Offer from '../components/offer/Offer'
import Newcollection from '../components/newcollections/Newcollection'
import Newsletter from '../components/Newsletter/Newsletter'

const Shop = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      <Offer/>
      <Newcollection/>
      <Newsletter/>
    </div>
  )
}

export default Shop
