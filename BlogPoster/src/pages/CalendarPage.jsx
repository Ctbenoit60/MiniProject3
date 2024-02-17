import { useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap"; // Importing bootstrap for popover
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap CSS
import "../index.css"; // Importing custom CSS

const defaultImageUrl = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwallhaven.cc%2Fw%2Fzyo11j&psig=AOvVaw1K1Sp12wosqpADCUsMFpjC&ust=1708137738207000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCLDt14rrroQDFQAAAAAdAAAAABAE';

export default function CalendarPage() {
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

  const events = [
    {
      title: "Doctors Apt",
      start: "2024-02-05T08:00:00",
      end: "2024-02-05T09:00:00",
    },
  ];

  return (
    <div className="container mt-4">
      <div className="row">
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
      <div className="row mt-4">
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
  );
}
