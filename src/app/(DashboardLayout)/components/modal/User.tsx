import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, AlertColor, AlertTitle, Avatar, Badge, Box, Menu, MenuItem, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { GetProfil, getAvatar, putUser, putAvatar, postAvatar, deleteAvatar, changePassword } from '@/app/api/user/route';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';


export default function AlertDialog({ open, handleClose }: { open: boolean; handleClose: () => void }) { // tambahkan ini
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [avatar, setAvatar] = useState("/images/profile/user-1.jpg");
    const [openChildDialog, setOpenChildDialog] = useState(false);
    const [openAvatarDialog, setOpenAvatarDialog] = useState(false);
    const [openAvatarEditDialog, setOpenAvatarEditDialog] = useState(false);
    const [openAvatarDeleteDialog, setOpenAvatarDeleteDialog] = useState(false);
    const [profile, setProfile] = useState({
        nip: '',
        nama: '',
        noHp: '',
        email: '',
        role: '',
        status: ''
    });



    const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false);

    const handleCloseChangePasswordDialog = () => {
        setOpenChangePasswordDialog(false);
    };

    const handleOpenChangePasswordDialog = () => {
        setOpenChangePasswordDialog(true);
    };

    const handleCloseAvatarDialog = () => {
        setOpenAvatarDialog(false);
    };
    const handleOpenAvatarDialog = () => {
        setOpenAvatarDialog(true);
    };
    const handleCloseAvatarEditDialog = () => {
        setOpenAvatarEditDialog(false);
    };
    const handleOpenAvatarEditDialog = () => {
        setOpenAvatarEditDialog(true);
    };
    const handleCloseAvatarDeleteDialog = () => {
        setOpenAvatarDeleteDialog(false);
    };
    const handleOpenAvatarDeleteDialog = () => {
        setOpenAvatarDeleteDialog(true);
    };
    const handleCloseChildDialog = () => {
        setOpenChildDialog(false);
    };
    const handleOpenChildDialog = () => {
        setOpenChildDialog(true);
    };


    const openmenu = Boolean(anchorEl);

    const menuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const menuClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const avatarData = await getAvatar();
                if (avatarData !== null) {
                    setAvatar(avatarData);
                }
                const profileData = await GetProfil();
                setProfile({
                    nip: profileData.nip,
                    nama: profileData.name,
                    noHp: profileData.nohp,
                    email: profileData.email,
                    role: profileData.role,
                    status: profileData.status
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth={true}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Profil Saya"}
                </DialogTitle>
                <Box sx={{ borderTop: 1, borderColor: "divider" }}>
                    <DialogContent>
                        <Stack my="15px" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Badge
                                onClick={menuClick}
                                overlap="circular"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                badgeContent={<EditIcon />}
                                color='primary'
                                sx={{

                                    position: 'flex',
                                    bottom: '10px',
                                    right: '10px',
                                    cursor: 'pointer',
                                    '& .MuiBadge-badge': {
                                        borderRadius: '50%',
                                        width: '30px',
                                        height: '30px',
                                        minWidth: '30px',
                                    },
                                }}
                            >
                                <Avatar
                                    src={avatar}
                                    alt="image"
                                    sx={{
                                        width: 150,
                                        height: 150,
                                    }}
                                />
                            </Badge>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={openmenu}
                                onClose={menuClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleOpenAvatarDialog}>Upload foto</MenuItem>
                                <MenuItem onClick={handleOpenAvatarEditDialog}>Edit Foto</MenuItem>
                                <MenuItem onClick={handleOpenAvatarDeleteDialog}>Hapus Foto</MenuItem>
                            </Menu>

                        </Stack>
                    </DialogContent>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 2 }}>
                    <Button color="primary" onClick={handleOpenChangePasswordDialog}>
                        Ganti Password
                    </Button>
                    <Button color="primary" onClick={handleOpenChildDialog}>Edit Profil</Button>
                </Box>

                <Box sx={{ borderTop: 1, borderBottom: 1, borderColor: "divider" }}>
                    <DialogContent>
                        <Stack mb="10px">
                            <Typography variant="h4">NIP :</Typography>
                            <Typography variant="subtitle1">{profile.nip}</Typography>
                        </Stack>
                        <Stack my="10px">
                            <Typography variant="h4">NAMA :</Typography>
                            <Typography variant="subtitle1">{profile.nama}</Typography>
                        </Stack>
                        <Stack my="10px">
                            <Typography variant="h4">NO HP :</Typography>
                            <Typography variant="subtitle1">{profile.noHp}</Typography>
                        </Stack>
                        <Stack my="10px">
                            <Typography variant="h4">EMAIL :</Typography>
                            <Typography variant="subtitle1">{profile.email}</Typography>
                        </Stack>
                    </DialogContent>
                </Box>
                <DialogActions>
                    <Button color="error" variant="contained" onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <ChildDialog open={openChildDialog} handleClose={handleCloseChildDialog} profile={profile} />
            <ChangePasswordDialog open={openChangePasswordDialog} handleClose={handleCloseChangePasswordDialog} />
            <AvatarDialog open={openAvatarDialog} handleClose={handleCloseAvatarDialog} />
            <AvatarEditDialog open={openAvatarEditDialog} handleClose={handleCloseAvatarEditDialog} />
            <AvatarDeleteDialog open={openAvatarDeleteDialog} handleClose={handleCloseAvatarDeleteDialog} />
        </div>
    );
}


type ChildDialogProps = {
    open: boolean;
    handleClose: () => void;
    profile: {
        nip: string;
        nama: string;
        noHp: string;
        email: string;
        role: string;
        status?: string
    };
};

export function ChildDialog({ open, handleClose, profile }: ChildDialogProps) {
    const [selectedRole, setSelectedRole] = useState(profile.role);
    const [editedProfile, setEditedProfile] = useState(profile);

    const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedRole(event.target.value);
        setEditedProfile({ ...editedProfile, role: event.target.value });
    };

    const handleProfileChange = (field: string, value: string) => {
        setEditedProfile({ ...editedProfile, [field]: value });
    };

    const router = useRouter()
    const handleSave = async () => {
        try {
            await putUser({
                nip: editedProfile.nip,
                name: editedProfile.nama,
                nohp: Number(editedProfile.noHp),
                email: editedProfile.email,
                role: selectedRole,
            });
            handleClose();
            router.refresh()
        } catch (error) {
            console.error('Error updating user data:', error);
            // Tangani kesalahan di sini
        }
    };

    useEffect(() => {
        setSelectedRole(profile.role);
        setEditedProfile(profile);
    }, [profile]);

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle>Edit Profil</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt="10px">
                    <TextField
                        disabled
                        label="NIP"
                        variant="outlined"
                        value={editedProfile.nip}
                        fullWidth
                    />
                    <TextField
                        label="Nama"
                        variant="outlined"
                        value={editedProfile.nama}
                        onChange={(e) => handleProfileChange('nama', e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="No HP"
                        variant="outlined"
                        value={editedProfile.noHp}
                        onChange={(e) => handleProfileChange('noHp', e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={editedProfile.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Role"
                        variant="outlined"
                        select
                        value={selectedRole}
                        onChange={handleRoleChange}
                        fullWidth
                    >
                        <MenuItem value="Super Admin">Super Admin</MenuItem>
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="User">User</MenuItem>
                    </TextField>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} sx={{ color: '#5A6A85' }}>
                    Batal
                </Button>
                <Button variant='contained' onClick={handleSave} color="primary">
                    Simpan
                </Button>
            </DialogActions>
        </Dialog>
    );
}

type AvatarDialogProps = {
    open: boolean;
    handleClose: () => void;
}

export function AvatarDialog({ open, handleClose }: AvatarDialogProps) {
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [alertOpen, setAlertOpen] = useState(false);

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const router = useRouter()
    const handleAvatarUpload = async () => {
        try {
            if (selectedFile) {
                await postAvatar(selectedFile);
                setAlertOpen(true);
                setTimeout(() => {
                    router.refresh();
                    handleClose();
                }, 2000);
            }

        } catch (error) {
            console.error('Failed to upload avatar', error);
            // Tangani kesalahan di sini
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Upload Foto</DialogTitle>
            <DialogContent>
                <input type="file" onChange={handleFileInputChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} sx={{ color: '#5A6A85' }}>
                    Batal
                </Button>
                <Button variant='contained' onClick={handleAvatarUpload} color="primary">
                    Upload
                </Button>
            </DialogActions>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertOpen} autoHideDuration={6000} onClose={() => setAlertOpen(false)}>
                <Alert elevation={6} variant="filled" severity="success">

                    Foto berhasil diunggah.
                </Alert>
            </Snackbar>
        </Dialog>
    );
}



type AvatarDialogEditProps = {
    open: boolean;
    handleClose: () => void;
}

export function AvatarEditDialog({ open, handleClose }: AvatarDialogEditProps) {
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [alertOpen, setAlertOpen] = useState(false);

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const router = useRouter();

    const handleAvatarEditUpload = async () => {
        try {
            if (selectedFile) {
                await putAvatar(selectedFile);
                setAlertOpen(true);
                setTimeout(() => {
                    router.refresh();
                    handleClose();
                }, 2000); // Menunda penutupan dialog setelah 1 detik
            }
        } catch (error) {
            console.error('Failed to upload avatar', error);
            // Tangani kesalahan di sini
        }
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Foto</DialogTitle>
            <DialogContent>
                <input type="file" onChange={handleFileInputChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} sx={{ color: '#5A6A85' }}>
                    Batal
                </Button>
                <Button variant='contained' onClick={handleAvatarEditUpload} color="primary">
                    Upload
                </Button>
            </DialogActions>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={alertOpen}
                autoHideDuration={6000}
                onClose={handleAlertClose}
            >
                <Alert elevation={6} variant="filled" severity="success">

                    Foto berhasil diunggah.
                </Alert>
            </Snackbar>
        </Dialog>
    );
}

type AvatarDialogDeleteProps = {
    open: boolean;
    handleClose: () => void;
}

export function AvatarDeleteDialog({ open, handleClose }: AvatarDialogDeleteProps) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [Teks, setTeks] = useState('')
    const [Tipe, setTipe] = useState<AlertColor | undefined>(undefined);

    const router = useRouter();

    const handleDeleteAvatar = async () => {
        try {
            const response = await deleteAvatar();
            if (!response.error) {
                setSnackbarOpen(true);
                setTeks('Berhasil menghapus foto')
                setTipe('success')
                setTimeout(() => {
                    router.refresh();
                    handleClose();
                }, 2000);
            } else {
                console.error('Failed to delete avatar:', response.error);
            }
        } catch (error) {
            console.error('Failed to delete avatar', error);
            setTeks('Tidak ada foto yang dapat dihapus')
            setTipe('error')
            setSnackbarOpen(true)
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Konfirmasi</DialogTitle>
            <DialogContent>
                <Typography variant="body1">
                    Apakah Anda yakin ingin menghapus foto profil Anda?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} sx={{ color: '#5A6A85' }}>
                    Batal
                </Button>
                <Button variant='contained' onClick={handleDeleteAvatar} color="error">
                    Hapus
                </Button>
            </DialogActions>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert elevation={6} variant="filled" severity={Tipe}>
                    {Teks}
                </Alert>
            </Snackbar>
        </Dialog>
    );


}

// ... kode sebelumnya

type ChangePasswordDialogProps = {
    open: boolean;
    handleClose: () => void;
}

export function ChangePasswordDialog({ open, handleClose }: ChangePasswordDialogProps) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor | undefined>('success');
    const router = useRouter();

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleChangePassword = async () => {
        try {
            const changePasswordData = {
                currentPassword: currentPassword,
                newPassword: newPassword
            };
            if (currentPassword === '') {
                setSnackbarMessage('Inputan tidak boleh kosong!');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            } else if (newPassword.length < 6) {
                setSnackbarMessage('Panjang password baru minimal 6 karakter');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            } else {
                const response = await changePassword(changePasswordData);
                if (response.status === 403) {
                    setSnackbarMessage(response.message);
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                } else if (response.error) {
                    setSnackbarMessage(response.error);
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                } else {
                    setSnackbarMessage('Password changed successfully');
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);
                    setTimeout(() => {
                        router.refresh();
                        handleClose();
                    }, 2000);
                }
            }
        } catch (error: any) {
            setSnackbarMessage('Terjadi kesalahan saat mengubah password');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            console.error('Error changing password:', error);
        }
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                <DialogTitle>Change Password</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt="10px">
                        <TextField
                            label="Current Password"
                            type="password"
                            variant="outlined"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="New Password"
                            type="password"
                            variant="outlined"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            fullWidth
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ color: '#5A6A85' }}>
                        Batal
                    </Button>
                    <Button variant='contained' onClick={handleChangePassword} color="primary">
                        Ubah Password
                    </Button>
                </DialogActions>
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert elevation={6} variant="filled" severity={snackbarSeverity}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Dialog>

        </div>
    );
}

// ... kode setelahnya
