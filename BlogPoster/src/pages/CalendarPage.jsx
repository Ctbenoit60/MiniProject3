
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap"; // Importing bootstrap for popover
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap CSS
import "../index.css"; // Importing custom CSS
import { TextField, Button } from '@mui/material';
import { useEffect } from 'react';



export default function CalendarPage() {

  const events = [
    {
      title: "Doctors Apt",
      start: "2024-02-05T08:00:00",
      end: "2024-02-05T09:00:00",
    },
  ];

  const defaultImageUrl = 'https://w.wallhaven.cc/full/zy/wallhaven-zyo11j.jpg';

  useEffect(() => {
    document.body.style.backgroundImage = `url(${defaultImageUrl})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can send the imageUrl to your API or perform any other actions
  };

  return (
    <div className="container mt-4">
      <div className="flex-row mt-4">
        <div className="flex flex-col h-full bg-grey-500 gap-5">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <TextField
                id="imageUrl"
                label="Background Image URL"
                variant="outlined"
                fullWidth
                defaultValue={defaultImageUrl}
              />
            </div>
            <Button type="submit" variant="contained" color="primary">
              Set Background Image
            </Button>
          </form>
        </div>
        </div>
        <div className="background-color: #ffffff; border: 1px solid black; opacity: 0.6;">
          <div className="col-md-12">
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
