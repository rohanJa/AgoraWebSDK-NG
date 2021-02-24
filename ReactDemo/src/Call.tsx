import React, { useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from './hooks/useAgora';
import MediaPlayer from './components/MediaPlayer';
import './Call.css';
// import Agora from 'ago'
import Agora from 'agora-access-token'

const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });

function Call() {
  const [ appid, setAppid ] = useState('');
  const [ token, setToken ] = useState('');
  const [ channel, setChannel ] = useState('');
  const [tempToken, setTempToken] = useState("")
  const {
    localAudioTrack, localVideoTrack, leave, join, joinState, remoteUsers
  } = useAgora(client);
  console.log("!joinState val",joinState)
  console.log("!joinState val is ",!joinState)
  console.log("uuid",client.uid)
  const handleButton =()=>{
    const appID = "504046bb987046a28fcf61773bc700ec";
    const appCertificate = "8ea283505a45493682401d8b2b7846eb";
    const expirationTimeInSeconds = 3600;
    const uid = 0
    const role = 1
    const channel = "add";
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expirationTimestamp = currentTimestamp + expirationTimeInSeconds;
    setAppid(appID)
    setChannel(channel)
    const token = Agora.RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channel, uid, role, expirationTimestamp);
    console.log("Token is ",token)
    setTempToken(token)
    setToken(token)
  }
  console.log("joinstate bool",joinState && localVideoTrack)
  console.log("joinstate ",joinState)
  console.log("joinstate localvideo",localVideoTrack)
  return (
    <div className='call'>
      <form className='call-form'>
        <label>
          AppID:
          <input type='text' name='appid' value={appid} onChange={(event) => { setAppid(event.target.value) }}/>
        </label>
        <label>
          Token(Optional):
          <input type='text' name='token' value={token} onChange={(event) => { setToken(event.target.value) }} />
        </label>
        <label>
          Channel:
          <input type='text' name='channel'value={channel} onChange={(event) => { setChannel(event.target.value) }} />
        </label>
        <div className='button-group'>
          <button id='join' type='button' className='btn btn-primary btn-sm' disabled={joinState} onClick={() => {join(appid, channel, token)}}>Join</button>
          <button id='leave' type='button' className='btn btn-primary btn-sm' disabled={!joinState} onClick={() => {leave()}}>Leave</button>
        </div>
      </form>
      <button onClick={handleButton}>Gen Token</button>
      {/* <h1>Join state : {joinState}</h1> */}
      <div className='player-container'>
        <div className='local-player-wrapper'>
        <h1>Hi there</h1>
        <p>Token val{tempToken}</p>
          <p className='local-player-text'>{localVideoTrack && `localTrack`}{joinState && localVideoTrack ? `(${client.uid})` : ''}</p>
          <MediaPlayer videoTrack={localVideoTrack} audioTrack={localAudioTrack}></MediaPlayer>
        </div>
        {remoteUsers.length >0&& <h1>Remote User List</h1>}
        {remoteUsers.map(user => (<div className='remote-player-wrapper' key={user.uid}>
          
            <p className='remote-player-text'>{`remoteVideo(${user.uid})`}</p>
            <MediaPlayer videoTrack={user.videoTrack} audioTrack={user.audioTrack}></MediaPlayer>
          </div>))}
      </div>
    </div>
  );
}

export default Call;
