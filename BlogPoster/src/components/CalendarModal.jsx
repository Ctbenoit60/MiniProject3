
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap"; // Importing bootstrap for popover
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap CSS
import "../index.css"; // Importing custom CSS
import { useState } from 'react';



export default function Calendar() {

//   const events = [
//     {
//       title: "Doctors Apt",
//       start: "2024-02-05T08:00:00",
//       end: "2024-02-05T09:00:00",
//     },
//   ];

const [events, setEvents] = useState([
    // Initial events
    { title: 'Doctors Apt', date: '2024-02-28' },
    { title: 'Event 2', start: '2024-03-05', end: '2024-03-07' }
  ]);
  
 // State variables for form input
 const [title, setTitle] = useState('');
 const [startDate, setStartDate] = useState('');
 const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && startDate) {
      const newEvent = {
        title: title,
        start: startDate,
        end: endDate || startDate // If endDate is not provided, use startDate
      };
      setEvents([...events, newEvent]);
      // Clear form fields after adding event
      setTitle('');
      setStartDate('');
      setEndDate('');
    } else {
      alert('Please fill out the title and start date.');
    }
  };

  return (
    <div className="container mt-4">
      <div className="flex-row mt-4">
        <div className="background-color: #ffffff; border: 1px solid black; opacity: 0.6;">
          <div className="col-md-12">
          <div>
        {/* Event Form */}
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <br />
          <label>Start Date:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
          <br />
          <label>End Date:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          <br />
          <button type="submit">Add Event</button>
        </form>
      </div>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              defaultView="dayGridMonth"
              headerToolbar={{
                start: "today prev,next",
                center: "title",
                end: "dayGridMonth, timeGridWeek, timeGridDay",
              }}
              events={events}
              eventDidMount={(info) => {
                return new bootstrap.Popover(info.el, {
                  title: info.event.title,
                  placement: "auto",
                  trigger: "hover",
                  customClass: "popoverStyle",
                  content: "<p>Find the Tardis</p>",
                  html: true,
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
