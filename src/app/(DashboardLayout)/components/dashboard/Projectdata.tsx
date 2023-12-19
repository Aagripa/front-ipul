"use client";
import { useState, useEffect, useRef } from "react";
import { Box, Button, Grid, List, ListItem, Typography, ListItemText, ListItemButton, Stack, IconButton, Tooltip, Collapse, ListSubheader, useTheme, styled, Divider, } from "@mui/material";
import { IconEdit, IconFiles, IconList, IconMessage2, IconPencilPlus, IconSubtask, IconTrash, } from "@tabler/icons-react";
import { getTeam } from "@/app/api/team/route";
import { getProject, getProjectByIdTeam } from "@/app/api/proyek/route";
import FormEditProjectDialog from "../modal/Project/eProject";
import FormcreatetaskDialog from "../modal/Task/cTask";
import { getTaskProject } from "@/app/api/task/route";
import FormedittaskDialog from "../modal/Task/eTask";
import FormcreatesubtaskDialog from "../modal/Subtask/cSubtask";
import DeleteTaskDialog from "../modal/Task/dTask";
import KomenDialog from "../modal/Task/komen";
import Cookies from "js-cookie";

type Project = {
    idProject: number;
    projectName: string;
    startDate: string;
    endDate: string;
    projectDesc: string;
    status: string;
    idTim: number;
    team: {
        idTim: number;
        namaTim: string;
        userId: string;
        createdAt: string;
        updatedAt: string;
    };
};

interface Task {
    id: string;
    name: string;
    forUser: string;
    forName: string;
    startDate: string;
    endDate: string;
    taskDesc: string;
    status: string;
    comment: string;
    teamId: string;
    projectId: string;
    memberId: string;
    parentId: string;
    subtasks?: Task[]
}

interface TaskListProps {
    task: Task;
    idProj: number;
    idTim: number;
    onTaskChange: (newTask: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ task, idProj, idTim, onTaskChange }) => {

    //trigger Tasklist
    const [Trig, setTrig] = useState('')

    useEffect(() => {
        onTaskChange(Trig);
    }, [Trig, onTaskChange]);

    //simpam id
    const [selectedTaskId, setSelectedTaskId] = useState<string>('');
    const [IDparent, setIDparent] = useState('')

    // formedittask
    const [openEditTaskDialog, setopenEditTaskDialog] = useState(false);
    const handleOpenEditTaskDialog = (task: Task) => {
        setSelectedTaskId(task.id);
        setopenEditTaskDialog(true);
        setTrig('1')
    };

    //komentask
    const [openKomenDialog, setOpenKomenDialog] = useState(false);
    const handleOpenKomenDialog = (task: Task) => {
        setSelectedTaskId(task.id)
        setOpenKomenDialog(true);
        setTrig('1')
    };

    //formcreatesubtask
    const [openCreateSubTaskDialog, setopenCreateSubTaskDialog] = useState(false);
    const handleOpenCreateSubTaskDialog = (task: Task) => {
        setIDparent(task.id)
        setopenCreateSubTaskDialog(true);
        setTrig('1')
    };

    //formdeletetask
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const handleOpenDeleteDialog = (task: Task) => {
        setSelectedTaskId(task.id)
        setOpenDeleteDialog(true);
        setTrig('1')
    };

    //untuk subtask
    const [showSubtasks, setShowSubtasks] = useState<boolean>(false);
    const toggleSubtasks = () => {
        setShowSubtasks((prev) => !prev);
    };

    return (
        <div>
            <List>
                <ListItem>
                    <Stack sx={{ width: "100%" }}>
                        <Box sx={{ borderRadius: 2, boxShadow: 2, p: 1 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Stack direction="row" sx={{ alignItems: "center" }}>
                                    <Typography variant="h4">{task.name}</Typography>
                                    <Tooltip title="Edit Task">
                                        <IconButton aria-label="delete" onClick={() => handleOpenEditTaskDialog(task)}>
                                            <IconEdit size="20" stroke="1.5" />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                                <Typography variant="subtitle2">{`${task.startDate} - ${task.endDate}`}</Typography>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start"
                            }}>
                                <Typography variant="subtitle2" mb="20px">
                                    untuk {task.forName ?? '-'}
                                </Typography>
                                <Box
                                    sx={{
                                        backgroundColor: (() => {
                                            switch (task.status) {
                                                case 'Pending':
                                                    return 'divider';
                                                case 'InProgress':
                                                    return '#FFAE1F';
                                                case 'Completed':
                                                    return '#13DEB9';
                                                default:
                                                    return ''; // warna default jika tidak ada yang cocok
                                            }
                                        })(),
                                        borderRadius: 5,
                                        px: 2,
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        color={task.status === 'Pending' ? 'black' : 'white'}
                                    >
                                        {task.status}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{
                                maxWidth: '100%'
                            }}>
                                <Typography variant="body1">
                                    {task.taskDesc}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    borderTop: 1,
                                    borderColor: "divider",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-end",
                                }}
                            >
                                <Box sx={{ marginLeft: "auto" }}>
                                    <Tooltip title="Lihat Komen">
                                        <IconButton aria-label="delete" onClick={() => handleOpenKomenDialog(task)}>
                                            <IconMessage2 size="20" stroke="1.5" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Tambah SubTask">
                                        <IconButton aria-label="delete" onClick={() => handleOpenCreateSubTaskDialog(task)}>
                                            <IconPencilPlus size="20" stroke="1.5" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Lihat SubTask">
                                        <IconButton
                                            aria-label="delete"
                                            onClick={toggleSubtasks}
                                        >
                                            <IconSubtask size="20" stroke="1.5" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Hapus Task">
                                        <IconButton
                                            sx={{ ml: 1 }}
                                            aria-label="delete"
                                            onClick={() => handleOpenDeleteDialog(task)}
                                        >
                                            <IconTrash size="20" stroke="1.5" color="#FA896B" />
                                        </IconButton>
                                    </Tooltip>

                                </Box>
                            </Box>

                            <Collapse in={showSubtasks} >
                                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: -2 }}>
                                    <Typography variant="h6">List Subtask</Typography>
                                </Box>
                                <TaskListContainer tasks={task.subtasks ?? []} IDProj={idProj} IDTim={idTim} />
                            </Collapse>
                        </Box>
                    </Stack>
                </ListItem>
                {/* ))} */}
            </List>
            <FormedittaskDialog
                open={openEditTaskDialog}
                handleClose={() => {
                    setopenEditTaskDialog(false), setTrig('2')
                }}
                teamId={idTim}
                id={selectedTaskId}
            />
            <FormcreatesubtaskDialog
                open={openCreateSubTaskDialog}
                handleClose={() => { setopenCreateSubTaskDialog(false), setTrig('2') }}
                teamId={idTim}
                projectId={idProj}
                parentId={IDparent}
            />
            <DeleteTaskDialog
                open={openDeleteDialog}
                handleClose={() => { setOpenDeleteDialog(false), setTrig('2') }}
                taskId={selectedTaskId}
            />
            <KomenDialog
                open={openKomenDialog}
                handleClose={() => { setOpenKomenDialog(false), setTrig('2') }}
                id={selectedTaskId}
            />
        </div>
    )
}

const TaskListContainer: React.FC<{ tasks: Task[]; IDProj: number; IDTim: number }> = ({ tasks, IDProj, IDTim }) => {
    const handleTaskChange = (newTask: string) => {
        console.log('New task in container:', newTask);
    };

    return (
        <List>
            {tasks.map((task) => (
                <TaskList key={task.id} task={task} idProj={IDProj} idTim={IDTim} onTaskChange={handleTaskChange} />
            ))}
        </List>
    )
};


const Projectsss: React.FC = () => {
    //tim
    const [datas, setDatas] = useState<Project[]>([]);
    const [Tasks, setTasks] = useState<Task[]>([])

    //untuk create task
    const [IDProj, setIDProj] = useState<number>(0)
    const [IDTim, setIDTim] = useState<number>(0)

    //definisi di grid kanan
    const [nameProjects, setNameProjects] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [projectDesc, setProjectDesc] = useState('')
    const [status, setStatus] = useState('')

    //formeditproject
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const handleOpenEditDialog = () => {
        setOpenEditDialog(true);
        setLoad('true')
    };

    //formcreatetask
    const [openCreateTaskDialog, setopenCreateTaskDialog] = useState(false);
    const handleOpenCreateTaskDialog = () => {
        setopenCreateTaskDialog(true);
        setLoad('true')
    };

    //trigger
    const [load, setLoad] = useState('false');
    const [load1, setLoad1] = useState('false');

    //tim
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const Res = await getProject();
                setDatas(Res);
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };
        fetchTeams();
    }, [load, load1]);

    //fungsi yang aktif kalau cookies ada value
    const IDprojectString = Cookies.get('IDSProject');
    const IDproject = IDprojectString ? parseInt(IDprojectString, 10) : 0; // Default to 0 if undefined

    useEffect(() => {
        const loadData = async () => {
            if (IDproject === null) {
                setSelectedProject(null)
            }
            else {
                try {
                    const resTask = await getTaskProject(IDproject);
                    setTasks(resTask);
                    setShowTask('1');
                    console.log('resTask:', resTask);
                } catch (error) {
                    console.error('Error fetching task data:', error);
                    console.log('Gagal');
                    setShowTask('');
                }
                setSelectedProject(IDproject);
                const selectedData = datas.find((data) => data.idProject === IDproject);
                console.log(selectedData)
                if (selectedData) {
                    setIDTim(selectedData.idTim ?? 0);
                    setNameProjects(selectedData.projectName ?? '');
                    setStartDate(selectedData.startDate ?? '');
                    setEndDate(selectedData.endDate ?? '');
                    setProjectDesc(selectedData.projectDesc ?? '');
                    setStatus(selectedData.status ?? '');
                    setIDProj(selectedData.idProject ?? 0);
                } else {
                    // Handle case when selectedData is not found
                    console.error(`Data with IDproject ${IDproject} not found.`);
                }
            };
        }
        loadData();
    }, [load, IDproject, datas]);

    //aktifin fungsi getProjectData
    const [selectedProject, setSelectedProject] = useState<number | null>(null)

    //panggil task
    const [showTask, setShowTask] = useState('')

    const handleValueProject = async (project: Project) => {
        setIDTim(project.idTim);
        setNameProjects(project.projectName);
        setStartDate(project.startDate);
        setEndDate(project.endDate);
        setProjectDesc(project.projectDesc);
        setStatus(project.status);
        setIDProj(project.idProject);

        // Check apakah proyek yang dipilih sudah sesuai dengan proyek yang sedang dibuka
        if (selectedProject !== project.idProject) {
            setSelectedProject(project.idProject);
            try {
                const resTask = await getTaskProject(project.idProject)
                setTasks(resTask)
                setShowTask('1')
                console.log('resTask:', resTask)
            } catch (error) {
                console.error('Error fetching task data:', error);
                console.log('Gagal')
                setShowTask('')
            }
        }
        Cookies.set('IDSProject', project.idProject.toString()); // expires: 7 days (adjust as needed)
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (IDProj) {
                    const resTask = await getTaskProject(IDProj);
                    setTasks(resTask);
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchData();
    }, [IDProj]);

    const groupByTeam = (projects: Project[]) => {
        const grouped: { [key: number]: Project[] } = {};
        projects.forEach((project) => {
            const teamId = project.team.idTim;
            if (!grouped[teamId]) {
                grouped[teamId] = [];
            }
            grouped[teamId].push(project);
        });
        return grouped;
    };

    const groupedProjects = groupByTeam(datas);

    //theme list
    const theme = useTheme();
    const ListItemStyled = styled(ListItem)(() => ({
        padding: 0,
        ".MuiButtonBase-root": {
            borderRadius: "8px",
            marginBottom: "3px",
            marginRight: "8px",
            marginLeft: "8px",
            marginTop: '3px',
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

    const buildHierarchy = (tasks: Task[], parentId: string | null = null) => {
        const taskMap: { [id: string]: Task } = {};
        const rootTasks: Task[] = [];

        tasks.forEach((task) => {
            taskMap[task.id] = task;

            if (task.parentId === parentId) {
                // Task is a child of the specified parent
                const subtasks = buildHierarchy(tasks, task.id);
                if (subtasks.length > 0) {
                    task.subtasks = subtasks;
                }
                rootTasks.push(task);
            }
        });

        return rootTasks;
    };
    const rootTasks = buildHierarchy(Tasks);

    return (
        <div>
            <Grid container>
                {/* grid kiri */}
                <Grid item xs={2} sx={{ border: 1, borderColor: 'divider', borderRadius: 3 }}>
                    <Box sx={{ py: 2, borderRadius: 3, backgroundColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h6" fontSize={15}>PROJECT LIST</Typography>
                    </Box>
                    <List sx={{
                        overflow: 'auto',
                        maxHeight: 720,
                    }}>
                        {Object.keys(groupedProjects).map((teamId) => (
                            <Grid item xs={12} md={12} lg={12} key={teamId}>
                                <Box sx={{ py: 1, pl: 1, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
                                    <Typography variant="h6" fontSize={15}>{groupedProjects[Number(teamId)][0].team.namaTim}</Typography>
                                </Box>
                                {groupedProjects[Number(teamId)]
                                    .sort((a, b) => a.projectName.localeCompare(b.projectName))
                                    .map((project) => (
                                        <>
                                            <ListItemStyled>
                                                <ListItemButton

                                                    key={project.idProject}
                                                    onClick={() => handleValueProject(project)}
                                                    selected={selectedProject === project.idProject}
                                                >
                                                    <ListItemText primary={project.projectName} />
                                                </ListItemButton>
                                            </ListItemStyled>
                                            <Divider variant="middle" />
                                        </>
                                    ))}

                            </Grid>
                        ))}
                    </List>
                </Grid>

                {/* grid kanan */}
                <Grid item xs={10} sx={{
                    border: 1, borderColor: "divider", borderRadius: 3, p: 1,
                    overflow: 'auto',
                    maxHeight: 770
                }}>
                    {nameProjects ? (
                        <>
                            <Box sx={{ px: 1 }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Stack direction="row" spacing={1}>
                                        <Typography variant="h2">{nameProjects}</Typography>
                                        <Tooltip title="Edit Project">
                                            <IconButton onClick={() => handleOpenEditDialog()}>
                                                <IconEdit size="30" stroke="1.5" />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                    <Typography variant="h6">{`${startDate} - ${endDate}`}</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography variant="subtitle1">{projectDesc}</Typography>
                                    <Box
                                        sx={{
                                            backgroundColor: (() => {
                                                switch (status) {
                                                    case 'Pending':
                                                        return 'divider';
                                                    case 'InProgress':
                                                        return '#FFAE1F';
                                                    case 'Completed':
                                                        return '#13DEB9';
                                                    default:
                                                        return ''; // warna default jika tidak ada yang cocok
                                                }
                                            })(),
                                            borderRadius: 5,
                                            px: 2,
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            color={status === 'Pending' ? 'black' : 'white'}
                                        >
                                            {status}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{ my: 4 }}>
                                <Box
                                    sx={{
                                        borderBottom: 1,
                                        borderColor: "divider",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        mb: '3px'
                                    }}
                                >
                                    <Box sx={{ display: 'flex' }}>
                                        <IconFiles />
                                        <Typography variant="h5" gutterBottom sx={{ ml: 1 }}>
                                            List Task
                                        </Typography>
                                    </Box>
                                    <Box mb='5px'>
                                        <Button size='small' variant="contained" color="primary" sx={{ mr: 1 }} onClick={() => handleOpenCreateTaskDialog()}>
                                            Buat Task
                                        </Button>
                                    </Box>
                                </Box>
                                {/* grid kanan bagian task*/}
                                {showTask ? (
                                    <>
                                        <Box>
                                            {rootTasks.map((rootTask) => (
                                                <TaskList key={rootTask.id} task={rootTask} idProj={IDProj} idTim={IDTim} onTaskChange={(newTask) => setLoad1(newTask)} />
                                            ))}
                                        </Box>
                                    </>
                                ) : (
                                    <Box sx={{
                                        height: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Typography variant="subtitle1" align='center'>
                                            Project ini belum memiliki task
                                        </Typography>
                                    </Box>
                                )}
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
                                Silakan Pilih Project Anda
                            </Typography>
                        </Box>
                    )}
                </Grid>
            </Grid>



            <FormEditProjectDialog
                open={openEditDialog}
                handleClose={() => { setOpenEditDialog(false); setLoad('false') }}
                projectId={IDProj}
                initialProjectData={
                    IDProj
                        ? {
                            projectName: nameProjects,
                            startDate: startDate,
                            endDate: endDate,
                            projectDesc: projectDesc,
                            status: status,
                        }
                        : { projectName: '', startDate: '', endDate: '', projectDesc: '', status: '' }
                }
            />

            <FormcreatetaskDialog
                open={openCreateTaskDialog}
                handleClose={() => {
                    setopenCreateTaskDialog(false);
                    setLoad('false');
                }}
                teamId={IDTim}
                projectId={IDProj}
            />
        </div>
    );
};
export default Projectsss;