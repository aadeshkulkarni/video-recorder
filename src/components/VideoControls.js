import React from "react";
import Button from "./Button";

const VideoControls = ({
  recording,
  paused,
  pauseRecording,
  resumeRecording,
  startRecording,
  stopRecording,
  videoBlob,
  setShowPreview,
  handleDownload,
  elapsedTime
}) => {
  return (
    <div className="absolute bottom-0 md:static w-full flex flex-col md:flex-row gap-2 md:gap-4 justify-between items-center p-4 md:rounded-b-lg border-t border-gray-800 bg-white bg-opacity-80 md:bg-opacity-100">
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full ">
        {recording && !paused && <Button onClick={pauseRecording} title="Pause" />}

        {recording && paused && <Button onClick={resumeRecording} title="Resume" />}

        {!recording && <Button onClick={startRecording} title="Record" />}

        {recording && <Button onClick={stopRecording} title="Stop" />}

        {videoBlob && (
          <>
            <Button onClick={() => setShowPreview(true)} title="Preview" />
            <Button onClick={handleDownload} title="Download" />
            {/* <video src={URL.createObjectURL(videoBlob)} controls /> */}
          </>
        )}
      </div>
      {recording && <div className="flex gap-4 min-w-[140px]">⏳: {`${elapsedTime} seconds`}</div>}
    </div>
  );
};

export default VideoControls;
