import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Snackbar, Alert } from '@mui/material';
import { deleteTask } from '@/app/api/task/route'; // Ganti dengan path yang benar

interface DeleteTaskDialogProps {
    open: boolean;
    handleClose: () => void;
    taskId: string;
}

const DeleteTaskDialog: React.FC<DeleteTaskDialogProps> = ({ open, handleClose, taskId }) => {
    const [showSnackbar, setShowSnackbar] = useState(false);

    const handleDeleteTask = async () => {
        try {
            await deleteTask(taskId);
            setShowSnackbar(true);
            handleClose();
        } catch (error) {
            console.error('Error while deleting task:', error);
            // Handle error jika diperlukan
        }
    };

    const handleSnackbarClose = () => {
        setShowSnackbar(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Apakah Anda yakin ingin menghapus task ini?</DialogTitle>
                <DialogContent>
                    {/* Tambahkan konten tambahan jika diperlukan */}
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: '#5A6A85' }} onClick={handleClose}>Batal</Button>
                    <Button variant='contained' onClick={handleDeleteTask} color="error">
                        Hapus
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
                    Task berhasil dihapus
                </Alert>
            </Snackbar>
        </div>
    );
};

export default DeleteTaskDialog;
