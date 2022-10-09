import React from 'react';
import { useState, useEffect } from 'react';
import logo from '../../images/coinbase.png';
import styles from '../../styles/livepeer.css';
import { Player } from '@livepeer/react';
import NEXT_PUBLIC_STREAM_ID from '../../constants/livepeer.ts';

export function StreamFeed() {
    const [getStreamInfo, setGetStreamInfo] = useState('');
  
    async function getStream() {
      //const streamID = process.env.NEXT_PUBLIC_STREAM_ID
      const apiKey = process.env.NEXT_PUBLIC_API_KEY
      const res = await fetch(`https://livepeer.studio/api/stream/577a9045-3be3-4319-84c6-7783561a4a0b`, {
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
            <a href={`/streams/${getStreamInfo.id}`}>
              {getStreamInfo.isActive ? (
                <a>
                  <Player
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
                  <img src={logo} alt='Livepeer Studio Logo' width='50' height='50' />
                  <h2> {getStreamInfo.name} </h2>
                  <p>Stream Status:</p>
                  <p className={styles.failed}>Not Live</p>
                </a>
              )}
            </a>
          </div>
        )}
      </main>
    );
  }
  