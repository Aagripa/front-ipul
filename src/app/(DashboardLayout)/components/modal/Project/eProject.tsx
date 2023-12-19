import * as React from 'react';
import { useEffect, useState } from 'react';
import { putProjectsById } from '@/app/api/proyek/route'; // Ganti dengan path yang benar
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Snackbar, TextField, Typography } from '@mui/material';

interface ProjectData {
    projectName: string;
    startDate: string;
    endDate: string;
    projectDesc: string;
    status: string;
}

interface FormEditProjectDialogProps {
    open: boolean;
    handleClose: () => void;
    projectId: number;
    initialProjectData: ProjectData;
}

const FormEditProjectDialog: React.FC<FormEditProjectDialogProps> = ({ open, handleClose, projectId, initialProjectData }) => {
    const [projectName, setProjectName] = useState(initialProjectData.projectName);
    const [startDate, setStartDate] = useState(initialProjectData.startDate);
    const [endDate, setEndDate] = useState(initialProjectData.endDate);
    const [projectDesc, setProjectDesc] = useState(initialProjectData.projectDesc);
    const [status, setStatus] = useState(initialProjectData.status);

    // Gunakan useEffect untuk mengupdate state saat ada perubahan pada initialProjectData
    useEffect(() => {
        setProjectName(initialProjectData.projectName);
        setStartDate(initialProjectData.startDate);
        setEndDate(initialProjectData.endDate);
        setProjectDesc(initialProjectData.projectDesc);
        setStatus(initialProjectData.status);
    }, [initialProjectData]);

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

    const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setStatus(event.target.value as string);
    };

    const handleEditProject = async () => {
        if (projectName === '') {
            setShowSnackbar1(true);
            return;
        }
        try {
            await putProjectsById(projectId, { projectName, startDate, endDate, projectDesc, status });
            setShowSnackbar(true);
            handleClose();
        } catch (error) {
            console.error('Error while updating project data:', error);
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
                <DialogTitle mb={2}>Edit Project</DialogTitle>
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
                            id="startDate"
                            label="Tanggal Mulai"
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
                            id="endDate"
                            label="Tanggal Selesai"
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
                        label="Deskripsi Project"
                        type="text"
                        multiline
                        fullWidth
                        variant="outlined"
                        value={projectDesc}
                        onChange={handleProjectDescChange}
                    />
                    <TextField
                        id="status"
                        select
                        label="Status"
                        value={status}
                        onChange={handleStatusChange}
                        fullWidth
                        variant="outlined"
                    >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="InProgress">InProgress </MenuItem>
                        <MenuItem value="Completed">Completed </MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: '#5A6A85' }} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant='contained' onClick={handleEditProject}>Simpan</Button>
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
                    Project berhasil diperbarui
                </Alert>
            </Snackbar>
        </div>
    );
};

export default FormEditProjectDialog;