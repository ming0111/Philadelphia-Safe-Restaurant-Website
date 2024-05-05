import { useEffect, useState } from 'react';
import { Button, Container, Grid, Link, Slider, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';


import RestaurantCard from '../components/RestaurantCard';
const config = require('../config.json');

export default function SafetyRankingPage() {

  const [data, setData] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  
  const [keyword, setKeyWord] = useState('chinese'); 
  const [star, setStar] = useState([0.0, 5.0]); 
  const [incidentcount, setIncidentCount] = useState([0, 8574]); 

  const [databyname, setDataByName] = useState([]);
  const [resname, setResName] = useState('Starbucks'); 
  

  useEffect(() => {
    fetch(`https://blooming-spire-72569-216cae1093c2.herokuapp.com/search/cat`)
      .then(res => res.json())
    //   .then(resJson => {
    //     const restaurantWithId = resJson.map((data) => ({id: data.business_id, ...data }));
    //     setData(restaurantWithId);
    //   })
      .then(resJson => setData(resJson))
      .catch(error => console.error('Failed to fetch data:', error));
  }, []);

  const search = () => {
    fetch(`https://blooming-spire-72569-216cae1093c2.herokuapp.com/search/cat?title=${keyword}` 
    + `&star_low=${star[0]}&star_high=${star[1]}` 
    +`&incident_low=${incidentcount[0]}&incident_high=${incidentcount[1]}`)
      .then(res => res.json())
    //   .then(resJson => {
    //     const restaurantWithId = resJson.map((data) => ({id: data.business_id, ...data }));
    //     setData(restaurantWithId);
    //   })
      .then(resJson => setData(resJson))
      .catch(error => console.error('Failed to fetch data:', error));
  }

  
  const columns = [
    { field: 'name', headerName: 'Restaurant Name', width: 400, renderCell: (params) => (
        <Link onClick={() => setSelectedRestaurantId(params.row.business_id)}>{params.value}</Link>
    ) },
    // { field: 'category', headerName: 'Category', width: 200 },
    { field: 'address', headerName: 'Address', width: 300 },
    { field: 'stars', headerName: 'Stars', width: 200 },
    // { field: 'incident_count', headerName: 'Incident_Count', type: 'number', width: 200 },
    { field: 'postal_code', headerName: 'Zip Code', width: 200 },
  ]
  
  useEffect(() => {
    fetch(`https://blooming-spire-72569-216cae1093c2.herokuapp.com/search/review`)
      .then(res => res.json())
      .then(resJson => setDataByName(resJson))
      .catch(error => console.error('Failed to fetch data:', error));
  }, []);

  const searchbyname = () => {
    fetch(`https://blooming-spire-72569-216cae1093c2.herokuapp.com/search/review?title=${resname}`)
      .then(res => res.json())
      .then(resJson => setDataByName(resJson))
      .catch(error => console.error('Failed to fetch data:', error));
  }


  const columnsbyname = [
    { field: 'Source', headerName: 'Attitude', width: 150 },
    // { field: 'text', headerName: 'Review Content', width: 1000 },
    { 
      field: 'text', 
      headerName: 'Review Content', 
      width: 1000,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', lineHeight: 'normal' }}>
          <Tooltip title={params.value}>
            <div>{params.value}</div>
          </Tooltip>
        </div>
      ),
    },
  ];


  return (
  <Container>
    <Container>
      {selectedRestaurantId && <RestaurantCard businessId={selectedRestaurantId} handleClose={() => setSelectedRestaurantId(null)} />}
      <h2> Search Restaurant By Categories</h2>
      <p>
      Choose your preferred category keywords (e.g. Chinese, Korean) to find your options! Use this tool to locate places that match your culinary taste. 
      </p>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TextField 
          label='Key Word' 
          type='text'
          value={keyword} 
          onChange={(e) => setKeyWord(e.target.value)} 
          // placeholder="chinese"
          />
        </Grid>
        <Grid item xs={6}>
        <p>Stars</p>
          <Slider
            value={star}
            min={0}
            max={5}
            step={0.5}
            onChange={(e) => setStar(e.target.value)} 
            valueLabelDisplay='auto'
          />
        </Grid>
        
        <Grid item xs={6}>
          <p>Nearby Incident Number</p>
          <Slider
            value={incidentcount}
            min={0}
            max={8574}
            step={1}
            onChange={(e, newValue) => setIncidentCount(newValue)}
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
    <div style={{ height: 200, width: '100%' }}></div>
    <Container>
      <h2>Search Reviews By Restaurant</h2>
      <p>
      Enter the name of a restaurant to read reviews and see what others think about it! 
      </p>
      <Grid container spacing={3} direction="column" alignItems="center">
        <Grid item xs={12}>
        <TextField
            fullWidth
            label="Restaurant Name"
            type="text"
            value={resname}
            onChange={(e) => setResName(e.target.value)}
            // placeholder="Starbucks"
            variant="outlined"
        />
        </Grid>
        <Grid item xs={12}>
        <Button
            variant="contained"
            color="primary"
            onClick={() => searchbyname()}
            style={{ width: 'fit-content' }} 
        >
            SEARCH
        </Button>
        </Grid>
    </Grid>
    
       
      <h2>Results</h2>
      <DataGrid
        getRowId={(row) => row.review_id}
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
