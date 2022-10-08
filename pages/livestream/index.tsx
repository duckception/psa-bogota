import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { VideoPlayer } from '@livepeer/react';
import logo from '../../public/studioLogo.png';
import styles from '../../styles/Assets.module.css';

export default function GetStreamById() {
  const [getStreamInfo, setGetStreamInfo] = useState('');

  async function getStream() {
    // e.preventDefault();
    const res = await fetch(`/api/stream/${process.env.STREAM_ID}`);

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
                  width={200}
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
