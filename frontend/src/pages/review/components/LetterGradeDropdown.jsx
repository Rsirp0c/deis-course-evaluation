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

export default function ComboBox({options, label, handleGradeChange}) {
  return (  
	<ThemeProvider theme={theme}>
		<Autocomplete
			onChange={(event, value) => handleGradeChange(event, value)}
      		disablePortal
      		id="combo-box-demo"
      		options={options}
			
      		sx={{
			width: 615,
			'& .MuiInputBase-root': {
				borderRadius: '10px',
			}
			}}
      		renderInput={(params) => <TextField {...params} label={label} />}
		/>
	</ThemeProvider>
  );
}
