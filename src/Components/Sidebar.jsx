import AgoraRTC from 'agora-rtc-sdk-ng';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'


const Sidebar = ({ setLang, socketRef, roomId, langu }) => {

    const [mic, setMic] = useState(false);
    const [localStream, setLocalStream] = useState(null);
    const [remoteStreams, setRemoteStreams] = useState({});
    const [client, setClient] = useState(null);
    const appid = "264ceaa96b9d4a298a312cdac0952fe1";
    const token = null;
    const uid = useRef(sessionStorage.getItem('uid') || String(Math.floor(Math.random() * 10000)));
    const localTrackRef = useRef(null);

    useEffect(() => {
        sessionStorage.setItem('uid', uid.current);

        const initClient = async () => {
            const agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
            await agoraClient.join(appid, roomId, token, uid.current);

            agoraClient.on('user-published', handleUserPublished);
            agoraClient.on('user-unpublished', handleUserUnpublished);
            agoraClient.on('user-left', handleUserLeft);

            setClient(agoraClient);
        };

        initClient();
    }, [appid, roomId, token]);

    const joinStream = useCallback(async () => {
        if (client) {
            const localTrack = await AgoraRTC.createMicrophoneAudioTrack();
            localTrack.play();
            setLocalStream(localTrack);
            localTrackRef.current = localTrack;

            await client.publish([localTrack]);
            setMic(true);
        }
    }, [client]);

    const handleUserPublished = async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === 'audio') {
            const remoteAudioTrack = user.audioTrack;
            setRemoteStreams(prevStreams => ({
                ...prevStreams,
                [user.uid]: remoteAudioTrack
            }));
            remoteAudioTrack.play();
        }
    };

    const handleUserUnpublished = (user) => {
        setRemoteStreams(prevStreams => {
            const newStreams = { ...prevStreams };
            delete newStreams[user.uid];
            return newStreams;
        });
    };

    const handleUserLeft = (user) => {
        setRemoteStreams(prevStreams => {
            const newStreams = { ...prevStreams };
            delete newStreams[user.uid];
            return newStreams;
        });
    };

    const toggleMic = async () => {
        if (mic) {
            if (localTrackRef.current) {
                await localTrackRef.current.setMuted(true);
                setMic(false);
            }
        } else {
            if (!localTrackRef.current) {
                await joinStream();
            } else {
                await localTrackRef.current.setMuted(false);
            }
            setMic(true);
        }
    };
    const handleLanguageChange = (event) => {
        const selectedLang = event.target.value;
        setLang(selectedLang);

        if (socketRef.current) {
            socketRef.current.emit('langChange', {
                roomId,
                lang: selectedLang
            });
        }
    };

    useEffect(() => {
        if (socketRef.current) {
            const handleLangChange = ({ lang }) => {
                setLang(lang);
            };

            socketRef.current.on('langChange', handleLangChange);

            return () => {
                socketRef.current.off('langChange', handleLangChange);
            };
        }
    }, [socketRef.current]);

    const copyRoomId = () => {
        navigator.clipboard.writeText(roomId);
    }

    const leaveRoom = () => {
        if (confirm("Are you sure you want to leave the room?")) {
            window.location.href = '/';
        }
    }

    return (
        <div className='w-[30%] md:w-[20%] bg-blue-800 h-[90vh] md:h-[85vh] flex flex-col items-center overflow-hidden border-r-2 border-white'>
            <div className='h-[60%] w-full bg-gray-700 p-2 flex flex-col gap-3'>
                <h1 className='text-white font-semibold md:text-2xl'>Choose a Language:</h1>
                <select className="font-bold md:text-2xl rounded-xl bg-black text-white px-2 py-1 hover:bg-[#242424]" name="programmingLanguages" id="programmingLanguages" onChange={handleLanguageChange} defaultValue="java" value={langu}>
                    <option value="java">Java</option>
                    <option value="cpp">Cpp</option>
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                </select>
            </div>
            <div className='h-[40%] w-full bg-gray-700 flex flex-col items-center justify-end'>
                <div className='w-[95%] h-[200px] md:h-[100px] gap-2 md:gap-0 mb-6 flex md:flex-row flex-col items-center justify-center'>
                    <div className='w-full md:w-[30%] md:h-[80%] flex justify-center items-center bg-black text-white font-bold tracking-wide text-3xl border border-white rounded-md md:rounded-none md:rounded-l-lg'>
                        Mic
                    </div>
                    <div className='w-full md:w-[75%] md:h-[80%] flex flex-col gap-1 md:gap-0 md:flex-row items-center'>
                        <div onClick={toggleMic} className={`w-full md:w-[50%] h-full flex items-center justify-center font-bold tracking-wide text-3xl ${mic ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'} bg-red-500 hover:bg-red-700 text-white border rounded-md md:rounded-none border-white`}>
                            Off
                        </div>
                        <div onClick={toggleMic} className={`w-full md:w-[50%] h-full flex items-center justify-center font-bold tracking-wide text-3xl ${!mic ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'} bg-green-500 hover:bg-green-700 text-white border border-white md:rounded-none rounded-md md:rounded-r-lg`}>
                            On
                        </div>
                    </div>
                </div>
                <div className='w-[90%] md:w-[75%] text-center rounded-lg md:rounded-3xl mb-3 md:px-10 md:py-2 bg-cyan-500 text-white font-bold tracking-wide md:text-2xl border-2 border-white hover:border-green-600 cursor-pointer' onClick={copyRoomId}>
                    Copy RoomId
                </div>
                <div className='w-[90%] md:w-[75%] text-center rounded-lg md:rounded-3xl mb-3 md:px-10 py-2 bg-red-500 text-white font-bold tracking-wide md:text-2xl border-2 border-white hover:border-green-600 cursor-pointer' onClick={leaveRoom}>
                    Leave
                </div>
            </div>
            <div className='w-full h-12 bg-red-500 hidden overflow-hidden'>
                {localStream && <ReactPlayer url={localStream} playing />}
                {Object.values(remoteStreams).map((stream, index) => (
                    <ReactPlayer key={index} url={stream} playing />
                ))}
            </div>
        </div>
    )
}

export default Sidebar