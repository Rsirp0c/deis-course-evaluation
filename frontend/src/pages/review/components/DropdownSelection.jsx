import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: 'Montserrat, serif',
            textTransform: 'none',
        },
    },
});

export default function ComboBox({ options, label, handleChange }) {
    return (
        <ThemeProvider theme={theme}>
            <Autocomplete
                onInputChange={(event, value) => handleChange(event, value)}
                disablePortal
                id='combo-box-demo'
                forcePopupIcon
                options={options}
                sx={{
                    width: 280,
                    marginRight: '40px',
                    '& .MuiInputBase-root': {
                        borderRadius: '10px',
                    },
                }}
                renderInput={(params) => (
                    <TextField {...params} label={label} />
                )}
            />
        </ThemeProvider>
    );
}
