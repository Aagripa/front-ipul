'use client'
import { useState, useEffect, useRef } from 'react';
import { Box, Button, Grid, List, ListItem, Typography, ListItemText, ListItemButton, useTheme, styled, Stack, Popper, Paper, IconButton, Tooltip, Popover, Divider } from '@mui/material';
import { getTeam } from '@/app/api/team/route';
import { getMemberByIdTeam, postMemberByIdTeam } from '@/app/api/member/route';
import { getProjectByIdTeam } from '@/app/api/proyek/route';
import FormcreateteamDialog from '@/app/(DashboardLayout)/components/modal/Team/cTeam';
import FormeditteamDialog from '../modal/Team/eTeam';
import FormdeleteteamDialog from '@/app/(DashboardLayout)/components/modal/Team/dTeam';
import FormcreatememberDialog from '../modal/Member/cMember';
import FormdeletememberDialog from '../modal/Member/dMember';
import FormcreateprojectDialog from '../modal/Project/cProject';
import FormdeleteprojectDialog from '../modal/Project/dProject';
import { useRouter } from 'next/navigation';
import { IconAlbum, IconEdit, IconTrash, IconUserPlus, IconUsersGroup } from '@tabler/icons-react';
import Cookies from 'js-cookie';


type TimData = {
    idTim: string;
    namaTim: string;
};

type member = {
    name: string
    email: string
    nip: string
}

type proyek = {
    idProject: number;
    projectName: string
    projectDesc: string
    startDate: string
    endDate: string
}

let IDSProject = 0;

const Index = () => {

    const [timList, setTimList] = useState<TimData[]>([]);
    const [projects, setProjects] = useState<proyek[]>([]);
    const [anggota, setAnggota] = useState<member[]>([]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogOpen1, setDialogOpen1] = useState(false);
    const [dialogOpen2, setDialogOpen2] = useState(false);
    const [dialogOpen3, setDialogOpen3] = useState(false);
    const [dialogOpen4, setDialogOpen4] = useState(false);
    const [dialogOpen5, setDialogOpen5] = useState(false);
    const [dialogOpen6, setDialogOpen6] = useState(false);

    const [selectedTeam, setSelectedTeam] = useState(null);
    const [teamName, setTeamName] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    const [selectedIdTim, setSelectedIdTim] = useState<string | null>(null);
    const router = useRouter();


    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleDialogOpen1 = () => {
        setDialogOpen1(true);
    };
    const handleDialogClose1 = () => {
        setDialogOpen1(false);
    };

    const handleDialogOpen2 = () => {
        setDialogOpen2(true);
    };
    const handleDialogClose2 = () => {
        setDialogOpen2(false);
    };

    const handleDialogOpen3 = () => {
        setDialogOpen3(true);
    };
    const handleDialogClose3 = () => {
        handlePopoverClose()
        setDialogOpen3(false);
    };

    const handleDialogOpen4 = () => {
        setDialogOpen4(true);
    };
    const handleDialogClose4 = () => {
        setDialogOpen4(false);
    };

    const handleDialogOpen5 = () => {
        setDialogOpen5(true);
    };
    const handleDialogClose5 = () => {
        setDialogOpen5(false);
    };

    const handleDialogOpen6 = () => {
        setDialogOpen6(true);
    };
    const handleDialogClose6 = () => {
        setDialogOpen6(false);
    };

    const theme = useTheme();
    const ListItemStyled = styled(ListItem)(() => ({
        padding: 0,
        ".MuiButtonBase-root": {
            borderRadius: "8px",
            marginBottom: "5px",
            marginRight: "8px",
            marginLeft: "8px",
            "&:hover": {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.main,
            },
            "&.Mui-selected": {
                color: "white",
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                },
            },
        },
    }));

    const getTimData = async (idtim: string) => {
        try {
            const projectData = await getProjectByIdTeam(idtim);
            setProjects(projectData);

            const memberData = await getMemberByIdTeam(idtim);
            if (memberData && memberData.length > 0) {
                const formattedAnggotaData = memberData.map((item: any) => {
                    return {
                        nip: item.user.nip,
                        name: item.user.name,
                        email: item.user.email
                    };
                });
                setAnggota(formattedAnggotaData);
                console.log(projects)
            } else {
                setAnggota([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAddMember = async (idtim: string, memberId: string) => {
        try {
            return await postMemberByIdTeam(idtim, memberId);
        } catch (error) {
            console.error('Error adding member:', error);
            throw error; // Melempar kembali error
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const teamData = await getTeam();
                setTimList(teamData);
                if (teamData.length > 0) {
                    const selectedTim = teamData.find((tim: any) => tim.idTim === selectedTeam);

                    if (selectedTeam) {
                        setTeamName(selectedTim.namaTim);
                        setCreatedBy(selectedTim.user.name);
                        await getTimData(selectedTeam);

                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [dialogOpen, dialogOpen1, dialogOpen2, dialogOpen3, dialogOpen4, dialogOpen5, dialogOpen6]);

    const handleListItemClick = (tim: any) => {
        setSelectedTeam(tim.idTim);
        setTeamName(tim.namaTim);
        setCreatedBy(tim.user.name);
        getTimData(tim.idTim);
        setSelectedIdTim(tim.idTim);
    };

    // set informasi popper
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedMember, setSelectedMember] = useState<member | null>(null);

    const handlePopoverOpen = (item: member, event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
        setSelectedMember(item);
    };

    const openPopover = Boolean(anchorEl);

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setSelectedMember(null);
    };

    const handleLinkProject = (projects: proyek) => {
        IDSProject = projects.idProject;
        Cookies.set('IDSProject', IDSProject.toString());
        router.push(`/project-page?idProject=${IDSProject}`);
    }

    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pl: 0, mb: '3px' }}>
                <Box mb='5px'>
                    <Button variant="contained" color="primary" onClick={handleDialogOpen} sx={{ mr: 1 }}>
                        Buat Tim
                    </Button>
                    <Button variant="contained" color="error" onClick={handleDialogOpen1}>
                        Hapus Tim
                    </Button>
                </Box>
            </Box>
            <Grid container>
                {/* ini untuk grid kiri */}
                <Grid item xs={2} sx={{ border: 1, borderColor: 'divider', borderRadius: 3 }}>
                    <Box sx={{ py: 2, borderRadius: 3, backgroundColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h6" fontSize={15}>TEAM LIST</Typography>
                    </Box>
                    <List sx={{
                        overflow: 'auto',
                        maxHeight: 720,
                    }}>
                        {timList.map((tim) => (
                            <>
                                <ListItemStyled>
                                    <ListItemButton
                                        key={tim.idTim}
                                        selected={selectedTeam === tim.idTim} // Menandai item yang dipilih
                                        onClick={() => handleListItemClick(tim)}
                                    // sx={{ mt: '2px' }}
                                    >
                                        <ListItemText primary={tim.namaTim} />
                                    </ListItemButton>
                                </ListItemStyled>
                                <Divider variant="middle" sx={{ mb: '4px' }} />
                            </>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={10} sx={{
                    p: 1, border: 1, borderColor: 'divider', borderRadius: 3, overflow: 'auto',
                    maxHeight: 720,
                }}>
                    {/* grid kanan */}
                    {teamName ? (
                        <>
                            <Box sx={{ mb: 2 }}>
                                <Stack direction='row' spacing={1}>
                                    <Typography variant="h2">
                                        {teamName ? teamName : "-"}
                                    </Typography>
                                    <Tooltip title="Edit Tim">
                                        <IconButton onClick={() => handleDialogOpen6()}>
                                            <IconEdit size="30" stroke="1.5" />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                                <Typography variant="subtitle1" gutterBottom>
                                    Dibuat Oleh {createdBy ? createdBy : "-"}
                                </Typography>
                            </Box>
                            <Box >
                                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <IconUsersGroup />
                                    <Typography variant="h5" gutterBottom sx={{ ml: 1 }}>
                                        Anggota Tim
                                    </Typography>
                                </Box>
                                <Box sx={{ border: 1, borderColor: "divider", borderRadius: 2, p: 1, width: '100%', maxHeight: '150px', overflowY: 'auto' }}>
                                    <Stack
                                        direction='row'
                                        alignItems="flex-start"
                                        spacing={1}
                                        sx={{ flexWrap: 'wrap' }}

                                    >
                                        <Box
                                            sx={{
                                                borderRadius: 5,
                                                border: 2,
                                                borderColor: "divider",
                                                borderStyle: 'dashed',
                                            }}>
                                            <Tooltip title="tambah Anggota">
                                                <IconButton onClick={handleDialogOpen2}>
                                                    <IconUserPlus size={20} />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>

                                        {anggota.length > 0 ? (
                                            anggota.map((item, index) => (
                                                <div key={index}>
                                                    <Button
                                                        sx={{
                                                            color: 'black',
                                                            boxShadow: 1,
                                                            borderRadius: 2,
                                                            p: '5px',
                                                            backgroundColor: 'divider',
                                                            transition: 'transform 0.1s', // Menambahkan efek transisi
                                                            '&:hover': {
                                                                transform: 'scale(1.05)',
                                                                backgroundColor: '#539BFF',
                                                                color: 'white',
                                                            },
                                                        }}
                                                        onClick={(event) => handlePopoverOpen(item, event)}
                                                    >
                                                        <Typography variant='subtitle1'>{item.name}</Typography>
                                                    </Button>

                                                </div>

                                            ))
                                        ) : (
                                            <ListItem>
                                                <ListItemText primary="Tidak ada anggota untuk tim ini." />
                                            </ListItem>
                                        )}

                                    </Stack>
                                    <Popover
                                        open={openPopover}
                                        anchorEl={anchorEl}
                                        onClose={handlePopoverClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                    >
                                        {selectedMember && (
                                            <Paper elevation={1} variant="outlined" sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Box>
                                                    <Typography variant='h6'>{selectedMember.name}</Typography>
                                                    <Typography variant='subtitle1'>{selectedMember.email}</Typography>
                                                </Box>
                                                <IconButton onClick={handleDialogOpen3}>
                                                    <IconTrash color='#FA896B' />
                                                </IconButton>
                                            </Paper>
                                        )}
                                    </Popover>
                                </Box>
                            </Box>
                            <Box mt={2}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '3px' }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <IconAlbum />
                                        <Typography variant="h5" gutterBottom sx={{ ml: 1 }}>
                                            Project Tim
                                        </Typography>
                                    </Box>
                                    <Box mb='2px'>
                                        <Button size="small" variant="contained" color="primary" onClick={handleDialogOpen4} sx={{ mr: 1 }}>
                                            Buat Project
                                        </Button>
                                        <Button size="small" variant="contained" color="error" onClick={handleDialogOpen5}>
                                            Hapus Project
                                        </Button>
                                    </Box>
                                </Box>
                                <List sx={{ border: 1, borderColor: "divider", borderRadius: 2, px: 1 }}>
                                    <Box sx={{ maxHeight: '450px', overflowY: 'auto' }}>
                                        {projects.length > 0 ? (
                                            projects.map((project, index) => (
                                                <ListItem key={index} disablePadding={true}>
                                                    <Box sx={{ width: '100%', p: 1, borderRadius: 3, boxShadow: 2, mb: 1 }}>
                                                        <Box sx={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                        }}>
                                                            <Typography variant='h5'>{project.projectName}</Typography>
                                                            <Typography variant='h6'>{`${project.startDate} - ${project.endDate}`}</Typography>
                                                        </Box>
                                                        <Box sx={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                        }}>
                                                            <Box sx={{ width: '80%' }}>
                                                                <Typography variant='subtitle1'>{project.projectDesc}</Typography>
                                                            </Box>
                                                            <Button size="small" onClick={() => handleLinkProject(project)}>
                                                                Lihat Selengkapya
                                                            </Button>
                                                        </Box>
                                                    </Box>
                                                </ListItem>
                                            ))
                                        ) : (
                                            <ListItem>
                                                <ListItemText primary="Tidak ada proyek untuk tim ini." />
                                            </ListItem>
                                        )}
                                    </Box>
                                </List>
                            </Box>
                        </>
                    ) : (
                        <Box sx={{
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Typography variant="h4" align='center'>
                                Silakan Pilih Tim
                            </Typography>
                        </Box>
                    )
                    }
                </Grid>
            </Grid>
            <FormcreateteamDialog open={dialogOpen} handleClose={handleDialogClose} />
            <FormeditteamDialog open={dialogOpen6} handleClose={handleDialogClose6} teamId={selectedIdTim ? selectedIdTim : ""} teamName={teamName} />
            <FormdeleteteamDialog open={dialogOpen1} handleClose={handleDialogClose1} />

            <FormcreatememberDialog open={dialogOpen2} handleClose={handleDialogClose2} handleAddMember={handleAddMember} idtim={selectedIdTim ? selectedIdTim : ""} />

            <FormdeletememberDialog
                open={dialogOpen3}
                handleClose={handleDialogClose3}
                idTim={selectedIdTim ? selectedIdTim : ""}
                NIP={selectedMember?.nip}
                NAMA={selectedMember?.name}
            />

            <FormcreateprojectDialog open={dialogOpen4} handleClose={handleDialogClose4} idTim={selectedIdTim ? selectedIdTim : ""} />
            <FormdeleteprojectDialog open={dialogOpen5} handleClose={handleDialogClose5} idTim={selectedIdTim ? selectedIdTim : ""} />
        </div>
    );
}


export default Index;
