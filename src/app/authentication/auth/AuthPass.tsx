'use client'
import React, { useState } from "react";
import {
    Box,
    Button,
    FormGroup,
    Stack,
    TextField,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions
} from "@mui/material";
import { forPass } from "@/app/api/password/route";


function PassForm() {
    const [errorAlert, seterrorAlert] = useState(false)
    const [errorText, setErrorText] = useState("");
    const [dialog, setdialog] = useState(false);
    const [formData, setFormData] = useState({
        email: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrorText("")
        seterrorAlert(false)
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.email) {
            setErrorText("Silakan masukkan email");
            seterrorAlert(true);
            return;
        }

        try {
            const response = await forPass(formData.email);
            if (!response.error) {
                setdialog(true);
            } else {
                setErrorText(response.error);
                seterrorAlert(true)
            }
        } catch (error) {
            console.error('Gagal menyimpan data:', error);
        }
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
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                helperText={errorText}
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
                        Kirim Email
                    </Button>
                </Box>
            </form>
            <Dialog open={dialog} onClose={() => setdialog(false)}>
                <DialogTitle>Email Terkirim</DialogTitle>
                <DialogContent>
                    Email telah terkirim. Mohon periksa Gmail Anda untuk verifikasi dan mereset password Anda.
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PassForm;
