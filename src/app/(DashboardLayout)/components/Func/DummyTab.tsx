import * as React from 'react';
import { Box, Button, Grid, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import ArticleIcon from '@mui/icons-material/Article';
import MenuIcon from '@mui/icons-material/Menu';
import FormcreatememberDialog from '../modal/Member/cMember';
import FormdeletememberDialog from '../modal/Member/dMember';
import FormcreateprojectDialog from '../modal/Project/cProject';
import FormsdeleteprojectDialog from '../modal/Project/dProject';
import { useState, useEffect } from 'react';
import { getTeam ,getMemberByIdTeam,getProjectByIdTeam} from '@/app/api/team/route';

export type Tab = {
    idTim: number;
    label: string;
    content: JSX.Element;
};


export const Dummytab = (): Tab[] => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorE2, setAnchorE2] = React.useState<null | HTMLElement>(null);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogOpen1, setDialogOpen1] = React.useState(false);
    const [dialogOpen2, setDialogOpen2] = React.useState(false);
    const [dialogOpen3, setDialogOpen3] = React.useState(false);
    
    const handleOpenDialog = () => {setDialogOpen(true);};
    const handleCloseDialog = () => {setDialogOpen(false);};

    const handleOpenDialog1 = () => { setDialogOpen1(true); };
    const handleCloseDialog1 = () => { setDialogOpen1(false); };

    const handleOpenDialog2 = () => { setDialogOpen2(true); };
    const handleCloseDialog2 = () => { setDialogOpen2(false); };

    const handleOpenDialog3 = () => { setDialogOpen3(true); };
    const handleCloseDialog3 = () => { setDialogOpen3(false); };

    const open = Boolean(anchorEl);
    const open2 = Boolean(anchorE2);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorE2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorE2(null);
    };

    const [idTim, setIdTim] = useState<number>(1);
    const [Maker, setMaker] = useState<any[]>([]);
    const [teamName, setTeamName] = useState<string[]>([]);
    const [members, setMembers] = useState<string[]>([]);
    const [projects, setProjects] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const teamData = await getTeam();
                const idTeam = teamData[0]?.idTim;

                const memberData = await getMemberByIdTeam(idTeam);
                const projectData = await getProjectByIdTeam(idTeam);
                setMembers(memberData.map((member: any) => member.user.name));
                setProjects(projectData.map((project: any) => project.projectName));
                setMaker(teamData)
                const teamNames = teamData.map((item: { namaTim: string }) => item.namaTim);
                setTeamName(teamNames); 
                setIdTim(idTeam);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error
            }
        };

        fetchData();
    }, [idTim]);

    return teamName.map((teamName, index) => ({
            idTim: index,
            label: teamName,
            content: (
                <Box 
                key={index}
                sx={{
                    width: 1300,
                    height: 660
                }}>
                    <Typography variant="h2">
                        Team {teamName}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom sx={{ mb: 2 }}>
                        Dibuat oleh {Maker[0]?.user.name}
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={4} sx={{ width: '50%' }}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottom: 1,
                                borderColor: 'divider',
                                pr: 1,
                            }}>
                                <Typography variant="h4" sx={{ mb: 1 }}>
                                    <GroupsIcon sx={{ mr: 2, ml: 2, mt: 1 }} />
                                    Anggota
                                </Typography>
                                <Button onClick={handleClick}>
                                    <MenuIcon />
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handleOpenDialog}>Tambah Member</MenuItem>
                                    <MenuItem onClick={handleOpenDialog1}>Hapus Member</MenuItem>
                                </Menu>
                            </Box>
                            <List dense={true} sx={{ maxHeight: 538, overflow: 'auto' }}>
                                {members.map((member, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={member} />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>

                        <Grid item xs={6} sx={{ width: '50%' }}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottom: 1,
                                borderColor: 'divider',
                                pr: 1,
                            }}>
                                <Typography variant="h4" sx={{ mb: 1 }}>
                                    <ArticleIcon sx={{ mr: 2, ml: 2, mt: 1 }} />
                                    Proyek
                                </Typography>
                                <Button onClick={handleClick2}>
                                    <MenuIcon />
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorE2}
                                    open={open2}
                                    onClose={handleClose2}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handleOpenDialog2}>Buat Projek</MenuItem>
                                    <MenuItem onClick={handleOpenDialog3}>Hapus Projek</MenuItem>
                                </Menu>
                            </Box>
                            <List sx={{ maxHeight: 538, overflow: 'auto' }}>
                                    {projects.map((project, index) => (
                                    <ListItemButton key={index}>
                                        <ListItemText primary={project} primaryTypographyProps={{ variant: 'h6' }} />
                                    </ListItemButton>
                                ))}
                            </List>
                        </Grid>
                    </Grid>
                <FormcreatememberDialog open={dialogOpen} handleClose={handleCloseDialog} />
                <FormdeletememberDialog open={dialogOpen1} handleClose={handleCloseDialog1} />
                <FormcreateprojectDialog open={dialogOpen2} handleClose={handleCloseDialog2} />
                <FormsdeleteprojectDialog open={dialogOpen3} handleClose={handleCloseDialog3} />

                </Box>
            )
        }
    )
)
}
        
export default Dummytab;
