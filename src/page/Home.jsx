import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const Home = () => {

    // const socket = useMemo(() => io("http://localhost:3000"), [])
    const [name, setName] = useState('');
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();

    const handlename = (e) => {
        setName(e.target.value);
    };

    const handleroom = (e) => {
        setRoomId(e.target.value);
    };
    const handleGenerate = () => {
        let randomNumber = Math.floor(Math.random() * 1000000);
        let randomCode = String(randomNumber).padStart(6, '0');
        setRoomId(randomCode);
    }
    const handleJoin = () => {
        
        if(roomId === "" || name === ""){
            alert("Please enter name and room Id first");
            return;
        }

        if(!(/^\d{6}$/.test(roomId))){
            alert("Please enter valid room Id");
            return;
        }


        navigate(`/editor/${roomId}`, {
            state: { name }
        });
    };

    return (
        <div className='w-full h-screen bg-[#135f53] flex items-center justify-center'>
            <div className='w-[90%] md:w-[40vw] h-[40vh] bg-black border-2 border-white rounded-2xl shadow-black shadow-md flex flex-col items-center justify-center'>
                <div className='w-full h-full border-2 border-[#135f53] rounded-2xl flex flex-col gap-6 items-center pt-5'>
                    <input
                        type="text"
                        className='w-full h-16 bg-transparent text-white font-bold text-3xl tracking-wide px-5 focus:outline-0 font-lemon'
                        placeholder='Your Name'
                        onChange={handlename}
                    />
                    <input
                        type="text"
                        className='w-full h-16 bg-transparent text-white font-bold text-3xl tracking-wide px-5 focus:outline-0 font-lemon'
                        placeholder='Room Id'
                        onChange={handleroom}
                        value={roomId}
                    />
                    <button
                        className='w-[95%] h-16 bg-emerald-500 text-white font-bold text-3xl tracking-wide rounded-md font-lemon'
                        onClick={handleJoin}
                    >
                        Join
                    </button>
                    <div className="flex items-center mt-1">
                        <h1 className="md:text-xl text-white text-left">If not have Room Id Generate here: </h1>
                        <h1 className="text-xl text-green-400 ml-2 font-bold cursor-pointer" onClick={handleGenerate}> Room Id</h1>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home