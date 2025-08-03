import React from 'react'
import "./newsletter.css"

const Newsletter = () => {
  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offer on Your Email</h1>
      <p>Subscribe to our newsletter and stay updated </p>
      <div>
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default Newsletter
