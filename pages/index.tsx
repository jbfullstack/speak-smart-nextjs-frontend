import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const HomePage: React.FC = () => {
  return (
    <div className="">
      <Head>
        <title>Welcome to Speak Smart</title>
        {/* Add any other head elements here */}
      </Head>

      <main className="max-w-4xl mx-auto pt-16">
        <h1>Welcome to Speak Smart, a home-made Jarvis</h1>
        <Link href="/my-jarvis">
          My Jarvis
        </Link>
      </main>
    </div>
  )
}

export default HomePage