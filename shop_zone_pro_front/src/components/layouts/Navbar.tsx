"use client";
import colors from "@/resources/colors";
import {
  Button,
  Container,
  InputAdornment,
  ListItem,
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
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

const links = [
  { path: "/", name: "Home" },
  { path: "/products", name: "Productos" },
];

const menuAdmin = [
  { path: "products", name: "Productos" },
  { path: "categories", name: "Categorías" },
];

const Navbar = (): JSX.Element => {
  const { user, logOut } = useUserStore((state) => state);
  const [settings, setSettings] = useState<HTMLElement | null>(null);
  const [adminMenu, setAdminMenu] = useState<HTMLElement | null>(null);
  const router = useRouter();
  const handleOpenSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSettings(event.currentTarget);
  };
  const handleOpenAdminMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAdminMenu(event.currentTarget);
  };

  const handleCloseSettings = () => setSettings(null);
  const handleCloseAdminMenu = () => setAdminMenu(null);
  const handleGoAdmin = () => {
    handleCloseSettings();
    router.push("/admin/products");
  };

  const handleLogOut = () => {
    logOut();
    handleCloseSettings();
    router.replace("/");
  };

  const handleGoAdminRoute = (path: string) => {
    handleCloseAdminMenu();
    router.push(`/admin/${path}`);
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
                {user.role === "admin" && (
                  <MenuItem onClick={handleGoAdmin}>
                    <ListItemText>Panel admin</ListItemText>
                  </MenuItem>
                )}
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
            sx={{ minWidth: 300, display: { xs: "none", sm: "initial" } }}
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
          {user && user.role === "admin" && (
            <>
              <Typography
                color={colors.contrastText}
                sx={{ cursor: "pointer" }}
                onClick={handleOpenAdminMenu}
              >
                Admin{" "}
                <ArrowDropDownOutlinedIcon
                  fontSize="small"
                  sx={{ width: 14, height: 14, p: 0 }}
                />
              </Typography>
              <Menu
                id="basic-menu"
                anchorEl={adminMenu}
                open={!!adminMenu}
                onClose={handleCloseAdminMenu}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {menuAdmin.map(({ name, path }, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleGoAdminRoute(path)}
                  >
                    <ListItemText>{name}</ListItemText>
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Navbar;
