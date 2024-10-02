"use client";
import colors from "@/resources/colors";
import {
  Button,
  Container,
  InputAdornment,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "@/assets/shopZoneLogo.png";
import Input from "../forms/Input";
import SearchIcon from "@mui/icons-material/Search";
import { useUserStore } from "@/stores/user/user.store";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { useRouter } from "next/navigation";

const links = [
  { path: "/", name: "Home" },
  { path: "/", name: "Productos" },
  { path: "/", name: "Categorías" },
];

const Navbar = (): JSX.Element => {
  const { user, logOut } = useUserStore((state) => state);
  const [settings, setSettings] = useState<HTMLElement | null>(null);
  const router = useRouter();
  const handleOpenSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSettings(event.currentTarget);
  };

  const handleCloseSettings = () => setSettings(null);

  const handleLogOut = () => {
    logOut();
    setSettings(null);
    router.replace("/");
  };

  return (
    <Stack component="header" mb={2}>
      <Stack
        component="section"
        borderBottom={`1px solid ${colors.borderColor}`}
      >
        <Stack
          component={Container}
          direction="row"
          gap={2}
          justifyContent="space-between"
          py={2}
          sx={{ color: colors.textLight }}
        >
          <Typography>Envíos a todo el pais</Typography>
          {!user?.name ? (
            <Stack component="ul" direction="row" gap={1}>
              <Typography component={Link} href="/" color="inherit">
                Iniciar sesión
              </Typography>
              <Typography component="span">/</Typography>
              <Typography component={Link} href="/signup" color="inherit">
                Registrate
              </Typography>
            </Stack>
          ) : (
            <>
              <Button
                variant="text"
                size="small"
                sx={{ p: 0 }}
                endIcon={<ExpandMoreRoundedIcon />}
                onClick={handleOpenSettings}
              >
                <Typography variant="body2">{user.name}</Typography>
              </Button>
              <Menu
                open={!!settings}
                onClose={handleCloseSettings}
                anchorEl={settings}
              >
                <MenuItem onClick={handleLogOut}>
                  <ListItemText sx={{ color: "red" }}>
                    Cerrar sesión
                  </ListItemText>
                </MenuItem>
              </Menu>
            </>
          )}
        </Stack>
      </Stack>
      <Container component="main">
        <Stack
          component="header"
          py={1}
          direction="row"
          gap={2}
          justifyContent="space-between"
        >
          <Image
            src={logo}
            alt="shop zone pro logo image"
            width={170}
            style={{ objectFit: "cover" }}
            priority
          />
          <Input
            placeholder="Search"
            sx={{ minWidth: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Container>
      <Stack component="nav" bgcolor={colors.backgorundDark}>
        <Stack component={Container} gap={3} direction="row" py={2}>
          {links.map(({ path, name }, index) => (
            <Typography
              component={Link}
              key={index}
              href={path}
              color={colors.contrastText}
              sx={{ textDecoration: " none" }}
            >
              {name}
            </Typography>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Navbar;
