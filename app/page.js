'use client'
import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import ProductList from '../components/ProductList';

export default function Home() {
  


  return (
    <main >
      <Box sx={{ padding: 1}}>
       <ProductList />
      </Box>
     
    </main>
  );
}
