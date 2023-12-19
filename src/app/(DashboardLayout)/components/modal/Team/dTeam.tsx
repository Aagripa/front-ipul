import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, MenuItem, Snackbar } from '@mui/material';
import { deleteTeam } from '@/app/api/team/route';  // Sesuaikan dengan path yang benar
import { getTeam } from '@/app/api/team/route';  // Sesuaikan dengan path yang benar
import { useRouter } from 'next/navigation';

interface FormdeleteteamDialogProps {
    open: boolean;
    handleClose: () => void;
}

const FormdeleteteamDialog: React.FC<FormdeleteteamDialogProps> = ({ open, handleClose }) => {
    const [teamData, setTeamData] = React.useState<any[]>([]);
    const [selectedTeam, setSelectedTeam] = React.useState('');
    const [showSnackbar, setShowSnackbar] = React.useState(false);

    React.useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const data = await getTeam(); // Ganti dengan fungsi untuk mengambil data dari API
                setTeamData(data);
            } catch (error) {
                console.error('Error fetching team data:', error);
                // Handle error here
            }
        };
        fetchTeamData();
    }, []);

    const router = useRouter();
    const handleDeleteTeam = async () => {
        try {
            await deleteTeam(selectedTeam);
            setShowSnackbar(true);
            router.refresh();
            setSelectedTeam('')
            console.log('Team deleted successfully');
        } catch (error) {
            console.error('Error deleting team:', error);
            // Handle error here
        }
        handleClose(); // Close the dialog after the operation is complete
    };

    const handleSnackbarClose = () => {
        setShowSnackbar(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} maxWidth='xs' fullWidth={true}>
                <DialogTitle mb={2}>Pilih tim yang ingin dihapus</DialogTitle>
                <DialogContent>
                    <TextField
                        select
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nama Tim"
                        fullWidth
                        variant="outlined"
                        value={selectedTeam}
                        onChange={(e) => setSelectedTeam(e.target.value)}
                    >
                        {teamData.map((team) => (
                            <MenuItem key={team.idTim} value={team.idTim}>
                                {team.namaTim}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: '#5A6A85' }} onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' color='error' onClick={handleDeleteTeam}>Hapus</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert elevation={6} variant="filled" severity="success">
                    Tim telah dihapus
                </Alert>
            </Snackbar>
        </div>
    );
};

export default FormdeleteteamDialog;
