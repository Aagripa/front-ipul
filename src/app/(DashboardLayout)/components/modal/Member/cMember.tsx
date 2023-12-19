import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getUser } from '@/app/api/user/route';
import { Alert, Autocomplete, Snackbar } from '@mui/material';
import { useRouter } from 'next/navigation';

interface FormcreatememberDialogProps {
    open: boolean;
    handleClose: () => void;
    handleAddMember: (idtim: string, memberId: string) => Promise<void>;
    idtim: string; // Add idtim property to FormcreatememberDialogProps
}

interface User {
    name: string;
    nip: string;
}

const FormcreatememberDialog: React.FC<FormcreatememberDialogProps> = ({ open, handleClose, handleAddMember, idtim }) => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [showSnackbar1, setShowSnackbar1] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUser();
                setUsers(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchData();
    }, []);

    const router = useRouter();
    const handleAddMemberAction = async () => {
        try {
            if (!selectedUser) {
                setErrorMessage('Silahkan pilih anggota anda!');
                setShowSnackbar1(true);
                return;
            }
            const res = await handleAddMember(idtim, selectedUser!.nip);
            if (res !== null && res !== undefined) {
                setShowSnackbar(true);
                setSelectedUser(null);
                router.refresh();
                handleClose();
            } else {
                setErrorMessage('Anggota Sudah ada didalam Tim');
                setShowSnackbar1(true);
            }
        } catch (error) {
            console.error('Error adding member:', error);
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
                <DialogTitle mb={2}>Tambahkan Member</DialogTitle>
                <DialogContent>
                    <Autocomplete
                        id="user-search"
                        options={users}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Pilih Member" variant="outlined" />}
                        value={selectedUser}
                        onChange={(event, newValue) => {
                            setSelectedUser(newValue as User);
                        }}
                        renderOption={(props, option) => (
                            <div key={option.nip} {...props as React.HTMLProps<HTMLDivElement>}>
                                {option.name}
                            </div>
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: '#5A6A85' }} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant='contained' onClick={handleAddMemberAction}>Tambahkan</Button>
                </DialogActions>

                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={showSnackbar1}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose1}
                >
                    <Alert elevation={6} variant="filled" severity="error">
                        {errorMessage}
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
                    Anggota berhasil ditambahkan
                </Alert>
            </Snackbar>
        </div>
    );
};

export default FormcreatememberDialog;
