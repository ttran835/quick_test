import React, { PropsWithChildren } from 'react';
import { Box, Alert, IconButton, Collapse, AlertProps } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props extends PropsWithChildren {
  open: boolean;
  close: () => void;
  alertProps: AlertProps;
}

export default function TransitionAlerts(props: Props) {
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={props.open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                props.close();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
          {...props.alertProps}
        >
          {props.children}
        </Alert>
      </Collapse>
    </Box>
  );
}
