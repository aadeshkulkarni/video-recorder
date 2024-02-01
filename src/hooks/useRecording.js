import { useRef, useState } from "react";
import useMobile from "./useMobile";

function useRecording() {
  const isMobile = useMobile();
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const startTimeRef = useRef(null);
  const pausedTimeRef = useRef(null);
  const totalPausedTimeRef = useRef(0);

  const startRecording = async () => {
    try {
      let ratio = isMobile ? 9 / 16 : 16 / 9;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { aspectRatio: ratio, facingMode: "user" },
        audio: true,
      });
      videoRef.current.srcObject = stream;
      videoRef.current.play();

      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
      mediaRecorderRef.current.start();

      startTimeRef.current = Date.now();
      setRecording(true);
      setPaused(false);
    } catch (error) {
      console.error("Error accessing camera/audio:", error);
      setErrorMsg("Error accessing camera/audio. Please grant permissions.");
    }
  };

  const stopRecording = async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stream.getTracks().forEach((track) => {
        if (track.readyState === "live") {
          track.stop();
        }
      });
      mediaRecorderRef.current = null;
    }
    setPaused(false);
    setRecording(false);
    totalPausedTimeRef.current = 0;
  };

  const pauseRecording = () => {
    mediaRecorderRef.current.stream.getTracks().forEach((track) => {
      if (track.readyState === "live") {
        console.log(track);
        track.enabled = false;
      }
    });
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.pause();
      pausedTimeRef.current = Date.now();
      setPaused(true);
    }
  };

  const resumeRecording = () => {
    mediaRecorderRef.current.stream.getTracks().forEach((track) => {
      if (track.readyState === "live") {
        console.log(track);
        track.enabled = true;
      }
    });
    if (mediaRecorderRef.current && paused) {
      mediaRecorderRef.current.resume();
      totalPausedTimeRef.current += Date.now() - pausedTimeRef.current;
      setPaused(false);
    }
  };

  const handleDataAvailable = async (event) => {
    if (event.data && event.data.size > 0) {
      const videoBlob = new Blob([event.data], { type: "video/webm" });
      setVideoBlob(videoBlob);
    }
  };

  const handleDownload = () => {
    const videoUrl = URL.createObjectURL(videoBlob);
    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = "recorded_video.webm";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const elapsedTime =
  recording && startTimeRef.current
    ? Math.floor((Date.now() - startTimeRef.current - totalPausedTimeRef.current) / 1000)
    : 0;

  let essentials = {
    startRecording,
    pauseRecording,
    stopRecording,
    resumeRecording,
    handleDownload,
    recording,
    paused,
    videoBlob,
    errorMsg,
    showPreview,
    setShowPreview,
    videoRef,
    elapsedTime
  };

  return essentials;
}

export default useRecording;
