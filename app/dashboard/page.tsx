'use client'
import React from 'react'
import { signOut } from 'next-auth/react'

type Props = {}

const dashboard = (props: Props) => {
  return (
    <div>
      <div>dashboard</div>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
    
  )
}

export default dashboard