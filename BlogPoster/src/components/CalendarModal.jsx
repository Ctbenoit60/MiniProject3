import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap"; // Importing bootstrap for popover
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap CSS
import "../index.css"; // Importing custom CSS
// import { styled } from "@mui/system";
import BackgroundModal from "../components/BackgroundModal";
import EventComponent from "../components/EventModal";

export default function Calendar() {
  return (
    <div className="container mt-4">
      <div className="background-color: #ffffff; border: 1px solid black; opacity: 0.6;">
        <div className="flex flex-row">
          <EventComponent />
          <BackgroundModal />
        </div>
      </div>
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          defaultView="dayGridMonth"
          headerToolbar={{
            start: "today prev,next",
            center: "title",
            end: "dayGridMonth, timeGridWeek, timeGridDay",
          }}
          // events={events}
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
  );
}
