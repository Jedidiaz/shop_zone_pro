"use client";
import colors from "@/resources/colors";
import { Container, InputAdornment, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/shopZoneLogo.png";
import Input from "../forms/Input";
import SearchIcon from "@mui/icons-material/Search";

const links = [
  { path: "/", name: "Home" },
  { path: "/", name: "Productos" },
  { path: "/", name: "Categorías" },
];

const Navbar = (): JSX.Element => {
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
          <Stack component="ul" direction="row" gap={1}>
            <Typography component={Link} href="/" color="inherit">
              Iniciar sesión
            </Typography>
            <Typography component="span">/</Typography>
            <Typography component={Link} href="/signup" color="inherit">
              Registrate
            </Typography>
          </Stack>
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
