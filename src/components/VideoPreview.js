import React from "react";
import Button from "./Button";

const VideoPreview = ({ videoBlob, setShowPreview, handleDownload }) => {
  return (
    <div className="fixed w-screen h-screen z-10 top-0 left-0 flex justify-center items-center">
      {videoBlob && (
        <div className="z-20 md:bg-white w-full md:w-auto md:h-auto p-1 flex flex-col justify-center items-center">
          <h1 className="p-4">Video Preview</h1>
          <video
            className="md:w-[800px] aspect-video"
            src={URL.createObjectURL(videoBlob)}
            controls
          />
          <div className="absolute bottom-0 md:static flex flex-col md:flex-row justify-center items-center p-2 gap-4 w-full">
            <Button onClick={handleDownload} title="Download" />
            <Button onClick={() => setShowPreview(false)} title="Close" />
          </div>
        </div>
      )}
      <div className="absolute top-0 left-0 bg-black md:bg-opacity-80 w-full h-full"></div>
    </div>
  );
};

export default VideoPreview;
