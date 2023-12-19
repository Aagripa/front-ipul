import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { postProjectByIdTeam } from '@/app/api/proyek/route'; // Ganti dengan path yang benar
import { useRouter } from 'next/navigation';
import { Alert, Box, Snackbar, Typography } from '@mui/material';

interface FormcreateprojectDialogProps {
    open: boolean;
    handleClose: () => void;
    idTim: string;
}

const FormcreateprojectDialog: React.FC<FormcreateprojectDialogProps> = ({ open, handleClose, idTim }) => {
    const [projectName, setProjectName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [projectDesc, setProjectDesc] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [showSnackbar1, setShowSnackbar1] = useState(false);

    const handleProjectNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProjectName(event.target.value);
    };

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(event.target.value);
    };

    const handleProjectDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProjectDesc(event.target.value);
    };

    const router = useRouter();
    const handleSubscribe = async () => {
        if (projectName === '') {
            setShowSnackbar1(true);
            return;
        }
        try {
            await postProjectByIdTeam(idTim, { projectName, startDate, endDate, projectDesc });
            setShowSnackbar(true)
            setProjectName('')
            setStartDate('');
            setEndDate('');
            setProjectDesc('')
            router.refresh();
            handleClose();
        } catch (error) {
            console.error('Error while posting project data:', error);
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
            <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                <DialogTitle mb={2}>Buat Project Baru</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="projectName"
                        label="Nama Project"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={projectName}
                        onChange={handleProjectNameChange}
                    />
                    <Box>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="dueDate"
                            label="Tanggal Mulai (Opsional)"
                            type="date"
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={startDate}
                            onChange={handleStartDateChange}
                            size="small"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="dueDate"
                            label="Tanggal Selesai (Opsional)"
                            type="date"
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={endDate}
                            onChange={handleEndDateChange}
                            size="small"
                        />
                    </Box>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="projectDesc"
                        label="Deskripsi Project (Opsional)"
                        type="text"
                        fullWidth
                        multiline
                        variant="outlined"
                        value={projectDesc}
                        onChange={handleProjectDescChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: '#5A6A85' }} onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' onClick={handleSubscribe}>Buat</Button>
                </DialogActions>

                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={showSnackbar1}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose1}
                >
                    <Alert elevation={6} variant="filled" severity="error">
                        Nama project tidak boleh kosong
                    </Alert>
                </Snackbar>

            </Dialog>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert elevation={6} variant="filled" severity="success">
                    Project berhasil dibuat
                </Alert>
            </Snackbar>
        </div>
    );
};

export default FormcreateprojectDialog;
