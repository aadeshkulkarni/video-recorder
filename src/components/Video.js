import React from "react";

const Video = ({ errorMsg, videoRef }) => {
  return errorMsg ? (
    <div className="w-full md:h-auto md:w-[800px] md:aspect-video md:rounded-t-lg border flex justify-center items-center border-gray-900 border-b-0 bg-white text-red-800 text-bold">
      {errorMsg}
    </div>
  ) : (
    <video
      ref={videoRef}
      className="w-full md:h-auto md:w-[800px] md:aspect-video md:rounded-t-lg border border-gray-900 border-b-0 bg-white"
    />
  );
};

export default Video;
