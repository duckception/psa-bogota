import '../styles/globals.css'
import Layout from '../components/Layout';
import { LivepeerConfig, createReactClient, studioProvider } from "@livepeer/react";
// import {  } from "livepeer/providers/studio";



function MyApp( { Component, pageProps } ) {
   const client = createReactClient({
     provider: studioProvider({ apiKey: process.env.NEXT_PUBLIC_API_CORS }),
   });
  return (
    <>
      <LivepeerConfig client={client}>
 
          <Component {...pageProps} />

      </LivepeerConfig>
    </>
  );
}

export default MyApp
