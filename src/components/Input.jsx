import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Input = React.forwardRef(function Input({id,label,type="text",...props}, ref) {
  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField type={type} ref={ref} {...props} id={id} label={label} variant="outlined" />
    </Box>
  );
});

export default Input;