// import { putUser, deleteUser } from '@/app/api/user/route';
// import { MRT_Row } from 'material-react-table';
// import { Persondata } from '../dashboard/Memberdata';

// export const handleSaveRowEdits = async (
//     userData: Persondata[],
//     validationErrors: { [cellId: string]: string },
//     exitEditingMode: () => void,
//     row: MRT_Row<Persondata>,
//     values: Persondata
// ) => {
//     if (!Object.keys(validationErrors).length) {
//         userData[row.index] = values;
//         await putUser(values);
//         console.log('Berhasil mengubah data:');
//         exitEditingMode();
        
//     }
// };

// export const handleDeleteRow = async (
//     userData: Persondata[],
//     row: MRT_Row<Persondata>
// ) => {
//     if (!window.confirm(`Are you sure you want to delete ${row.getValue('name')}`)) {
//         return;
//     }
//     try {
//         const nipp:any = row.getValue('nip');
//         await deleteUser(nipp)
//         userData.splice(row.index, 1);
        
//         console.log('Berhasil menghapus data:');
//     } catch (error) {
//         console.error('Error deleting data:', error);
//     }
// };
