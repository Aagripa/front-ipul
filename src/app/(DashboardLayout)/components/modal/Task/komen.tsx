import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { getTask, putTask } from '@/app/api/task/route';
import { Alert, Box, Snackbar, TextField, Typography } from '@mui/material';

interface KomenDialogProps {
    open: boolean;
    handleClose: () => void;
    id: string;
}

interface TaskData {
    name: string,
    forUser?: string | null,
    forName?: string | null,
    startDate?: string | null,
    endDate?: string | null,
    taskDesc?: string | null,
    parentId?: string | null,
    status?: string | null,
    comment?: string | null,
}

const KomenDialog: React.FC<KomenDialogProps> = ({ open, handleClose, id }) => {

    const [showSnackbar, setShowSnackbar] = useState(false);
    const [showSnackbar1, setShowSnackbar1] = useState(false);

    //data task
    const [taskData, setTaskData] = useState<TaskData>({
        name: '',
        forUser: '',
        forName: '',
        startDate: '',
        endDate: '',
        taskDesc: '',
        parentId: '',
        status: '',
        comment: '',
    });

    const [commentInput, setCommentInput] = useState<string | null>('');
    const [on, setOn] = useState(false);
    const [lin, setLin] = useState(true);

    useEffect(() => {
        const fetchTaskData = async () => {
            try {
                const task = await getTask(id);
                setTaskData(task);
                setCommentInput(null)
            } catch (error) {
                console.error('Error while fetching task data:', error);
            }
        };
        fetchTaskData();
    },
        [id, on, lin]);

    const handleAddComment = async () => {
        try {
            if (commentInput === '') {
                setShowSnackbar1(true);
            } else {
                const updatedTask = await putTask(id, { comment: commentInput, name: taskData.name || 'Default Name' });

                // Update hanya bidang yang diperbarui
                setTaskData(prevTaskData => ({
                    ...prevTaskData,
                    comment: updatedTask.comment,
                    // Tetapkan startDate dan endDate yang sama seperti sebelumnya
                    startDate: prevTaskData.startDate,
                    endDate: prevTaskData.endDate,
                }));

                setShowSnackbar(true);
                setOn(true);
                setLin(true);
            }
        } catch (error) {
            console.error('Error while adding comment:', error);
            setShowSnackbar1(true);
        }
    };



    const handleDeleteComment = async () => {
        try {
            const updatedTask = await putTask(id, {
                ...taskData,
                comment: null,
            });
            setCommentInput(null)
            setTaskData(updatedTask);
            setShowSnackbar(true);
            setOn(true)
            setLin(false)
        } catch (error) {
            console.error('Error while deleting comment:', error);
            setShowSnackbar1(true);
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
            <Dialog open={open} onClose={() => { handleClose(); setOn(false); }} maxWidth="xs" fullWidth>
                <DialogTitle>Komentar</DialogTitle>
                <Box sx={{ borderTop: 1, borderBottom: 1, borderColor: "divider" }}>
                    <DialogContent>
                        {taskData.comment ? (
                            <Box>
                                <Typography variant='body1'>{taskData.comment}</Typography>
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100px', // Set the height as needed
                                    color: 'text.secondary',
                                }}
                            >
                                <Box sx={{ width: '100%' }}>
                                    <TextField
                                        label="Tambah Komentar"
                                        multiline
                                        rows={2}
                                        fullWidth
                                        variant="outlined"
                                        value={commentInput}
                                        onChange={(e) => setCommentInput(e.target.value)}
                                    />
                                </Box>
                            </Box>
                        )}
                    </DialogContent>
                </Box>
                <DialogActions>
                    {taskData.comment ? (
                        <Button variant='contained' color="error" onClick={() => handleDeleteComment()}>
                            Hapus Komentar
                        </Button>
                    ) : (
                        <Button variant='contained' color="primary" onClick={() => handleAddComment()}>
                            Tambah Komentar
                        </Button>
                    )}
                </DialogActions>

                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={showSnackbar1}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose1}
                >
                    <Alert elevation={6} variant="filled" severity="error">
                        Komen tidak boleh kosong
                    </Alert>
                </Snackbar>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={showSnackbar}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                >
                    <Alert elevation={6} variant="filled" severity="success">
                        komen berhasil dibuat
                    </Alert>
                </Snackbar>
            </Dialog>
        </div>
    );
};

export default KomenDialog;
