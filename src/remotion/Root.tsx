import React from 'react';
import { Composition } from 'remotion';
import { PhoneShowcaseVideo } from './PhoneShowcaseVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DeviceViewport"
        component={PhoneShowcaseVideo}
        durationInFrames={420} // 7.0 seconds at 60 FPS
        fps={60}
        width={1080}
        height={1920}
      />
    </>
  );
};
