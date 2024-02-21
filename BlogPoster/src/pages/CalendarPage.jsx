
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap"; // Importing bootstrap for popover
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap CSS
import "../index.css"; // Importing custom CSS


export default function CalendarPage() {

  const events = [
    {
      title: "Doctors Apt",
      start: "2024-02-05T08:00:00",
      end: "2024-02-05T09:00:00",
    },
  ];

  return (
    <div className="container mt-4">
      <div className="row mt-4">
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
