import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./MainInvestingPage.css"
import {Link} from 'react-router-dom'
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
  </Box>
);

export default function MainInvestingPage() {
  return (
    <div>
    <Card className='Card' sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
        HOW MODERNLOTERY WORKS?
        </Typography>
       
        <Typography variant="body2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt inventore corporis at, eligendi earum recusandae consectetur provident voluptatem vero, dolores veritatis ex doloribus soluta quasi sed cupiditate repellat labore. Expedita!
        </Typography>
      </CardContent>
      <CardActions>
        <Link to='/formCoin'>
        <Button to="/form" size="small">let start</Button>
        </Link>
      </CardActions>
    </Card>
    
    <Card className='Card2' sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
        OTHER WAYS TO WIN WITH MODERN LOTERY
        </Typography>
       
        <Typography variant="body2">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum, modi. Eveniet dicta voluptatibus eligendi tenetur, vero eum dolores similique repudiandae recusandae, reprehenderit nisi cumque sequi ut consequatur itaque pariatur enim?
        A, sunt quas! Tenetur distinctio pariatur earum harum esse illo eius similique praesentium illum a exercitationem obcaecati, veniam inventore temporibus doloremque iusto! Dolore nulla ullam cum sed veniam animi a.
        Molestias exercitationem ipsam tempore et ipsa, veniam vel molestiae laborum commodi voluptatibus cum asperiores. Ducimus placeat, corrupti adipisci quibusdam earum provident blanditiis pariatur totam consequatur odit reprehenderit sit assumenda facere.
        Impedit, tempora commodi? Impedit sint eveniet nihil, numquam natus assumenda aspernatur? Asperiores accusamus illum temporibus. Totam tenetur eveniet amet! Sequi perferendis facere ut modi maiores ducimus suscipit recusandae possimus iste.
        Eaque, repellat animi, facilis maxime voluptatibus, dolore voluptas dolores expedita sunt architecto nemo magni recusandae! Voluptates animi cum numquam minima incidunt neque iste libero esse, cupiditate totam, commodi nisi aspernatur.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </div>

  );
}