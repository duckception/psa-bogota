import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { VideoPlayer } from '@livepeer/react';
import logo from '../public/studioLogo.png';
import styles from '../styles/Assets.module.css';
// import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config()

export default function GetStreamById() {
  const [getStreamInfo, setGetStreamInfo] = useState('');

  async function getStream() {
    // e.preventDefault();
    // const streamID = '577a9045-3be3-4319-84c6-7783561a4a0b'
    // const apiKey = 'a5451faf-8431-451c-a0b4-0877aa3e8613'
    const streamID = process.env.NEXT_PUBLIC_STREAM_ID
    const apiKey = process.env.NEXT_PUBLIC_API_KEY
    const res = await fetch(`https://livepeer.studio/api/stream/${streamID}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      }
    });

    const data = await res.json();

    setGetStreamInfo(data);
  }

  useEffect(() => {
    getStream();
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Live Stream</h1>

      {!getStreamInfo ? null : (
        <div className={styles.card} key={getStreamInfo.id}>
          <Link href={`/streams/${getStreamInfo.id}`}>
            {getStreamInfo.isActive ? (
              <a>
                <VideoPlayer
                  playbackId={`${getStreamInfo.playbackId}`}
                  autoPlay={false}
                  width={700}
                  loop
                  muted
                />
                <p>Stream Status:</p>
                <p className={styles.ready}>Live Now!</p>
                <p> {getStreamInfo.name} </p>
              </a>
            ) : (
              <a>
                <Image src={logo} alt='Livepeer Studio Logo' width='50' height='50' />
                <h2> {getStreamInfo.name} </h2>
                <p>Stream Status:</p>
                <p className={styles.failed}>Not Live</p>
              </a>
            )}
          </Link>
        </div>
      )}
    </main>
  );
}
