import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap"; // Importing bootstrap for popover
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap CSS
import "../index.css"; // Importing custom CSS
import { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import BackgroundModal from "../components/BackgroundModal";

const useStyles = styled((theme) => ({
  form: {
    width: "50%",
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Calendar() {
  const [events, setEvents] = useState([]);

  // State variables for form input
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && eventDate) {
      const newEvent = {
        title: title,
        start: eventDate,
        time: eventTime,
      };
      setEvents([...events, newEvent]);
      // Clear form fields after adding event
      setTitle("");
      setEventDescription("");
      setEventDate("");
      setEventTime("");
    } else {
      alert("Please fill out the title and start date.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="background-color: #ffffff; border: 1px solid black; opacity: 0.6;">
        <div className="flex flex-row">
          <div className="eventContainer p-4 flex">
            <Typography variant="h4" gutterBottom>
              Add New Event
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="title"
                    label="Event Name"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="eventDescription"
                    label="Event Description"
                    name="eventDescription"
                    multiline
                    rows={4}
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="eventDate"
                    label="Date"
                    name="eventDate"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="eventTime"
                    label="Time"
                    name="eventTime"
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Add Event
              </Button>
            </form>
          </div>
          <div>
            <BackgroundModal/>
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
