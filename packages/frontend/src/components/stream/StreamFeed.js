import {React} from 'react';
import { useState, useEffect } from 'react';
import logo from '../../images/coinbase.png';
import styles from '../../styles/livepeer.css';
import { Player } from '@livepeer/react';
import NEXT_PUBLIC_STREAM_ID from '../../constants/livepeer.ts';
import { Link } from 'react-router-dom';

interface Visibility {
    isVisible: boolean
}

export function StreamFeed(props: Visibility) {
    const [getStreamInfo, setGetStreamInfo] = useState('');
    const {isVisible} = props;
    // const [visible, setVisible] = useState('false');
  
    async function getStream() {
      // const streamID = process.env.NEXT_PUBLIC_STREAM_ID
      // const apiKey = process.env.NEXT_PUBLIC_API_KEY
      const res = await fetch(`https://livepeer.studio/api/stream/577a9045-3be3-4319-84c6-7783561a4a0b`, {
        headers: {
          Authorization: `Bearer a5451faf-8431-451c-a0b4-0877aa3e8613`,
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
              {getStreamInfo.isActive ? (
                <>
                {isVisible ? (
                    <>
                    <Player
                    playbackId={`${getStreamInfo.playbackId}`}
                    autoPlay={true}
                    width={300}
                    loop
                    muted
                    controls={{autohide: 0, hotkeys: false}}
                  />
                  <p>Stream Status:</p>
                  <p className={styles.ready}>Live Now!</p>
                  <p> {getStreamInfo.name} </p>
                  </>
                ) : (
                    <>
                    <p>Stream Status:</p>
                  <p className={styles.ready}>Live Now!</p>
                  <p> {getStreamInfo.name} </p>
                    </>
                )}
                  
                </>
              ) : (
                <>
                  <img src={logo} alt='Livepeer Studio Logo' width='50' height='50' />
                  <h2> {getStreamInfo.name} </h2>
                  <p>Stream Status:</p>
                  <p className={styles.failed}>Not Live</p>
                </>
              )}
          </div>
        )}
      </main>
    );
  }
  