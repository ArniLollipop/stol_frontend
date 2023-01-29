import React from 'react';
import Header from '../User_components/Header';
import Category from '../User_components/Category';
import { Box } from '@mui/material';

function User() {
  return (
    <div>
      <Header/>
      <Box sx={{marginTop: '30px', borderRadiusTop: '10px', backgroundColor: 'green'}}>
        <Category/>
      </Box>
    </div>
  );
}

export default User;