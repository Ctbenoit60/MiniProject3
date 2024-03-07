import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap"; // Importing bootstrap for popover
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap CSS
import "../index.css"; // Importing custom CSS
import { Grid, Link } from "@mui/material";
import Box from "@mui/system/Box";
import BackgroundModal from "../components/BackgroundModal";
// import EventComponent from "../components/EventModal";
import { useEffect, useRef, useState } from "react";
import CalModal2 from "../components/CalModal2";

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/events`)
      .then((response) => response.json())
      .then((result) => {
        const formattedEvents = result.data.map((event) => ({
          id: event._id,
          title: event.title,
          // description: event.description,
          start: event.start,
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  console.log("set events:", events);

  const handleEventClick = (clickInfo) => {
    // Set the selected event and open the modal
    setSelectedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      end: clickInfo.event.end,
      allDay: clickInfo.event.allDay,
    });
    setModalOpen(true);
  };

  const handleDateClick = (selectedInfo) => {
    // Creating a new event object and opening the modal
    const newEvent = {
      start: selectedInfo.startStr,
      end: selectedInfo.endStr,
      allDay: selectedInfo.allDay,
    };
    setSelectedEvent(newEvent);
    setModalOpen(true);
  };

  const handleEventDrop = async (eventDropInfo) => {
    const { event } = eventDropInfo;
    const updatedEvent = {
      id: event.id,
      title: event.title,
      start: event.start ? event.start.toISOString() : undefined, // Check if start exists before calling toISOString
      end: event.end ? event.end.toISOString() : undefined, // Check if end exists before calling toISOString
      allDay: event.allDay,
    };
    if (updatedEvent.start) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/events/${updatedEvent.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedEvent),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update event");
        }
      } catch (error) {
        console.error("Error updating event:", error);
        // Handle error (e.g., show a notification to the user)
      }
    }
  };

  const handleEventUpdate = async (event) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/events/${event.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...event,
          }),
        }
      );
      console.log(response);
      if (response.ok) {
        const calendarApi = calendarRef.current.getApi();
        let eventToUpdate = calendarApi.getEventById(event.id);
        if (eventToUpdate) {
          eventToUpdate.setProp("title", event.title);
          eventToUpdate.setDates(event.start, event.end);
        }
        setEvents(calendarApi.getEvents());
       
      } else {
        const data = await response.json();
        console.error("Failed to update event:", data.message);
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  // Function to handle deleting an event
  const handleEventDelete = async (event) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/events/${event.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // Remove the event from the calendar
        const calendarApi = calendarRef.current.getApi();
        let eventToDelete = calendarApi.getEventById(event.id);
        if (eventToDelete) {
          eventToDelete.remove();
        }
        setEvents(calendarApi.getEvents());
        setModalOpen(false);
      } else {
        const data = await response.json();
        console.error("Failed to delete event:", data.message);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // SUDO: https://www.npmjs.com/package/moment
  // SUDO: How can I use a useEffect to do the commented out code
  return (
    <div>
      <Box m="20px">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Grid item>
              <Link href="/events" variant="body2">
                {"Add Event"}
              </Link>
            </Grid>
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
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDateClick}
              eventClick={handleEventClick}
              eventDrop={handleEventDrop}
              eventSet={(event) => setEvents(event)}
              eventDidMount={(info) => {
                return new bootstrap.Popover(info.el, {
                  title: info.event.title,
                  placement: "auto",
                  trigger: "hover",
                  customClass: "popoverStyle",
                  // content: info.event.description,
                  html: true,
                });
              }}
            />
          </Grid>
          {/* Modal for adding, updating, and deleting events */}
          <CalModal2
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            selectedEvent={selectedEvent}
            onUpdateEvent={handleEventUpdate}
            onDeleteEvent={handleEventDelete}
          />
        </Grid>
      </Box>
    </div>
  );
}
