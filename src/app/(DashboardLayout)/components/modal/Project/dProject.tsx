import * as React from 'react';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import { deleteProjectById, getProjectByIdTeam } from '@/app/api/proyek/route';
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/navigation';

interface ProjectOption {
    label: string;
    value: number;
}

interface FormdeleteprojectDialogProps {
    open: boolean;
    handleClose: () => void;
    idTim: string;
}

const FormdeleteprojectDialog: React.FC<FormdeleteprojectDialogProps> = ({
    open,
    handleClose,
    idTim,
}) => {
    const [projectOptions, setProjectOptions] = React.useState<ProjectOption[]>([]);
    const [selectedValue, setSelectedValue] = React.useState<ProjectOption | null>(null);
    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const projectData = await getProjectByIdTeam(idTim);
                if (projectData && projectData.length > 0) {
                    const formattedProject = projectData.map((item: any) => ({
                        label: item.projectName,
                        value: item.idProject,
                    }));
                    setProjectOptions(formattedProject);
                }
            } catch (error) {
                console.error('Error fetching member data:', error);
            }
        };
        fetchProjectData();
    }, [idTim]);

    const handleDelete = async () => {
        if (selectedValue) {
            try {
                await deleteProjectById(selectedValue.value);
                setShowSnackbar(true);
                setSelectedValue(null)
                router.refresh();
                handleClose();
            } catch (error) {
                console.error('Error deleting member:', error);
            }
        }
    };

    const handleSnackbarClose = () => {
        setShowSnackbar(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle mb={2}>Pilih Project yang ingin dihapus</DialogTitle>
                <DialogContent>
                    <Autocomplete
                        options={projectOptions}
                        getOptionLabel={(option) => option.label}
                        value={selectedValue}
                        onChange={(event, newValue) => {
                            setSelectedValue(newValue as ProjectOption | null);
                        }}
                        renderInput={(params) => <TextField {...params} label="Pilih Project" />}
                    />
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: '#5A6A85' }} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant='contained' color='error' onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={showSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert elevation={6} variant="filled" severity="success">
                    Project telah dihapus
                </Alert>
            </Snackbar>
        </div>
    );
};

export default FormdeleteprojectDialog;
