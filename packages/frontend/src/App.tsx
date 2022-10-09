import React from 'react'
import { LivepeerConfig, createReactClient, studioProvider } from "@livepeer/react";
import { Routing } from './components/Routing';

export function App( ) {
  const client = createReactClient({
    provider: studioProvider({ apiKey: "a5451faf-8431-451c-a0b4-0877aa3e8613" }),
  });
 return (
   <>
     <LivepeerConfig client={client}>
         <Routing />
     </LivepeerConfig>
   </>
 );
}

