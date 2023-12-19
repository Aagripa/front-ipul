import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { putTeam } from '@/app/api/team/route'; // Import putTeam instead of postTeam
import { useRouter } from 'next/navigation';
import { Alert, Snackbar } from '@mui/material';

interface FormeditteamDialogProps {
    open: boolean;
    handleClose: () => void;
    teamId: string;
    teamName: string;
}

const FormeditteamDialog: React.FC<FormeditteamDialogProps> = ({ open, handleClose, teamId, teamName }) => {
    const [namaTim, setNamaTim] = React.useState('');
    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const [showSnackbar1, setShowSnackbar1] = React.useState(false);

    React.useEffect(() => {
        setNamaTim(teamName);
    }, [teamName]);

    const handleNamaTimChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNamaTim(event.target.value);
    };

    const router = useRouter();
    const handlePutTeam = async () => {
        try {
            if (namaTim === '') {
                setShowSnackbar1(true);
            } else {
                // Use putTeam instead of postTeam
                await putTeam(teamId, namaTim); // Replace teamId with the actual team ID
                setNamaTim('');
                router.refresh();
                setShowSnackbar(true);
                handleClose();
            }
        } catch (error) {
            console.error('Error updating team data:', error);
            // Handle error here
        }
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
                <DialogTitle mb={2}>Edit Tim</DialogTitle>
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
                    <Button variant='contained' onClick={handlePutTeam}>Simpan</Button>
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
                    Tim Telah Diedit
                </Alert>
            </Snackbar>
        </div>
    );
};

export default FormeditteamDialog;
