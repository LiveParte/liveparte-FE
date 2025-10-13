"use client";
import React from 'react';
import dynamic from 'next/dynamic';

// Dynamic import to avoid ES module issues
const HLSExample = dynamic(() => import('../components/VideoPlayer/HLSExample'), { 
  ssr: false,
  loading: () => (
    <div className="w-full max-w-4xl mx-auto bg-black rounded-lg overflow-hidden">
      <div className="w-full h-96 flex items-center justify-center bg-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-300">Loading HLS player...</p>
        </div>
      </div>
    </div>
  )
});

const HLSSimplePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Simple HLS Player Test</h1>
        
        <div className="mb-8">
          <HLSExample />
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <ul className="space-y-2 text-gray-300">
            <li>• HLS.js integration with your existing stream</li>
            <li>• Custom video controls</li>
            <li>• Real-time HLS statistics</li>
            <li>• Volume and mute controls</li>
            <li>• Seek functionality</li>
            <li>• Error handling</li>
            <li>• Live and VOD stream support</li>
          </ul>
        </div>

        <div className="mt-8 bg-blue-900/20 border border-blue-500/30 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-blue-300">Integration</h3>
          <p className="text-blue-100 mb-4">
            To use this HLS player in your existing components, simply import and use the HLSPlayer component:
          </p>
          <pre className="bg-gray-900 p-4 rounded text-sm text-green-400 overflow-x-auto">
{`import HLSPlayer from '@/components/VideoPlayer/HLSPlayer';

// In your component:
const playerRef = useRef();

<HLSPlayer
  ref={playerRef}
  src="your-hls-stream-url.m3u8"
  autoPlay={false}
  muted={false}
  controls={true}
  onPlay={() => console.log('Playing')}
  onPause={() => console.log('Paused')}
  onTimeUpdate={(time) => console.log('Current time:', time)}
  onLoadedMetadata={(duration) => console.log('Duration:', duration)}
  onHlsStats={(stats) => console.log('HLS Stats:', stats)}
  isLive={false}
  debug={true}
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default HLSSimplePage;
