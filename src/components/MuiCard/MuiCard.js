import { IconButton, Card, CardContent, CardMedia, Typography, Button, CardActionArea, CardActions } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import image1 from "../../assets/iphone-14-thumbnail.png";
import { Link } from 'react-router-dom';
const MuiCard = ({name, image, price, description}) => {
  
  let isUserAdmin = true;
  

  return (<>

    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" aligm="left" component="span" inline >
            {name}
          </Typography>
          <Typography gutterBottom variant="h5" component="span" align="right" inline>
            {price}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description} 
          </Typography>

        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" variant="contained" color="primary">
          Share
        </Button>

{ isUserAdmin && <>        <IconButton aria-label="Example"  component={Link} to="/editProduct">
          <FontAwesomeIcon icon={faEdit} />
        </IconButton>
        <IconButton aria-label="Example"  component={Link} to="/deleteProduct">
          <FontAwesomeIcon icon={faTrash} />
        </IconButton>
        </>
}       

      </CardActions>
    </Card>
  </>);
}

export default MuiCard;