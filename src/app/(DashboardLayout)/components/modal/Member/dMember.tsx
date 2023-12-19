import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteMemberbyIdTeam } from '@/app/api/member/route';
import { useRouter } from 'next/navigation';
import { Alert, Snackbar } from '@mui/material';

interface FormdeletememberDialogProps {
    open: boolean;
    handleClose: () => void;
    idTim: string;
    NIP?: string;
    NAMA?: string
}

const FormdeletememberDialog: React.FC<FormdeletememberDialogProps> = ({
    open,
    handleClose,
    idTim,
    NIP,
    NAMA
}) => {
    const [showSnackbar, setShowSnackbar] = React.useState(false);

    const router = useRouter();
    const handleDelete = async () => {
        try {
            await deleteMemberbyIdTeam(idTim, NIP); // Menggunakan selectedValue.value sebagai nip
            setShowSnackbar(true)
            router.refresh();
            handleClose();
        } catch (error) {
            console.error('Error deleting member:', error);
        }
    };

    const handleSnackbarClose = () => {
        setShowSnackbar(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                <DialogTitle mb={2}>Keluarkan Anggota</DialogTitle>
                <DialogContent>
                    Apakah anda ingin mengeluarkan {NAMA} dari tim?
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: '#5A6A85' }} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button color='error'
                        onClick={handleDelete} variant='contained'
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert elevation={6} variant="filled" severity="success">
                    Anggota telah dihapus
                </Alert>
            </Snackbar>
        </div>
    );
};

export default FormdeletememberDialog;
