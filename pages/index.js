import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Public Service Announcement</title>
        <meta name='description' content='PSA' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <Link href='https://livepeer.studio'>Welcome to Livepeer Studio! 🎥 </Link>
        </h1>

        <div className={styles.grid}>
          <Link href='livestream'>
            <a className={styles.card}>
              <h2>LiveStream &rarr;</h2>
              <p>Learn all about Livepeer Studio&apos;s Livestream</p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}