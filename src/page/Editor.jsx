import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import EditorArea from '../Components/EditorArea'
import { useCallback, useEffect, useRef, useState } from 'react';
import { initSocket } from '../socket';
import { useLocation, useParams } from 'react-router-dom';

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

            socketRef.current.on('otherJoinied', ({ name }) => {
                console.log(name + ' joined the room');
                socketRef.current.emit('giveUsers', { roomId });
            })

            socketRef.current.on('allusersInRoom', (data) => {
                const userNames = data.map(user => user.name);
                console.log(userNames);
                setUsers(userNames);
            })

            socketRef.current.on('user-disconnected', ({ name }) => {
                console.log(name + ' left the room');
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
            <Navbar user={users} />
            <div className='w-full bg-gray-900 text-green-500 pt-1 rounded-t-xl overflow-hidden'>
                <div className='bg-yellow-600 w-full rounded-t-xl mt-1 flex justify-between'>
                    <Sidebar setLang={setLang} socketRef={socketRef} roomId={roomId} langu={lang} />
                    <div className='w-[70%] md:w-[80%] bg-[#1E1E1E] h-[90vh] md:h-[85vh] text-xl'>
                        <EditorArea lang={lang} socketRef={socketRef} roomId={roomId} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Editor