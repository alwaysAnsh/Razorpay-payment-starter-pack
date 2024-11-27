import React from 'react'
import {Link} from 'react-router-dom'

export const Home = () => {
  return (
    <div>
        <div>
            Home page
        </div>
        <div>
            <Link to ='/paypal'>
            <button className = 'border-2 p-2 bg-pink-300 text-black font-bold'>
                Paypal payment
                </button>
                </Link>

            <Link to ='/qr-code'>
            <button className = 'border-2 p-2 bg-orange-300 text-black font-bold'>
                QR Code
                </button>
                </Link>

            <Link to ='/razorpay'>
            <button className = 'border-2 p-2 bg-blue-300 text-black font-bold'>
                Razorpay Payment
                </button>
                </Link>
        </div>
    </div>
  )
}
