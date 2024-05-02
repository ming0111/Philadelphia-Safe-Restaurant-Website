import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, CircularProgress, Box, Link, FormControlLabel, Switch } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import RestaurantCard from '../components/RestaurantCard'; // Ensure path is correct

const config = {
  server_host: "localhost",
  server_port: "8080",
  num: "10"
};

function CategoryInfoPage() {
  const { categoryName } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [useTrendData, setUseTrendData] = useState(false);
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);

  useEffect(() => {
    const fetchData = async (route) => {
      setIsLoading(true); // Start loading
      try {
        const response = await fetch(route);
        const data = await response.json();
        if (useTrendData) {
          setTrendData(data);
        } else {
          setCategoryData(data);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    const routePrefix = useTrendData ? 'trend' : 'cat';
    const serverUrl = `https://blooming-spire-72569-216cae1093c2.herokuapp.com/${routePrefix}/${encodeURIComponent(categoryName)}/${config.num}`;
    fetchData(serverUrl);
  }, [categoryName, useTrendData]);

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
    { field: 'review_count', headerName: 'Review Count', width: 300, headerAlign: 'center', align: 'center' }
  ];

  const handleClose = () => {
    setSelectedBusinessId(null);
  };

  const handleToggleChange = (event) => {
    setUseTrendData(event.target.checked);
  };

  return (
    <Box sx={{ position: 'relative', padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {categoryName} Restaurants
      </Typography>

      <FormControlLabel
        control={
          <Switch
            checked={useTrendData}
            onChange={handleToggleChange}
            name="useTrendData"
          />
        }
        label={useTrendData ? 'Trend Data' : 'Category Data'}
        labelPlacement="start"
        sx={{ marginBottom: 2 }}
      />

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ width: '100%', maxWidth: '1200px', margin: 'auto' }}>
          <DataGrid
            rows={useTrendData ? trendData : categoryData}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            autoHeight
            getRowId={(row) => row.business_id}
          />
          {selectedBusinessId && <RestaurantCard businessId={selectedBusinessId} handleClose={handleClose} />}
        </Box>
      )}
    </Box>
  );
}

export default CategoryInfoPage;
