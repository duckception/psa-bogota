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
        <Link href='livestream'>PUBLIC SERVICE ANNOUNCEMENT </Link>
        </h1>

        <div className={styles.grid}>
        </div>
      </main>
    </div>
  );
}