import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import AlertTitle from '@mui/material/AlertTitle';
import { styled } from '@mui/material/styles';

const BlackOverlay = styled('div')({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });

const InfoCardDelete = ({ onDeleteProduct }) => {
  const [open, setOpen] = React.useState(true);

  return (
    // Use a full-screen container to make the alert display the whole screen
    <BlackOverlay sx={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        zIndex: 99999, // set a high zIndex value to make sure it's above other components
        display: open ? 'flex' : 'none', // show the box only when open is true
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        <Box>
        <Collapse in={open}>
            <Alert
            severity='warning'
            action={
                <>
                    <Button
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        onDeleteProduct(false);
                        setOpen(false);
                    }}
                    >
                    cancel
                    </Button>
                    <Button
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        onDeleteProduct(true);
                        setOpen(false);
                    }}
                    >
                    delete product
                    </Button>
                </>
            }
            sx={{ mb: 2 }}
            >
            <AlertTitle>Deleting a product is permanent. — <strong>Do you want to continue?</strong> </AlertTitle>

            </Alert>
        </Collapse>
        </Box>
    </BlackOverlay>
  );
}

export default InfoCardDelete;
