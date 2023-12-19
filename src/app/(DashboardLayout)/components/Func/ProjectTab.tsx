import * as React from 'react';
import { Box, Button, Grid, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import ArticleIcon from '@mui/icons-material/Article';
import MenuIcon from '@mui/icons-material/Menu';
import Tasksubtask from '../../sample-page/contoh1';

export type Tab = {
    label: string;
    content: JSX.Element;
};

export const Projecttab = (): Tab[] => {

    return [
        {
            label: 'project Loteree',
            content: (
                <Box sx= {{ width: 1300,height: 660 }}>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h2">
                            Team Pengembangan
                        </Typography>
                        <Typography variant="subtitle1">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </Typography>
                    </Box>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 1 }}>
                        <Typography variant="h5">
                            List Task
                        </Typography>
                    </Box>
                <Tasksubtask />
                </Box >   
            ),
        },
        {
            label: 'project alpha',
            content: (
                <Box sx={{ width: 1300, height: 660 }}>
                    <Typography variant="h2">
                        Team Loteree
                    </Typography>
                    <Typography variant="subtitle1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>
                    <Tasksubtask />
                </Box >//codenya ditaruh disini    
            ),
        },
        {
            label: 'project beta',
            content: (
                <Box sx={{ width: 1300, height: 660 }}>
                    <Typography variant="h2">
                        Team Protektor
                    </Typography>
                    <Typography variant="subtitle1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>
                    <Tasksubtask />
                </Box >//codenya ditaruh disini    
            ),
        },
        {
            label: 'project gamma',
            content: (
                <Box sx={{ width: 1300, height: 660 }}>
                    <Typography variant="h2">
                        Team Protektor
                    </Typography>
                    <Typography variant="subtitle1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>
                    <Tasksubtask />
                </Box >//codenya ditaruh disini    
            ),
        },
        {
            label: 'project echo',
            content: (
                <Box sx={{ width: 1300, height: 660 }}>
                    <Typography variant="h2">
                        Team Loteree
                    </Typography>
                    <Typography variant="subtitle1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>
                    <Tasksubtask />
                </Box >//codenya ditaruh disini    
            ),
        },
        {
            label: 'project delta',
            content: (
                <Box sx={{ width: 1300, height: 660 }}>
                    <Typography variant="h2">
                        Team Protektor
                    </Typography>
                    <Typography variant="subtitle1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>
                    <Tasksubtask />
                </Box >//codenya ditaruh disini    
            ),
        },
        {
            label: 'project jarvis',
            content: (
                <Box sx={{ width: 1300, height: 660 }}>
                    <Typography variant="h2">
                        Team Loteree
                    </Typography>
                    <Typography variant="subtitle1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>
                    <Tasksubtask />
                </Box >//codenya ditaruh disini    
            ),
        },
        {
            label: 'project egg',
            content: (
                <Box sx={{ width: 1300, height: 660 }}>
                    <Typography variant="h2">
                        Team Protektor
                    </Typography>
                    <Typography variant="subtitle1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>
                    <Tasksubtask />
                </Box >//codenya ditaruh disini    
            ),
        },
        {
            label: 'project ghost',
            content: (
                <Box sx={{ width: 1300, height: 660 }}>
                    <Typography variant="h2">
                        Team Loteree
                    </Typography>
                    <Typography variant="subtitle1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>
                    <Tasksubtask />
                </Box >//codenya ditaruh disini    
            ),
        },
        {
            label: 'project hawaii',
            content: (
                <Box sx={{ width: 1300, height: 660 }}>
                    <Box sx={{mb:3}}>
                    <Typography variant="h2">
                        Team Pengembangan
                    </Typography>
                    <Typography variant="subtitle1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>
                    </Box>
                    <Box sx={{borderBottom:1, borderColor:'divider', mb:1}}>
                        <Typography variant="h5">
                            List Task
                        </Typography>
                    </Box>
                    <Tasksubtask />
                </Box >   
            ),
        },
    ];
};

export default Projecttab;
