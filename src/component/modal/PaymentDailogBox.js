import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Pay from '../payment/CheckoutForm';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
    // Add custom width here
    '& .MuiDialog-paper': {
        width: '80%', // Adjust width as needed
        maxWidth: '800px', // Optional: set a max-width if needed
    },
}));

export default function PaymentDailogBox({ setPayment }) {
    const [open, setOpen] = React.useState(false);
    const [paymentDone, setPaymentDone] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <React.Fragment>
            {paymentDone ? <Button variant="outlined" disabled>
                Pay with stripe
            </Button> :
                <Button variant="outlined" onClick={handleClickOpen}>
                    Pay with stripe
                </Button>}
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Stripe Payment
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Pay handleCloseModal={() => setOpen(false)} onPaymentSuccess={() => setPayment(true)} setPaymentComplete={() => setPaymentDone(true)} />
                </DialogContent>

            </BootstrapDialog>
        </React.Fragment>
    );
}
