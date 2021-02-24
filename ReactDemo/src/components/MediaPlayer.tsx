import { ILocalVideoTrack, IRemoteVideoTrack, ILocalAudioTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import React, { useRef, useEffect, useState } from "react";

export interface VideoPlayerProps {
  videoTrack: ILocalVideoTrack | IRemoteVideoTrack | undefined;
  audioTrack: ILocalAudioTrack | IRemoteAudioTrack | undefined;
}

const MediaPlayer = (props: VideoPlayerProps) => {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!container.current) return;
    props.videoTrack?.play(container.current);
    return () => {
      props.videoTrack?.stop();
    };
  }, [container, props.videoTrack]);
  
  const [st,setSt] = useState(false)
  const  setVl=(props:any)=>{
    setSt(!st)
  if(st) props.audioTrack?.setEnabled(0)
  else props.audioTrack?.setEnabled(100)

  }
  const [ca,setca] = useState(false)
  const  setcam=(props:any)=>{
    setca(!ca)
  if(ca) props.videoTrack?.setEnabled(false)
  else props.videoTrack?.setEnabled(true)

  }
  useEffect(() => {
    props.audioTrack?.play();
    return () => {
      props.audioTrack?.stop();
    };
  }, [props.audioTrack]);
  return (
    <>
    <div ref={container}  className="video-player" style={{ width: "320px", height: "240px"}}></div>
    <button onClick={()=>setVl(props)}>Volume</button>
    <button onClick={()=>setcam(props)}>Camera</button>
    </>
    );
}

export default MediaPlayer;