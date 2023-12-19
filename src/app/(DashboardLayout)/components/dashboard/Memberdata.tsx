'use client'
import React, { useCallback, useMemo, useState, useEffect, SyntheticEvent } from 'react';
import {
  MaterialReactTable,
  type MaterialReactTableProps,
  type MRT_Cell,
  type MRT_ColumnDef,
  type MRT_Row,
} from 'material-react-table';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Select,
  Snackbar,
  Alert,
  AlertTitle,
  DialogContentText,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { getUser, postUser, putUser, deleteUser, postD } from '@/app/api/user/route';
import { useRouter } from 'next/navigation';

export type Persondata = {
  nip: string;
  name: string;
  nohp: number;
  email: string;
  password?: string;
  repassword?: string;
  role: string;
  status?: string;
};

const MemberData: React.FC = () => {
  const router = useRouter()
  const roles = ['Super Admin', 'Admin', 'User'];
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Persondata | null>(null);
  const [userData, setUserData] = useState<Persondata[]>([]); // Gunakan tipe yang sesuai
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getUser(); // Panggil fungsi datauser untuk mengambil data
        setUserData(response); // Mengatur data dari API ke dalam state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData(); // Panggil fungsi fetchData saat komponen dimuat
  }, [createModalOpen, editModalOpen]);

  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});

  const handleCreateNewRow = (values: Persondata) => {
    userData.push(values);
    setUserData([...userData]);
  };

  const handleSaveRowEdits: MaterialReactTableProps<Persondata>['onEditingRowSave'] =
    async ({ exitEditingMode, row, values }) => {
      if (!Object.keys(validationErrors).length) {
        userData[row.index] = values;
        await putUser(values);
        console.log('Berhasil mengubah data:');
        setUserData([...userData]);
        exitEditingMode(); //required to exit editing mode and close modal
      }
    };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarAction, setSnackbarAction] = useState<React.ReactNode | undefined>(undefined);
  const [snackbarContent, setSnackbarContent] = useState<React.ReactNode | undefined>(undefined);

  const handleDeleteRow = useCallback(
    async (row: MRT_Row<Persondata>) => {
      setSnackbarOpen(false); // Menutup Snackbar sebelum menampilkan pesan baru

      setSnackbarContent(
        <Dialog open={true} onClose={() => setSnackbarOpen(false)}>
          <DialogTitle id="alert-dialog-title">
            {`Apakah anda yakin ingin hapus ${row.getValue('name')} ?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Data yang dihapus tidak dapat dikembalikan.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ color: '#5A6A85' }}
              size="medium"
              onClick={() => {
                setSnackbarOpen(false);
              }}
            >
              Tidak
            </Button>
            <Button
              variant='contained'
              sx={{ mr: 1 }}
              color="error"
              size="medium"
              onClick={async () => {
                setSnackbarOpen(false);
                try {
                  const nipp: string = row.getValue('nip');
                  await deleteUser(nipp);
                  const updatedUserData = [...userData];
                  updatedUserData.splice(row.index, 1);
                  setUserData(updatedUserData);

                  setSnackbarContent(
                    <Alert severity="success">
                      Data for {row.getValue('name')} has been deleted
                    </Alert>
                  );

                  setSnackbarOpen(true); // Membuka Snackbar dengan pesan yang sesuai setelah penghapusan berhasil
                } catch (error) {
                  console.error('Error deleting data:', error);
                  setSnackbarContent(
                    <Alert severity="error">
                      <AlertTitle>Error deleting</AlertTitle>
                      User masih ada dalam team atau project
                    </Alert>
                  );

                  setSnackbarOpen(true); // Membuka Snackbar dengan pesan yang sesuai setelah terjadi error
                }
              }}
            >
              Ya
            </Button>
          </DialogActions>
        </Dialog>
      );

      setSnackbarOpen(true); // Membuka Snackbar dengan pesan yang sesuai
    },
    [userData, setSnackbarOpen, setSnackbarContent]
  );


  const getCommonEditTextFieldProps = useCallback(
    (
      cell: MRT_Cell<Persondata>,
    ): MRT_ColumnDef<Persondata>['muiTableBodyCellEditTextFieldProps'] => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === 'email'
              ? validateEmail(event.target.value)
              : cell.column.id === 'password'
                ? validateAge(+event.target.value)
                : validateRequired(event.target.value);
          if (!isValid) {
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors],
  );

  const datas = useMemo<MRT_ColumnDef<Persondata>[]>(
    () => [
      {
        accessorKey: 'nip',
        header: 'NIP',
        enableColumnOrdering: false,
        enableEditing: isEditMode, //disable editing on this column
        enableSorting: false,
        size: 150,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'nohp',
        header: 'NO.HP',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'role',
        header: 'Role',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
    ],
    [getCommonEditTextFieldProps, isEditMode],
  );

  const pass = useMemo<MRT_ColumnDef<Persondata>[]>(
    () => [
      {
        accessorKey: 'password',
        header: 'Password',
        enableHiding: false,
        enableEditing: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'repassword',
        header: 'Repassword',
        enableHiding: false,
        enableEditing: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
    ],
    [getCommonEditTextFieldProps],
  )

  const allColumns = useMemo<MRT_ColumnDef<Persondata>[]>(
    () => (isEditMode ? [...datas, ...pass] : datas), // Hanya tampilkan kolom pass saat di mode edit
    [datas, pass, isEditMode]
  );

  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 120,
          },
        }}
        columns={allColumns}
        data={userData}
        initialState={{ columnVisibility: { password: false, repassword: false } }}
        editingMode="modal" //default
        enableColumnOrdering
        positionActionsColumn="last"
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => {
                setSelectedRow(row.original);
                setEditModalOpen(true);
              }}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        muiTablePaperProps={{
          elevation: 0, //change the mui box shadow
          //customize paper styles
          sx: {
            borderRadius: '0',
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            backgroundColor: 'rgba(81, 81, 81, 0.1)'
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            borderBottom: '1px solid rgba(81, 81, 81, 0.1)',
          },
        }}
        muiTableBodyCellEditTextFieldProps={{
          variant: 'outlined'
        }}
        renderTopToolbarCustomActions={() => (
          <Button
            color="primary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            Tambah User
          </Button>
        )}
      />

      <CreateNewAccountModal
        columns={datas}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
      {selectedRow && (
        <EditAccountModal
          columns={datas}
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          initialData={selectedRow}
          onSubmit={handleCreateNewRow}
        />
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert icon={false} variant="outlined" severity="error" action={snackbarAction}>
          {snackbarContent}
        </Alert>
      </Snackbar>
    </>

  );
};

interface CreateModalProps {
  columns: MRT_ColumnDef<Persondata>[];
  onClose: () => void;
  onSubmit: (values: Persondata) => void;
  open: boolean;
}

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({
  open,
  columns,
  onClose,
  onSubmit
}: CreateModalProps) => {
  const [values, setValues] = useState<any>(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = '';
      return acc;
    }, {} as any),
  );

  const [selectedRole, setSelectedRole] = useState('');
  const [errorAlert, seterrorAlert] = useState(false)
  const [errorText, setErrorText] = useState("")
  const [openSnackbar, setOpenSnackbar] = useState(false);


  const router = useRouter()

  const handleSubmit = async () => {
    try {
      const response = await postUser({ ...values, role: selectedRole });

      if (!response.error) {
        console.log('Berhasil menyimpan data:');
        router.refresh()
        onSubmit(values);
        onClose()
      } else {
        setErrorText(response.error);
        seterrorAlert(true)
        setOpenSnackbar(true);
      }
    } catch (error) {
      setErrorText("Terdapat Kesalahan Input");
      seterrorAlert(true)
      setOpenSnackbar(true);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Buat User Baru</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
              mt: 1
            }}
          >
            {columns.map((column) => (
              <div key={column.accessorKey}>
                {column.accessorKey === 'role' ? (
                  <TextField
                    error={errorAlert}
                    label={column.header}
                    name={column.accessorKey}
                    select
                    value={selectedRole}
                    defaultValue="User"
                    onChange={(e) => {
                      setSelectedRole(e.target.value);
                      setValues({ ...values, role: e.target.value });
                      seterrorAlert(false);
                      setErrorText('');
                    }}
                    sx={{ width: '100%' }}
                  >
                    <MenuItem value="Super Admin">Super Admin</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="User">User</MenuItem>
                  </TextField>
                ) : (
                  <TextField
                    error={errorAlert}
                    key={column.accessorKey}
                    label={column.header}
                    name={column.accessorKey}
                    sx={{ width: '100%' }}
                    onChange={(e) => {
                      setValues({ ...values, [e.target.name]: e.target.value });
                      seterrorAlert(false);
                      setErrorText('');
                    }}
                  />
                )}
              </div>
            ))}
          </Stack>
          <DialogActions sx={{ p: '1.25rem' }}>
            <Button sx={{ color: '#5A6A85', borderColor: '#5A6A85' }} onClick={onClose} variant="outlined">Batal</Button>
            <Button color="primary" onClick={handleSubmit} variant="contained">
              Tambah
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error">
          {errorText}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

interface EditModalProps {
  columns: MRT_ColumnDef<Persondata>[];
  onClose: () => void;
  onSubmit: (values: Persondata) => void;
  initialData: Persondata | null;
  open: boolean;
}

export const EditAccountModal = ({
  open,
  columns,
  onClose,
  initialData,
  onSubmit,
}: EditModalProps) => {
  const [values, setValues] = useState<postD>(initialData || {
    nip: '',
    name: '',
    nohp: 0,
    email: '',
    role: '',
  });
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await putUser(values);
      if (!response.error) {
        console.log('Berhasil mengubah data:');
        router.refresh();
        onSubmit(values);
        onClose();
      } else {
        setErrorText(response.error);
        setErrorAlert(true);
        setOpenSnackbar(true);
      }
    } catch (error) {
      setErrorText("Terdapat Kesalahan Input");
      setErrorAlert(true);
      setOpenSnackbar(true);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Edit User</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
              mt: 1
            }}
          >
            {columns.map((column) => (
              <div key={column.accessorKey}>
                {column.accessorKey === 'role' ? (
                  <TextField
                    error={errorAlert}
                    label={column.header}
                    name={column.accessorKey}
                    select
                    value={column.accessorKey ? values[column.accessorKey] : ''}
                    onChange={(e) => {
                      setValues({ ...values, [e.target.name]: e.target.value });
                      setErrorAlert(false);
                      setErrorText('');
                    }}
                    sx={{ width: '100%' }}
                  >
                    <MenuItem value="Super Admin">Super Admin</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="User">User</MenuItem>
                  </TextField>
                ) : (
                  <TextField
                    error={errorAlert}
                    key={column.accessorKey}
                    label={column.header}
                    name={column.accessorKey}
                    value={column.accessorKey ? values[column.accessorKey] : ''}
                    sx={{ width: '100%' }}
                    onChange={(e) => {
                      if (column.accessorKey) {
                        setValues({ ...values, [e.target.name]: e.target.value });
                        setErrorAlert(false);
                        setErrorText('');
                      }
                    }}
                  />
                )}
              </div>
            ))}
          </Stack>
          <DialogActions sx={{ p: '1.25rem' }}>
            <Button sx={{ color: '#5A6A85', borderColor: '#5A6A85' }} onClick={onClose} variant="outlined">
              Batal
            </Button>
            <Button color="primary" onClick={handleSubmit} variant="contained">
              Simpan
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error">
          {errorText}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};



const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
const validateAge = (age: number) => age >= 18 && age <= 50;

export default MemberData;