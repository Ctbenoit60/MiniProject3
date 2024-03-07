import { TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';


export default function Background(
  {userId}
) {

    const defaultImageUrl = 'https://w.wallhaven.cc/full/zy/wallhaven-zyo11j.jpg';

   const [imageURL, setImageURL] = useState(defaultImageUrl);

    useEffect(() => {
      // fetch(`http://localhost:4000/api/events/${updatedEvent.id}`)
      
      console.log("background modal", userId)
      document.body.style.backgroundImage = `url(${imageURL})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundRepeat = 'no-repeat';
    }, [imageURL, userId]);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setImageURL(event.target[0].value)
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