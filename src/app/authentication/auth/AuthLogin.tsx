'use client'
import React, { useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  Button,
  Stack,
  TextField,
  IconButton,
  InputAdornment
} from "@mui/material";
import Link from "next/link";
import { Login } from "@/app/api/user/route";
import { useRouter } from 'next/navigation';
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface FormData {
  username: string;
  password: string;
}

function LoginForm() {
  const [errorAlert, seterrorAlert] = useState(false)
  const [errorText, setErrorText] = useState("");
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });

  const router = useRouter()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorText("")
    seterrorAlert(false)
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await Login(formData);
    
    if (!response.error) {
      console.log('Berhasil menyimpan data:', response.user.nip);
      console.log('Token :', response.token);
      router.push('/dashboard');
      // Di sini Anda dapat menambahkan logika atau tampilan yang sesuai dengan keberhasilan penyimpanan data
    } else {
      setErrorText(response.error);
      seterrorAlert(true) // Mengatur pesan kesalahan jika login gagal
    }
  } catch (error) {
    setErrorText("Username atau Password Salah");
    seterrorAlert(true)
    // Di sini Anda dapat menambahkan logika atau tampilan yang sesuai dengan kegagalan penyimpanan data
  }
};

  const [showPass, setShowPass] = useState(false);
  const lihatPass = () => {
    setShowPass(!showPass); // Mengubah nilai showPassword saat tombol ditekan
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <Box mt="30px">
          <FormGroup>
            <TextField
              error={errorAlert}
              label="Email"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </FormGroup>
          </Box>
          <Box mt="40px">
          <FormGroup>
            <TextField
              error={errorAlert}
              label="Password"
              name="password"
              type={showPass ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              helperText={errorText}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={lihatPass}
                      edge="end"
                    >
                      {showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormGroup>
        </Box>
      </Stack>
      <Stack
        justifyContent="flex-end"
        direction="row"
        alignItems="left"
        my={2}
      >
        <Typography
          component={Link}
          href="/authentication/password"

          fontWeight="500"
          sx={{
            textDecoration: "none",
            color: "primary.main",
          }}
        >
          Lupa Password?
        </Typography>
      </Stack>
      <Box mt="10px" mb="9px">
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
        >
          Sign In
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
