import { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Qino</title>
        <meta
          name='description'
          content='A web-based Guqin notation engraver'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </div>
  )
}

export default Home
