import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { hapusToken } from "@/app/api/user/route";
import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";
import AlertDialog from "../../components/modal/User";
import { getAvatar } from "@/app/api/user/route";

const Profile : React.FC = () => {
  
  const [avatar, setAvatar] = useState("/images/profile/user-1.jpg"); // URL default jika API gagal

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const data = await getAvatar();
        setAvatar(data);
      } catch (error) {
        console.error('Failed to fetch avatar', error);
      }
    };

    fetchAvatar();
  }, []);
  
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
        src={avatar}
          alt="image"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <MenuItem onClick={handleOpenDialog}>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button
            href="/authentication/login"
            variant="outlined"
            color="error"
            component={Link}
            fullWidth
            onClick={hapusToken}
          >
            Logout
          </Button>
        </Box>
      </Menu>
      {open && <AlertDialog open={open} handleClose={() => setOpen(false)} />}
    </Box>
  );
};

export default Profile;
