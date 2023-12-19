import React, { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    FormGroup,
    IconButton,
    InputAdornment,
    Stack,
    TextField
} from "@mui/material";
import { resPass } from "@/app/api/password/route";
import { useRouter } from "next/navigation";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function ResetForm() {
    const router = useRouter()
    const [Pop, setPop] = useState(false)
    const [Text, setText] = useState('');
    const [errorAlert, seterrorAlert] = useState(false)
    const [errorText, setErrorText] = useState("");
    const [resData, setresData] = useState({
        newPassword: '',
        confPassword: ''
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setresData({ ...resData, [name]: value });
        setErrorText("")
        seterrorAlert(false)
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (resData.newPassword === '' && resData.confPassword === '') {
            setErrorText("Silahkan Masukkan Password Baru Anda");
            seterrorAlert(true);
        } else if (resData.newPassword !== resData.confPassword) {
            setErrorText("Password dan repassword tidak sesuai.");
            seterrorAlert(true);
        } else {
            try {
                const response = await resPass(resData);
                if (!response.error) {
                console.log('Berhasil mengirim email');
                router.push('/authentication/login');
                }else{
                    setText(response.error);
                    setPop(true)
                }
            } catch (error) {
                console.error('Gagal menyimpan data:', error);
                alert('Login gagal');
            }
        }
    };

    const [showPass, setShowPass] = useState(false);
    const lihatPass = () => {
        setShowPass(!showPass); // Mengubah nilai showPassword saat tombol ditekan
    };

    const [showPass1, setShowPass1] = useState(false);
    const lihatPass1 = () => {
        setShowPass1(!showPass1); // Mengubah nilai showPassword saat tombol ditekan
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <Stack>
                <Box mt={'20px'}>
                    <FormGroup>
                        <TextField
                            error={errorAlert}
                            variant="outlined"
                            fullWidth
                            label="Password"
                            name="newPassword"
                            type={showPass ? 'text' : 'password'}
                            value={resData.newPassword}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={lihatPass}
                                            edge="end"
                                        >
                                            {showPass ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>)}}
                        /></FormGroup>
                </Box>
                <Box mt={'40px'}>
                    <FormGroup>
                        <TextField
                            error={errorAlert}
                            variant="outlined"
                            fullWidth
                            label="Re-password"
                            name="confPassword"
                            type={showPass1 ? 'text' : 'password'}
                            value={resData.confPassword}
                            onChange={handleChange}
                            helperText={errorText}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={lihatPass1}
                                            edge="end"
                                        >
                                            {showPass1 ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>)}}
                        /></FormGroup>
                </Box>
            </Stack>
            <Box mt="30px">
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                >
                    Reset Password
                </Button>
            </Box>
        </form>
            <Dialog open={Pop} onClose={() => setPop(false)}>
                <DialogTitle>Kesalahan</DialogTitle>
                <DialogContent>
                        {Text}
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ResetForm;
