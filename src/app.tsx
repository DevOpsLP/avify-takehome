// App.tsx

import React, { useState, useEffect } from 'react';
import { GenerationData, GenerationMix } from '@/types';
import HorizontalBarChart from './components/BarChart';
import FuelGrid from './components/FuelGrid';
import './styles.css';
import { Typography, Box, CircularProgress } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { formatToLocal } from './utils/formatDate';
const Grid = Grid2 // For semantic

const App = () => {
    const [generationMix, setGenerationMix] = useState<GenerationMix[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.carbonintensity.org.uk/generation');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: { data: GenerationData } = await response.json();
                setFromDate(data.data.from);
                setToDate(data.data.to);
                setGenerationMix(data.data.generationmix);
            } catch (error: any) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch energy generation data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <>
            <Box sx={{ padding: { xs: 2, sm: 4, md: 6 } }}>
                {/* Page Title */}
                <Typography variant="h2" align="center" gutterBottom>
                    UK Energy Mix
                </Typography>
                
                {/* Display Dates */}
                <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
                    <Typography variant="h6">
                        Data From: 
                        <Typography variant='body2'>
                            {formatToLocal(fromDate)} - {formatToLocal(toDate)}
                        </Typography> 
                    </Typography>
                </Box>
                
                {/* Grid Container */}
                <Grid container spacing={3}>
                    {/* HorizontalBarChart Component */}
                    <Grid size={{xs:12,  md: 6}}>
                        <HorizontalBarChart data={generationMix} />
                    </Grid>
                    
                    {/* FuelGrid Component */}
                    <Grid size={{xs:12,  md: 6}}>
                        <FuelGrid data={generationMix} />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export {
    App
}
