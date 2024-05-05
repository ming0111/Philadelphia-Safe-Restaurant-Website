// src/components/NavBar.js
import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from './logo.jpg';

function NavBar() {
    return (
        <AppBar position="static" sx={{ background: '#1976d2' }}>
            <Toolbar>
                {/* Logo and Title */}
                <Typography variant="h6" component={Link} to="/" sx={{ color: 'inherit', textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src={logo} alt="Logo" style={{ marginRight: 10, maxHeight: '50px' }} />
                        Philasaferest
                    </Box>
                </Typography>

                {/* Spacer */}
                <Box sx={{ flexGrow: 1 }} />

                {/* Navigation Links */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Button color="inherit" component={Link} to="/categories" sx={{ flexGrow: 1 }}>Categories</Button>
                    <Button color="inherit" component={Link} to="/safety-ranking" sx={{ flexGrow: 1 }}>Safety Ranking</Button>
                    <Button color="inherit" component={Link} to="/search" sx={{ flexGrow: 1 }}>Search</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;