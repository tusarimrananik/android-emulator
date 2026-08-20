import React from 'react';
import { Composition } from 'remotion';
import { PhoneShowcaseVideo } from './PhoneShowcaseVideo';
import { LongWorkflowVideo } from './LongWorkflowVideo';
import { ApiWorkflowVideo, calculateApiWorkflowMetadata } from './ApiWorkflowVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DeviceViewport"
        component={PhoneShowcaseVideo}
        durationInFrames={420} // 7.0 seconds at 60 FPS
        fps={60}
        width={824}
        height={1830}
      />
      <Composition
        id="LongWorkflow"
        component={LongWorkflowVideo}
        durationInFrames={1800}
        fps={60}
        width={824}
        height={1830}
      />
      <Composition
        id="ApiWorkflow"
        component={ApiWorkflowVideo}
        durationInFrames={60}
        fps={60}
        width={824}
        height={1830}
        defaultProps={{ actions: [{ type: 'home', duration: 1 }], fps: 30 }}
        calculateMetadata={calculateApiWorkflowMetadata}
      />
    </>
  );
};
