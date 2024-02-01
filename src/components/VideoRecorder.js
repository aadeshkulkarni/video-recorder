import React from "react";
import Video from "./Video";
import VideoControls from "./VideoControls";
import VideoPreview from "./VideoPreview";
import useRecording from "../hooks/useRecording";

const VideoRecorder2 = () => {
  const {
    startRecording,
    pauseRecording,
    stopRecording,
    resumeRecording,
    handleDownload,
    setShowPreview,
    recording,
    paused,
    videoBlob,
    errorMsg,
    showPreview,
    videoRef,
    elapsedTime,
  } = useRecording();

  return (
    <div className="w-full h-full md:h-auto md:w-auto border border-gray-100 md:rounded-lg p-4 flex flex-col justify-center items-center md:shadow-xl bg-black">
      <Video videoRef={videoRef} errorMsg={errorMsg} />

      <VideoControls
        recording={recording}
        paused={paused}
        pauseRecording={pauseRecording}
        resumeRecording={resumeRecording}
        startRecording={startRecording}
        stopRecording={stopRecording}
        videoBlob={videoBlob}
        setShowPreview={setShowPreview}
        handleDownload={handleDownload}
        elapsedTime={elapsedTime}
      />
      {showPreview && (
        <VideoPreview
          videoBlob={videoBlob}
          setShowPreview={setShowPreview}
          handleDownload={handleDownload}
        />
      )}
    </div>
  );
};

export default VideoRecorder2;
