import React from 'react';
import { Box, Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// Import your category images
import barsImage from './bar.png';
import coffeeTeaImage from './coffee.png';
import breakfastBrunchImage from './breakfast.png';
import italianImage from './italian.png';
import chineseImage from './chinese.png';
import seafoodImage from './seafood.png';
import mexicanImage from './mexican.png';
import japaneseImage from './japanese.png';

const categories = [
  { name: 'Bars', image: barsImage },
  { name: 'Coffee & Tea', image: coffeeTeaImage },
  { name: 'Breakfast & Brunch', image: breakfastBrunchImage },
  { name: 'Italian', image: italianImage },
  { name: 'Chinese', image: chineseImage },
  { name: 'Seafood', image: seafoodImage },
  { name: 'Mexican', image: mexicanImage },
  { name: 'Japanese', image: japaneseImage },
];

function CategoriesPage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" sx={{ my: 2, textAlign: 'center' }}>
        Top Rated Categories
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {categories.map((category, index) => (
          <Grid item key={category.name} xs={6} md={3}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea component={Link} to={`/category-info/${category.name}`} sx={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  image={category.image}
                  alt={category.name}
                  sx={{ maxHeight: 194, objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {category.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CategoriesPage;
