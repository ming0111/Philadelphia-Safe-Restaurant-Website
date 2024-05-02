import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Container, Link } from '@mui/material';
import backgroundImage from './steak.jpg';
import { DataGrid } from '@mui/x-data-grid';
import RestaurantCard from '../components/RestaurantCard'; // Ensure path is correct

const config = {
  server_host: "localhost",
  server_port: "8080"
};

function HomePage() {
  const [businesses, setBusinesses] = useState([]);
  const [improvementBusinesses, setImprovementBusinesses] = useState([]);
  const [randomBusiness, setRandomBusiness] = useState({}); 
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);

  // Fetch businesses data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://blooming-spire-72569-216cae1093c2.herokuapp.com/search/above_avg`);
        const data = await response.json();
        setBusinesses(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData3 = async () => {
      try {
        const response3 = await fetch(`https://blooming-spire-72569-216cae1093c2.herokuapp.com/random`);
        const data3 = await response3.json();
        setRandomBusiness(data3);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData3();
  }, []);
  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const response2 = await fetch(`https://blooming-spire-72569-216cae1093c2.herokuapp.com/improvement`);
        const data2 = await response2.json();
        setImprovementBusinesses(data2);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData2();
  }, []);



  const columns = [
    { 
      field: 'name', 
      headerName: 'Business Name', 
      width: 300, 
      headerAlign: 'center', 
      align: 'center',
      renderCell: (params) => (
        <Link
          component="button"
          variant="body2"
          onClick={() => setSelectedBusinessId(params.row.business_id)}
          style={{ textAlign: 'center', width: '100%' }}
        >
          {params.value}
        </Link>
      )
    },
    { field: 'address', headerName: 'Address', width: 300, headerAlign: 'center', align: 'center' },
    { field: 'stars', headerName: 'Star Rating', width: 300, headerAlign: 'center', align: 'center' },
    { field: 'review_count', headerName: 'Review Count', width: 300, headerAlign: 'center', align: 'center' },
    
  ];

  const columns2 = [
    { 
      field: 'name', 
      headerName: 'Business Name', 
      width: 300, 
      headerAlign: 'center', 
      align: 'center',
      renderCell: (params) => (
        <Link
          component="button"
          variant="body2"
          onClick={() => setSelectedBusinessId(params.row.business_id)}
          style={{ textAlign: 'center', width: '100%' }}
        >
          {params.value}
        </Link>
      )
    },
    { field: 'address', headerName: 'Address', width: 300, headerAlign: 'center', align: 'center' },
    { field: 'stars', headerName: 'Star Rating', width: 300, headerAlign: 'center', align: 'center' },
    { field: 'years_with_improvement', headerName: 'Years with Improvement', width: 300, headerAlign: 'center', align: 'center' },
    
  ];

  const columns3 = [
    { 
      field: 'name', 
      headerName: 'Business Name', 
      width: 300, 
      headerAlign: 'center', 
      align: 'center',
      renderCell: (params) => (
        <Link
          component="button"
          variant="body2"
          onClick={() => setSelectedBusinessId(params.row.business_id)}
          style={{ textAlign: 'center', width: '100%' }}
        >
          {params.value}
        </Link>
      )
    },
    { field: 'address', headerName: 'Address', width: 300, headerAlign: 'center', align: 'center' },
    { field: 'stars', headerName: 'Star Rating', width: 300, headerAlign: 'center', align: 'center' },
    
  ];
  
  

  const handleClose = () => {
    setSelectedBusinessId(null);
  };

  return (
    <Container maxWidth="false" disableGutters>
      {/* Background Image Box */}
      <Box
        sx={{
          position: 'relative',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '75vh',
          width: '100vw', // Ensure the background image covers the entire viewport width
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Overlay Text Box */}
        <Paper
          sx={{
            padding: 4,
            width: { xs: '70%', sm: '60%', md: '50%', lg: '40%' },
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
          elevation={3}
        >
          <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
            Introduction
          </Typography>
          <Typography>
            This is where we can introduce your website.
          </Typography>
        </Paper>
      </Box>

      {/* DataGrid Table Box */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Box sx={{ width: '100%', maxWidth: '1200px' }}> {/* Set a maxWidth that you prefer */}
          <Typography variant="h5" component="h2" sx={{ textAlign: 'center', marginBottom: '16px' }}>
            Top 5 Businesses in Philadelphia
          </Typography>
          <DataGrid
            rows={businesses}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
            getRowId={(row) => row.business_id}
            sx={{ height: 'auto', '& .MuiDataGrid-root': { border: 'none' } }} // Removes the border to match your screenshot
          />
          {selectedBusinessId && <RestaurantCard businessId={selectedBusinessId} handleClose={handleClose} />}
        </Box>
      </Box>

    {/* DataGrid for Improvement Businesses */}
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Box sx={{ width: '100%', maxWidth: '1200px' }}>
        <Typography variant="h5" component="h2" sx={{ textAlign: 'center', mb: 2 }}>
          Top businesses that have shown consistent year-over-year improvement in customer ratings.
        </Typography>
        <DataGrid
          rows={improvementBusinesses}
          columns={columns2}
          pageSize={10}
          rowsPerPageOptions={[10]}
          autoHeight
          getRowId={(row) => row.business_id}
        />
      </Box>
    </Box>

    {/* DataGrid for Random */}
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Box sx={{ width: '100%', maxWidth: '1200px' }}>
        <Typography variant="h5" component="h2" sx={{ textAlign: 'center', mb: 2 }}>
        Random Highly Rated and Safe Restaurant
        </Typography>
        <DataGrid
          rows={randomBusiness}
          columns={columns3}
          pageSize={10}
          rowsPerPageOptions={[10]}
          autoHeight
          getRowId={(row) => row.business_id}
        />
      </Box>
    </Box>

      
      {/* Interactive Map Section */}
      <Box sx={{ width: '100vw', overflow: 'hidden', paddingBottom: '80%', position: 'relative', height: 0, maxWidth: '100%' }}>
        <iframe
          title="Interactive Map"
          src="//howu19b23550fded.maps.arcgis.com/apps/Embed/index.html?webmap=aa47a47a7d6e465cb919e79a200a7105&extent=-75.2681,39.8939,-75.069,39.9923&zoom=true&previewImage=false&scale=true&disable_scroll=true&theme=light"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
        />
      </Box>
    </Container>
  );
}

export default HomePage;
