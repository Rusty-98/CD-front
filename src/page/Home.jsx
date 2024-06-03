import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Components/Styles/Home.css';
import Marquee from "react-fast-marquee";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {

    const [name, setName] = useState('');
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();
    const marquees = [
        { key: 1, direction: 'left', rotation: '-rotate-3' },
        { key: 2, direction: 'right', rotation: '-rotate-3' },
        { key: 3, direction: 'left', rotation: '-rotate-3' },
        { key: 4, direction: 'right', rotation: '-rotate-3' },
        { key: 5, direction: 'left', rotation: '-rotate-3' },
        { key: 6, direction: 'right', rotation: '-rotate-3' },
        { key: 7, direction: 'left', rotation: '-rotate-3' },
        { key: 8, direction: 'right', rotation: '-rotate-3' },
        { key: 9, direction: 'left', rotation: '-rotate-3' },
        { key: 10, direction: 'right', rotation: '-rotate-3' },
        { key: 11, direction: 'left', rotation: '-rotate-3' },
        { key: 12, direction: 'right', rotation: '-rotate-3' }
    ];

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

        if (roomId === "" || name === "") {
            // alert("Please enter name and room Id first");
            toast.error("Please enter name and room Id first", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })
            return;
        }

        if (!(/^\d{6}$/.test(roomId))) {
            // alert("Please enter valid room Id");
            toast.error("Please enter valid room Id", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })
            return;
        }


        navigate(`/editor/${roomId}`, {
            state: { name }
        });
    };

    return (
        <>
            <div className="w-full h-screen overflow-hidden">
                <div className='w-full h-screen bg-transparent select-none flex items-center justify-center'>
                    <div className='w-[95%] md:w-[50vw] h-[40vh] md:h-[50vh] bg-black border-2 border-white rounded-2xl shadow-black shadow-md flex flex-col items-center justify-center'>
                        <div className='w-full h-full border-2 border-[#135f53] rounded-2xl flex flex-col gap-6 items-center pt-5 overflow-hidden'>
                            <input
                                type="text"
                                className='w-full h-16 md:h-24 bg-transparent text-white font-bold text-4xl tracking-wide px-5 focus:outline-0 font-lemon'
                                placeholder='Your Name'
                                onChange={handlename}
                            />
                            <input
                                type="text"
                                className='w-full h-16 md:h-24 bg-transparent text-white font-bold text-4xl tracking-wide px-5 focus:outline-0 font-lemon'
                                placeholder='Room Id'
                                onChange={handleroom}
                                value={roomId}
                            />
                            <button
                                className='w-[95%] h-16 md:h-20 bg-emerald-500 text-white font-bold text-4xl tracking-wide rounded-md font-lemon'
                                onClick={handleJoin}
                            >
                                Join
                            </button>
                            <div className="flex items-center mt-1 md:mb-1">
                                <h1 className="md:text-2xl text-lg text-white text-left">If not have Room Id Generate here: </h1>
                                <h1 className="md:text-3xl text-xl text-green-400 ml-2 font-bold cursor-pointer" onClick={handleGenerate}> Room Id</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full bg-black absolute -z-10 left-0 top-0 overflow-hidden">
                    {marquees.map(marquee => (
                        <div key={marquee.key} className={marquee.rotation}>
                            <Marquee autoFill={true} pauseOnHover={marquee.direction === 'left'} speed={80} direction={marquee.direction}>
                                <div className="name text-black mr-4 p-2 font-bold tracking-widest text-6xl md:text-8xl opacity-[0.7]">
                                    Code Discuss
                                </div>
                            </Marquee>
                        </div>
                    ))}
                </div>
                <Toaster />
            </div>
        </>
    );
};

export default Home