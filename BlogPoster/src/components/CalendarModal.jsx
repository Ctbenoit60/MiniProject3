import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap"; // Importing bootstrap for popover
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap CSS
import "../index.css"; // Importing custom CSS
import { Grid } from "@mui/material";
import Box from "@mui/system/Box";
import BackgroundModal from "../components/BackgroundModal";
import EventComponent from "../components/EventModal";
import { useEffect, useRef, useState } from "react";



export default function Calendar() {
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/events`)
    .then(response => response.json())
    .then(json => setEvents(json))
  }, [events])

 

  // SUDO: https://www.npmjs.com/package/moment
  // SUDO: How can I use a useEffect to do the commented out code
  return (
    <div>
      <Box m="20px">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <EventComponent />
            <br />
            <BackgroundModal />
          </Grid>
          <Grid
            item
            xs={8}
            sx={{ bgcolor: "text.secondary", color: "background.paper" }}
          >
            <FullCalendar
              ref={calendarRef}
              events={events}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              defaultView="dayGridMonth"
              headerToolbar={{
                start: "today prev,next",
                center: "title",
                end: "dayGridMonth, timeGridWeek, timeGridDay",
              }}
              // eventSet={(events) => setEvents(events)}
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
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}