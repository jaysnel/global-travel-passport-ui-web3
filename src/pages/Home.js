import React from 'react'

export default function Home() {
  return (
    <div className='max-w-2xl m-auto home-content'>
        <h1>Global Passport App</h1>
        <p>Welcome! Here is a concept I have created to keep passport data in one place. The idea is a global tracking system for people who hold passports.</p>
        <p>This would elemenate the need to carry a passport in general. And something that can be easily searched by authorities.</p>
        <p className='text-red-600'>Note: If you do not see data, make sure you have the Goerli chain open in your wallet.</p>
    </div>
  )
}
