import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { getTask, putTask } from '@/app/api/task/route';
import { Alert, Autocomplete, Box, MenuItem, Snackbar, Typography } from '@mui/material';
import { getMemberByIdTeam } from '@/app/api/member/route';

interface FormedittaskDialogProps {
    open: boolean;
    handleClose: () => void;
    id: string;
    teamId: number;
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

interface User {
    userId: string;
    name: string;
}

const FormedittaskDialog: React.FC<FormedittaskDialogProps> = ({ open, handleClose, id, teamId }) => {

    const [showSnackbar, setShowSnackbar] = useState(false);
    const [showSnackbar1, setShowSnackbar1] = useState(false);
    //data member
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

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

    useEffect(() => {
        // Memastikan bahwa taskData selalu mengikuti perubahan selectedUser
        setTaskData((prevTaskData) => ({
            ...prevTaskData,
            forUser: selectedUser?.userId || '',
            forName: selectedUser?.name || '',
        }));
    }, [selectedUser]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const members = await getMemberByIdTeam(teamId);
                if (Array.isArray(members)) {
                    const formattedData = members.map((item) => ({
                        userId: item.user.nip,
                        name: item.user.name,
                    }));
                    setUsers(formattedData);
                }
            } catch (error) {
                console.error('Error while fetching members:', error);
            }
        };
        const fetchTaskData = async () => {
            try {
                const task = await getTask(id);
                setTaskData((prevTaskData) => ({
                    ...prevTaskData,
                    ...task,
                }));
            } catch (error) {
                console.error('Error fetching task data:', error);
            }
        };

        // Pastikan id ada sebelum memanggil fetchTaskData
        if (id) {
            fetchTaskData();
        }
        fetchMembers();

    }, [teamId, id]);

    useEffect(() => {
        setSelectedUser(users.find(user => user.name === taskData.forName) || null);
    }, [taskData.forName, users]);

    const handleUpdateTask = async () => {
        console.log(selectedUser)
        try {
            const response = await putTask(id, taskData);
            console.log(response.message); // Optional, for debugging purposes
            setShowSnackbar(true);
            handleClose();
        } catch (error) {
            console.error('Error while updating task:', error);
            // Handle errors if needed
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
                <DialogTitle mb={2}>Edit Task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="projectName"
                        label="Nama Task"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={taskData.name}
                        onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
                        InputLabelProps={{ shrink: taskData.name !== '' }}  // Tetapkan shrink ke true jika ada nilai di dalam TextField
                    />



                    <Autocomplete
                        id="forUser"
                        options={users}
                        getOptionLabel={(option) => option.name}
                        value={selectedUser}
                        onChange={(e, newValue) => setSelectedUser(newValue as User)}
                        renderInput={(params) => <TextField {...params} label="Untuk User" variant="outlined" style={{ marginBottom: 16 }} />}  // Tambahkan margin di sini
                        renderOption={(props, option) => (
                            <div key={option.userId} {...props as React.HTMLProps<HTMLDivElement>}>
                                {option.name}
                            </div>
                        )}
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
                            value={taskData.startDate}
                            onChange={(e) => setTaskData({ ...taskData, startDate: e.target.value })}
                            size="small"
                            style={{ marginBottom: 16 }}  // Tambahkan margin di sini
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
                            value={taskData.endDate}
                            onChange={(e) => setTaskData({ ...taskData, endDate: e.target.value })}
                            size="small"
                            style={{ marginBottom: 16 }}  // Tambahkan margin di sini
                        />
                    </Box>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="projectDesc"
                        label="Deskripsi Task"
                        type="text"
                        fullWidth
                        multiline
                        variant="outlined"
                        value={taskData.taskDesc}
                        onChange={(e) => setTaskData({ ...taskData, taskDesc: e.target.value })}
                        InputLabelProps={{ shrink: taskData.taskDesc !== '' }}
                        style={{ marginBottom: 16 }}
                    />

                    <TextField
                        id="status"
                        select
                        label="Status"
                        value={taskData.status}
                        onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
                        fullWidth
                        variant="outlined"
                        style={{ marginBottom: 16 }}
                    >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="InProgress">InProgress </MenuItem>
                        <MenuItem value="Completed">Completed </MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: '#5A6A85' }} onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' onClick={handleUpdateTask}>Buat</Button>
                </DialogActions>

                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={showSnackbar1}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose1}
                >
                    <Alert elevation={6} variant="filled" severity="error">
                        Nama Task tidak boleh kosong
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
                    Task berhasil dibuat
                </Alert>
            </Snackbar>
        </div>
    );
};

export default FormedittaskDialog;
