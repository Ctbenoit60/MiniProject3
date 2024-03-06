import { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";




function EventComponent() {

  const [events, setEvents] = useState([]);

  // State variables for form input
  // const classes = useStyles();
  const [title, setTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");

  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && eventDate) {
        const newEvent = {
            title: title,
            start: eventDate,
            time: eventTime,
        };

        axios.post('http://localhost:4000/api/events/create', newEvent)
            .then(function (response) {
                console.log(response);
                // Update local state with the new event
                setEvents([...events, newEvent]);

                // Clear form fields after adding event
                setTitle("");
                setEventDescription("");
                setEventDate("");
                setEventTime("");
                // Navigates to back to calendar on submit
                navigate("/calendar");
            })
            .catch(function (error) {
                console.log(error);
                // Handle error as needed
            });
    } else {
        alert("Please fill out the title and start date.");
    }
};
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Add New Event
      </Typography>
      <form onSubmit={handleSubmit}>
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
          <Grid item xs={12}>
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
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Add Event
        </Button>
      </form>
    </div>
  );
}

export default EventComponent;
