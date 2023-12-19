import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { postTask } from '@/app/api/task/route'; // Ganti dengan path yang benar
import { useRouter } from 'next/navigation';
import { Alert, Autocomplete, Box, Snackbar, Typography } from '@mui/material';
import { getMemberByIdTeam } from '@/app/api/member/route';

interface FormcreatetaskDialogProps {
    open: boolean;
    handleClose: () => void;
    teamId: number;
    projectId: number;
}

interface User {
    userId: string;
    name: string;
}


const FormcreatetaskDialog: React.FC<FormcreatetaskDialogProps> = ({ open, handleClose, teamId, projectId }) => {

    const [showSnackbar, setShowSnackbar] = useState(false);
    const [showSnackbar1, setShowSnackbar1] = useState(false);

    //data member
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    //post task
    const [Name, setName] = useState('');
    const [parentId, setparentId] = useState('');
    const [Comment, setComment] = useState('');
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [TaskDesc, setTaskDesc] = useState('');


    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const members = await getMemberByIdTeam(teamId);
                console.log(members)
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
        fetchMembers();
    }, [teamId]);


    const handleSubscribe = async () => {
        try {
            let postData = {
                name: Name,
                status: 'Pending',
                taskDesc: TaskDesc || null, // Jika tidak ada deskripsi, set nilai default sebagai string kosong
                forUser: selectedUser?.userId || null,
                forName: selectedUser?.name || null,
                comment: Comment || null,
                startDate: StartDate || null, // Jika tidak ada tanggal mulai, set nilai default sebagai string kosong
                endDate: EndDate || null, // Jika tidak ada tanggal selesai, set nilai default sebagai string kosong
                parentId: parentId || null // Tambahkan nilai default sebagai string kosong jika tidak ada parentId
            };

            // Tentukan kondisi apakah task merupakan subtask atau bukan
            if (parentId) {
                postData = { ...postData, parentId: parentId };
            }

            const response = await postTask(teamId, projectId, postData);
            console.log(response.message); // Opsional, untuk tujuan debugging
            setShowSnackbar(true);
            setName('');
            setStartDate('');
            setEndDate('');
            setTaskDesc('');
            setSelectedUser(null);
            handleClose();


        } catch (error) {
            console.error('Error while posting project data:', error);
            // Tambahkan penanganan error tambahan jika diperlukan
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
                <DialogTitle mb={2}>Buat Task Baru</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="projectName"
                        label="Nama Task"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Autocomplete
                        id="forUser"
                        options={users}
                        getOptionLabel={(option) => option.name}
                        value={selectedUser}
                        onChange={(e, newValue) => {
                            setSelectedUser(newValue as User);
                        }}
                        renderInput={(params) => <TextField {...params} label="Untuk User" variant="outlined" />}
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
                            value={StartDate}
                            onChange={(e) => setStartDate(e.target.value)}
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
                            value={EndDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            size="small"
                        />
                    </Box>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="projectDesc"
                        label="Deskripsi Task (Opsional)"
                        type="text"
                        multiline
                        fullWidth
                        variant="outlined"
                        value={TaskDesc}
                        onChange={(e) => setTaskDesc(e.target.value)}
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

export default FormcreatetaskDialog;
