import { TextField, Button } from '@mui/material';
import { useEffect } from 'react';


export default function Background() {

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

    return(
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
    );
}