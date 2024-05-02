import { useEffect, useState } from 'react';
import { Box, Button, Modal } from '@mui/material';

const config = require('../config.json');

export default function RestaurantCard({ businessId, handleClose }) {
  const [restaurantData, setRestaurantData] = useState({});
  const formatDayHours = (hours) => hours ? hours : 'No Opening Infomation';

  useEffect(() => {
      if (businessId) {
        fetch(`https://blooming-spire-72569-216cae1093c2.herokuapp.com/${businessId}`)
          .then(res => res.json())
          .then(resJson => {
            // Assuming the response is an array and the restaurant data is the first object
            setRestaurantData(resJson[0] || {});
          })
          .catch(error => {
            console.error('Failed to fetch restaurant data:', error);
            setRestaurantData({});
          });
      }
    }, [businessId]);

  return (
    <Modal
      open={Boolean(businessId)}
      onClose={handleClose}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box
        p={3}
        style={{ background: 'white', borderRadius: '16px', border: '2px solid #000', width: 600 }}
      >
        <h1>{restaurantData.name}</h1>
        <p>Address: {restaurantData.Address || 'No Address'}</p>
        <p>Star: {restaurantData.Star}</p>
        <p>Review Count: {restaurantData.Review_Count}</p>
        <h2>Open Hour: </h2> 
        <p>Monday: {formatDayHours(restaurantData.Monday)}</p>
        <p>Tuesday: {formatDayHours(restaurantData.Tuesday)}</p>
        <p>Wednesday: {formatDayHours(restaurantData.Wednesday)}</p>
        <p>Thursday: {formatDayHours(restaurantData.Thursday)}</p>
        <p>Friday: {formatDayHours(restaurantData.Friday)}</p>
        <p>Saturday: {formatDayHours(restaurantData.Saturday)}</p>
        <p>Sunday: {formatDayHours(restaurantData.Sunday)}</p>
        
        <Button onClick={handleClose} style={{ left: '50%', transform: 'translateX(-50%)' }} >
          Close
        </Button>
      </Box>
    </Modal>
  );
}
