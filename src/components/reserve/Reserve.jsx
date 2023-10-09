import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { set } from "date-fns";
import { SearchContext } from "../../context/SearchContext";
import './reserve.css';
import { ca } from "date-fns/locale";
import axios from "axios";

const Reserve = ({setOpen, hotelId}) => {
    const [selectedRooms, setSelectedRooms] = useState([]);
    const {data, loading, error} = useFetch(`/hotels/rooms/${hotelId}`);

    const {dates} = useContext(SearchContext);

    const getDates = (startDate, endDate) => {
        const date = new Date(startDate.getTime());

        let list = [];

        while (date <= endDate) {
            list.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }

        return list;
    }

    const allDates = getDates(dates[0].startDate, dates[0].endDate);

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) => allDates.includes(new Date(date).getTime()));
        return !isFound;
    }

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(
            checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value)
        )

    };

    const handleClick = async () => {
        try {
            await Promise.all(selectedRooms.map(async (roomId) => {
                const response = await axios.put(`/rooms/availability/${roomId}`, { dates: allDates });
                return response.data;
            }));
        } catch (err) {
            console.error(err);
        }
    };
    

    return (
        <div className="reserve">
            <div className="rcontainer">
                <FontAwesomeIcon icon={faCircleXmark} className="rclose" onClick={() => setOpen(false)} />
                <span>Select Your Rooms :</span>
                {data.map((item) => (
                    <div className="rItem">
                        <div className="rItemInfo">
                            <div className="rItemTitle">{item.title}</div>
                                <div className="rItemDesc">{item.desc}</div>
                                    <div className="rItemMax">
                                        Max. People : <b>{item.maxPeople}</b>
                                    </div>
                                    <div className="rPrice">{item.price}</div>
                                </div>
                                <div className="rSelectRooms">
                                {item.roomNumbers.map((roomNumber) => (
                                    <div className="room">
                                        <label>{roomNumber.number}</label>
                                        <input type="checkbox" 
                                        value={roomNumber._id} 
                                        onChange={handleSelect} 
                                        disabled={!isAvailable(roomNumber)}/>
                                    </div>    
                                ))}
                                </div>
                            </div>
                        
                    
                ))}
                <button onClick={handleClick} className="rButton">Reserve Now!</button>
            </div>
        </div>
    );
};

export default Reserve;