import { TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';


export default function Background(
  {userId}
) {

    const defaultImageUrl = 'https://w.wallhaven.cc/full/zy/wallhaven-zyo11j.jpg';

   const [imageURL, setImageURL] = useState(defaultImageUrl);

   useEffect(() => {
    fetch(`http://localhost:4000/api/users/${userId}`)
      .then((response) => response.json())
      .then((result) => {
        console.log("Get userId", result.data.backgroundURL)
        setImageURL(result.data.backgroundURL)
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
   }, [userId]);
   
   useEffect(() => {
      console.log("background modal", userId)
      document.body.style.backgroundImage = `url(${imageURL})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundRepeat = 'no-repeat';
    }, [imageURL, userId]);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // extract the URL from the event.target
      const newBgURL = event.target[0].value;
      //Here we updating the user by Id
      fetch(`http://localhost:4000/api/users/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // look at the const newBgURl at a few lines above
          backgroundURL: newBgURL,
        }),
      })
      .then((response) => response.json())
      .then((result) => {
        console.log("HandleSubmit bgImage", result)
        setImageURL(newBgURL)
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
    };

    return(
        <div className="flex flex-col h-full bg-grey-500 gap-5">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <TextField
                id="imageUrl"
                name='imageUrl'
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
    );
}