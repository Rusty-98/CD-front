import { useEffect, useMemo, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import EditorArea from './EditorArea';
import { io } from 'socket.io-client';

const Room = () => {
  const [lang, setLang] = useState("java");
  const [users, setUsers] = useState([]);
  const socket = useMemo(() => io("http://localhost:3000"), []);

  useEffect(() => {
    socket.on('other', ({ name, room }) => {
      setUsers((prevUsers) => [...prevUsers, name]);
      console.log(`${name} joined the room ${room}`);
    });

    socket.on('message', ({ message }) => {
      console.log(message);
    });

    return () => {
      socket.off('other');
      socket.off('userList');
      socket.off('message');
    };
  }, [socket]);

  return (
    <>
      <Navbar user={users} />
      <div className='w-full bg-gray-900 text-green-500 pt-1 rounded-t-xl overflow-hidden'>
        <div className='bg-yellow-600 w-full rounded-t-xl mt-1 flex justify-between'>
          <Sidebar setLang={setLang} />
          <div className='w-[80%] bg-purple-800 h-[85vh] text-xl'>
            <EditorArea lang={lang} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Room;
