import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import EditorArea from '../Components/EditorArea'
import { useCallback, useEffect, useRef, useState } from 'react';
import { initSocket } from '../socket';
import { useLocation, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import '../Components/Styles/Editor.css'

const Editor = () => {
    const location = useLocation();
    const socketRef = useRef(null);
    const { roomId } = useParams();
    const [lang, setLang] = useState("java");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();
            socketRef.current.emit('join', {
                roomId,
                name: location.state?.name
            })

            socketRef.current.on('otherJoined', ({ name }) => {
                console.log(name + ' joined the room');
                toast.success(`${name} Joined the room`, {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                })
                socketRef.current.emit('giveUsers', { roomId });
            })

            socketRef.current.on('allUsersInRoom', (data) => {
                const userNames = data.map(user => user.name);
                console.log(userNames);
                setUsers(userNames);
            });

            socketRef.current.on('user-disconnected', ({ name }) => {
                console.log(name + ' left the room');
                toast(`${name} left the room`, {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                })
                setUsers(prevUsers => prevUsers.filter(user => user !== name));
            });
        };

        init();

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [location.state?.name, roomId]);

    return (
        <>
            <div className='w-full pt-[70px] md:pt-[90px] bg-black text-green-500 rounded-t-xl overflow-hidden editor'>
                <Navbar user={users} />
                <div className='h-full pb-[45px] md:pb-[55px] overflow-hidden bg-yellow-600 w-full rounded-t-xl mt-1 flex justify-between'>
                    <Sidebar setLang={setLang} socketRef={socketRef} roomId={roomId} langu={lang} />
                    <div className='w-[70%] md:w-[80%] bg-[#f18181] text-xl rounded-tr-xl overflow-hidden h-full'>
                        <EditorArea lang={lang} socketRef={socketRef} roomId={roomId} />
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    )
}

export default Editor