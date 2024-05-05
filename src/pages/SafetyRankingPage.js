import { useEffect, useState } from 'react';
import { Button, Container, Grid, Link, Slider, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import RestaurantCard from '../components/RestaurantCard';
const config = require('../config.json');

export default function SafetyRankingPage() {

  const [data, setData] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  
  const [radius, setRadius] = useState(500); 
  const [lon, setLon] = useState('-75.161026'); // Mean longitude
  const [lat, setLat] = useState('39.954384'); // Mean latitude

  const [databyname, setDataByName] = useState([]);
  const [selectedRestaurantId2, setSelectedRestaurantId2] = useState(null);
  const [radius2, setRadius2] = useState(500); 
  const [bus, setBus] = useState(''); 
  

  useEffect(() => {
    fetch(`https://blooming-spire-72569-216cae1093c2.herokuapp.com/rank/${radius}/${lon}/${lat}`)
      .then(res => res.json())
      .then(resJson => setData(resJson))
      .catch(error => console.error('Failed to fetch data:', error));
  }, []);

  const search = () => {
    fetch(`https://blooming-spire-72569-216cae1093c2.herokuapp.com/rank/${radius}` + `/${lon}` +`/${lat}`)
      .then(res => res.json())
      .then(resJson => setData(resJson))
      .catch(error => console.error('Failed to fetch data:', error));
  }

  
  const columns = [
    { field: 'name', headerName: 'Restaurant Name', width: 400, renderCell: (params) => (
        <Link onClick={() => setSelectedRestaurantId(params.row.business_id)}>{params.value}</Link>
    ) },
    { field: 'address', headerName: 'Address', width: 400 },
    { field: 'stars', headerName: 'Stars', width: 100 },
    { field: 'incident_count', headerName: 'Incident_Count', type: 'number', width: 200 },
  ]
  
  useEffect(() => {
    fetch(`https://blooming-spire-72569-216cae1093c2.herokuapp.com/count/${bus}/${radius2}`)
      .then(res => res.json())
      .then(resJson => setDataByName(resJson))
      .catch(error => console.error('Failed to fetch data:', error));
  }, []);

  const searchbyname = () => {
    fetch(`https://blooming-spire-72569-216cae1093c2.herokuapp.com/count/${bus}` + `/${radius2}`)
      .then(res => res.json())
      .then(resJson => setDataByName(resJson))
      .catch(error => console.error('Failed to fetch data:', error));
  }


  const columnsbyname = [
    { field: 'name', headerName: 'Restaurant Name', width: 400, renderCell: (params) => (
        <Link onClick={() => setSelectedRestaurantId2(params.row.business_id)}>{params.value}</Link>
    ) },
    { field: 'address', headerName: 'Address', width: 400 },
    { field: 'incident_count', headerName: 'Incident_Count', type: 'number', width: 200 },
  ]

  return (
  <Container>
    <Container>
      {selectedRestaurantId && <RestaurantCard businessId={selectedRestaurantId} handleClose={() => setSelectedRestaurantId(null)} />}
      <h2>I. Search Restaurant By Geographic Information</h2>
      <p>
      Discover the safest restaurants near you by entering geographic coordinates.  
      </p>
      <p>Enter your desired radius to find your dining options with their safety ratings.</p>
      <Grid container spacing={6}>
        <Grid item xs={4}>
          <TextField 
          label='Longitude' 
          type='number'
          variant="outlined"
          value={lon} 
          onChange={(e) => setLon(e.target.value)} 
          inputProps={{ 
              step: 0.000001, 
              min: "-75.651673", 
              max: "-74.893799	"   // Based on the Business Table
        }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField 
          label='Latitude' 
          type='number'
          variant="outlined"
          value={lat} 
          onChange={(e) => setLat(e.target.value)} 
          inputProps={{ 
              step: 0.000001, 
              min: "39.864924", 
              max: "40.247267"   // Based on the Business Table
        }}
          />
        </Grid>
        
        <Grid item xs={4}>
          <p>Radius(m)</p>
          <Slider
            value={radius}
            min={10}
            max={1000}
            step={10}
            onChange={(e, newValue) => setRadius(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        
      </Grid>
      <Button onClick={() => search() } style={{ left: '50%', transform: 'translateX(-50%)' }}>
        Search
      </Button>
      <h2>Results</h2>
      <DataGrid
        getRowId={(row) => row.business_id}
        rows={data}
        columns={columns}
        initialState={{
          ...data.initialState,
          pagination: {
            ...data.initialState?.pagination,
            paginationModel: {
              pageSize: 25,
            
            },
          },
        }}
        autoHeight
      />
    </Container>

    <Container>
    {selectedRestaurantId && <RestaurantCard businessId={selectedRestaurantId2} handleClose={() => setSelectedRestaurantId(null)} />}
      <h2>II. Search Restaurant By Name</h2>
      <p>
      Look up specific restaurants by name to check their safety scores and get detailed location information. 
      </p>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <TextField 
          label='Restaurant Name' 
          type='text'
          variant="outlined"
          value={bus} 
          onChange={(e) => setBus(e.target.value)} 
          />
        </Grid>
        
        <Grid item xs={6}>
          <p>Radius(m)</p>
          <Slider
            value={radius2}
            min={10}
            max={1000}
            step={10}
            onChange={(e, newValue2) => setRadius2(newValue2)}
            valueLabelDisplay='auto'
          />
        </Grid>
        
      </Grid>
      <Button onClick={() => searchbyname() } style={{ left: '50%', transform: 'translateX(-50%)' }}>
        Search
      </Button>
      <h2>Results</h2>
      <DataGrid
        getRowId={(row) => row.business_id}
        rows={databyname}
        columns={columnsbyname}
        initialState={{
          ...data.initialState,
          pagination: {
            ...data.initialState?.pagination,
            paginationModel: {
              pageSize: 25,
            
            },
          },
        }}
        autoHeight
      />

    </Container>
        
  </Container>
  );
}