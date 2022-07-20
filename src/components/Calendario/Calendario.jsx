import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

function Calendario() {
    const [title, settitle] = useState("");
    const [start, setstart] = useState("");
    const [end, setend] = useState("");
    // const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [Vacaciones, setVacaciones] = useState([]);
    // const VacacionesCollection = collection(db, "Vacaciones");

    function handleAddEvent() {
        setVacaciones([...Vacaciones, 
            {title, start, end
        }]);
        console.log(Vacaciones);
        
    }

    return (
        <div className="App">
          
            <div>
                
                <input type="text" placeholder="Add Title" 
                style={{ width: "10%", marginRight: "10px" }} 
                value={title}         
                onChange={(e) => settitle(e.target.value)} />
                
                <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} 
                selected={start} onChange={(start) => setstart( start )} />
                 {/* <input  
                          value={start}  
                        selected = {start}  
                        onChange ={(e)=> setstart(e.target.value)}                        
                        className='form-control '
                        type="date"
                        required                  
                        />		 */}

                <DatePicker input placeholderText="End Date" selected={end} 
                onChange={(end) => setend( end )} />
                        {/* <input  
                          value={end}  
                        selected = {end}  
                        onChange ={(e)=> setend(e.target.value)}                        
                        className='form-control '
                        type="date"
                        required                  
                        />	 */}
                
                <button stlye={{ marginTop: "50px" }} onClick={handleAddEvent}>
                    Add Event
                </button>
            </div>
            <Calendar localizer={localizer} events={Vacaciones}  style={{ height: 700, margin: "50px"}} />
        </div>
    );
}

export default Calendario;