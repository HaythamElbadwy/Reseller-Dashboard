import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <>

      <footer className={`${styles.footer_reseller} w-full h-10 fixed bottom-0 z-50`}>
        <div className='mt-2 text-start flex items-center justify-center'>
          <i class="fa-regular fa-copyright"></i>
          <h1 className='ml-1 mb-1'>Copyright Mira,All Rights Reserved</h1>
        </div>
      </footer>

    </>
  )
}
