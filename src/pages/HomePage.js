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
    async function fetchAllData() {
      try {
        // Fetch top businesses
        const response = await fetch(`https://blooming-spire-72569-216cae1093c2.herokuapp.com/search/above_avg`);
        const businessData = await response.json();
        setBusinesses(businessData);

        // Fetch improvement businesses after top businesses have been fetched
        const response2 = await fetch(`https://blooming-spire-72569-216cae1093c2.herokuapp.com/improvement`);
        const improvementData = await response2.json();
        setImprovementBusinesses(improvementData);

        // Fetch random business after improvement businesses have been fetched
        const response3 = await fetch(`https://blooming-spire-72569-216cae1093c2.herokuapp.com/random`);
        const randomData = await response3.json();
        setRandomBusiness(randomData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }
    
    fetchAllData();
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
          Our goal is to provide a reliable tool that not only showcases highly rated restaurants but also integrates safety information to ensure a well-rounded dining experience.
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
        Rising Stars in Philadelphia
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
        Mystery Pick: Top Safety & Ratings
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
          src="//haho9ad6a53008f6.maps.arcgis.com/apps/Embed/index.html?webmap=2b007bba49cd4d148bf724c83263374e&extent=-75.2287,39.9268,-75.116,39.9744&zoom=true&previewImage=false&scale=true&disable_scroll=true&theme=light"
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
