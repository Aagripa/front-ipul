import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { postTeam } from '@/app/api/team/route';
import { useRouter } from 'next/navigation';
import { Alert, Snackbar } from '@mui/material';

interface FormcreateteamDialogProps {
    open: boolean;
    handleClose: () => void;
}

const FormcreateteamDialog: React.FC<FormcreateteamDialogProps> = ({ open, handleClose }) => {
    const [namaTim, setNamaTim] = React.useState('');
    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const [showSnackbar1, setShowSnackbar1] = React.useState(false);


    const handleNamaTimChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNamaTim(event.target.value);
    };

    const router = useRouter();
    const handlePostTeam = async () => {
        try {
            if (namaTim === '') {
                setShowSnackbar1(true);
            } else {
                await postTeam(namaTim);
                setNamaTim('')
                router.refresh();
                setShowSnackbar(true);
                handleClose();
            }
        } catch (error) {
            console.error('Error posting team data:', error);
            // Handle error here
        } // Close the dialog after the operation is complete
    };

    const handleSnackbarClose = () => {
        setShowSnackbar(false);
    };

    const handleSnackbarClose1 = () => {
        setShowSnackbar1(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} maxWidth='xs' fullWidth={true}>
                <DialogTitle mb={2}>Buat Tim Baru</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="namaTim"
                        label="Nama Tim"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={namaTim}
                        onChange={handleNamaTimChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: '#5A6A85' }} onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' onClick={handlePostTeam}>Buat</Button>
                </DialogActions>

                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={showSnackbar1}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose1}
                >
                    <Alert elevation={6} variant="filled" severity='error'>
                        Nama tim tidak boleh kosong!
                    </Alert>
                </Snackbar>

            </Dialog>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert elevation={6} variant="filled" severity='success'>
                    Tim Telah Dibuat
                </Alert>
            </Snackbar>
        </div>
    );
};

export default FormcreateteamDialog;