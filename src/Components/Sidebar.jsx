import AgoraRTC from 'agora-rtc-sdk-ng';
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';


const Sidebar = ({ setLang, socketRef, roomId, langu }) => {

    const [mic, setMic] = useState(true);
    const [rtc, setRtc] = useState({
        localAudioTrack: null,
        client: null,
    });

    const options = {
        appId: "264ceaa96b9d4a298a312cdac0952fe1",
        channel: roomId,
        token: null,
        uid: Math.floor(Math.random() * 10000),
    };

    useEffect(() => {
        const initClient = async () => {
            const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
            setRtc((prevRtc) => ({ ...prevRtc, client }));

            client.on("user-published", async (user, mediaType) => {
                await client.subscribe(user, mediaType);
                if (mediaType === "audio") {
                    user.audioTrack.play();
                }
            });

            client.on("user-unpublished", async (user) => {
                await client.unsubscribe(user);
            });

            await client.join(options.appId, options.channel, options.token, options.uid);
            const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
            await client.publish([localAudioTrack]);
            // localAudioTrack.play();
            setRtc((prevRtc) => ({ ...prevRtc, localAudioTrack }));

            console.log("publish success!");
        };

        initClient();

        return () => {
            const leave = async () => {
                if (rtc.client) {
                    await rtc.client.leave();
                    rtc.localAudioTrack.close();
                }
            };
            leave();
        };
    }, []);

    const toggleMic = async () => {
        if (rtc.localAudioTrack) {
            if (mic) {
                await rtc.localAudioTrack.setEnabled(false);
            } else {
                await rtc.localAudioTrack.setEnabled(true);
            }
            setMic(!mic);
        }
    };

    // ye to jo sidebar me language selection hai wo ho gaya mean ye to emit ker raha

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
     

    // ye receive karega for changement of language selection
    
    useEffect(() => {
        if (socketRef.current) {
            const handleLangChange = (data) => {
                setLang(data);
            };
            socketRef.current.on('langChange', handleLangChange);
            return () => {
                socketRef.current.off('langChange', handleLangChange);
            };
        }
    }, [socketRef.current]);


    // ye room id copy kerne ke liye ho gaya

    const copyRoomId = () => {
        navigator.clipboard.writeText(roomId);
        toast.success(`RoomId Copied`, {
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        })
    };

    //ye room ko leave kerne ke liye ho gaya

    const leaveRoom = () => {
        if (confirm("Are you sure you want to leave the room?")) {
            window.location.href = '/';
        }
    };

    return (
        <div className='w-[30%] md:w-[20%] bg-gray-700 h-full flex flex-col items-center overflow-hidden border-r-2 border-white rounded-tl-xl select-none'>
            <div className='h-[60%] w-full bg-gray-700 p-2 flex flex-col gap-3'>
                <h1 className='text-white font-semibold md:text-2xl'>Language:</h1>
                <select className="font-bold md:text-2xl rounded-xl bg-black text-white px-2 py-1 hover:bg-[#242424]" name="programmingLanguages" id="programmingLanguages" onChange={handleLanguageChange} defaultValue="java" value={langu}>
                    <option value="java">Java</option>
                    <option value="cpp">Cpp</option>
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                </select>
            </div>
            <div className='h-[40%] w-full bg-gray-700 flex flex-col items-center justify-end'>
                <div className='w-[95%] h-[200px] md:h-[100px] gap-2 md:gap-0 mb-6 flex md:flex-row flex-col items-center justify-center'>
                    <div className='w-full md:w-[30%] md:h-[80%] flex justify-center items-center bg-black text-white font-bold tracking-wide text-3xl border border-white rounded-md md:rounded-none md:rounded-l-lg select-none'>
                        Mic
                    </div>
                    <div className='w-full md:w-[75%] md:h-[80%] flex flex-col gap-1 md:gap-0 md:flex-row items-center'>
                        <div onClick={toggleMic} className={`w-full md:w-[50%] h-full flex items-center justify-center font-bold tracking-wide select-none text-3xl ${mic ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'} bg-red-500 hover:bg-red-700 text-white border rounded-md md:rounded-none border-white`}>
                            Off
                        </div>
                        <div onClick={toggleMic} className={`w-full md:w-[50%] h-full flex items-center justify-center font-bold tracking-wide select-none text-3xl ${!mic ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'} bg-green-500 hover:bg-green-700 text-white border border-white md:rounded-none rounded-md md:rounded-r-lg`}>
                            On
                        </div>
                    </div>
                </div>
                <div className='w-[95%] md:w-[80%] text-center rounded-lg md:rounded-3xl mb-3 md:px-10 py-2 bg-cyan-500 text-white font-bold tracking-wide text-sm md:text-2xl border-2 border-white hover:border-green-600 cursor-pointer select-none' onClick={copyRoomId}>
                    Copy RoomId
                </div>
                <div className='w-[95%] md:w-[80%] text-center rounded-lg md:rounded-3xl mb-5 md:px-10 py-2 bg-red-500 text-white font-bold tracking-wide md:text-2xl border-2 border-white hover:border-green-600 cursor-pointer select-none' onClick={leaveRoom}>
                    Leave
                </div>
            </div>
            <div id="members" className='w-full h-12 bg-red-500 hidden overflow-hidden'>
                {/* <ReactPlayer url={rtc.localAudioTrack && rtc.localAudioTrack.play()} playing={mic} hidden /> */}
            </div>
        </div>
    )
}

export default Sidebar