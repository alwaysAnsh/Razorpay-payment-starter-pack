import React from 'react'
import {QRCodeCanvas} from 'qrcode.react';

const QRcode = () => {
  return (
    <div>
        <div>
            Scan the QR code 
        </div>
        <div className="relative inline-block">
      
      <QRCodeCanvas value="https://razorpay.me/@rankved7533" />

      {/* Transparent Overlay */}
      <div
        className="absolute inset-0 bg-transparent"
        onContextMenu={(e) => e.preventDefault()} // Disable right-click
      ></div>
    </div>
    </div>
  )
}

export default QRcode