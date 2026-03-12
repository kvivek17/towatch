"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { React, useState, useEffect } from 'react'

const Allrooms = () => {

    const [Rooms, setRooms] = useState([])
    const router = useRouter()

    useEffect(() => {


        getrooms()



    }, [])

    const getrooms = async () => {
        const result = await axios.get('/api/room?roomid=all')
        setRooms(result.data)
        console.log("here is rooms", result.data);



    }

    const enter = (room) => {
        router.push('/watch/' + room.roomid)
    }

    const deleteroom = async (roomid) => {
        try {
            await axios.delete(`/api/room?roomid=${roomid}`);
            setRooms((prev) => prev.filter((room) => room.roomid !== roomid));
        } catch (error) {
            console.error("Error deleting room:", error);
        }
    };



    return (
        <div>
            {Rooms.length == 0 ? <h2>No Rooms Here</h2> :

                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Name</th>

                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>

                        </tr>
                    </thead>

                    {Rooms.map((room, idx) => {
                        return <tr key={idx}>
                            <td className="px-6 py-4 whitespace-nowrap">{room?.roomname}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Active
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button onClick={() => enter(room)} className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 transition duration-150 ease-in-out">Enter</button>
                                <button
                                    onClick={() => deleteroom(room.roomid)}
                                    className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 transition duration-150 ease-in-out"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>

                    })}


                </table>


            }
        </div>
    )
}

export default Allrooms