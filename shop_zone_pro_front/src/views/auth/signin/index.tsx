"use client";
import { Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/forms/Input";
import colors from "@/resources/colors";
import Link from "next/link";
import Face5Icon from "@mui/icons-material/Face5";
import { LoadingButton } from "@mui/lab";

const SignIn = (): JSX.Element => {
  return (
    <Container component="main">
      <Stack
        ml={{ xs: 0, md: 6 }}
        component="form"
        role="form"
        gap={2}
        maxWidth={400}
        justifyContent="center"
        height="calc(100dvh - 200px)"
        pb={4}
      >
        <Typography variant="h3" fontWeight={600} mb={1}>
          Inicio de sesión: ¡Accede ahora!
        </Typography>
        <Input label="Email" name="email" type="email" />
        <Input label="Contraseña" name="password" type="password" Icon />
        <Stack gap={1} justifyContent="space-between" direction="row">
          <Typography variant="body1">¿Olvidaste tu contraseña?</Typography>
          <Typography
            component={Link}
            href="/recover-password"
            variant="body1"
            color={colors.primary}
            sx={{ textDecoration: "none" }}
          >
            Recuperala aquí
          </Typography>
        </Stack>
        <LoadingButton
          variant="contained"
          startIcon={<Face5Icon />}
          sx={{ mt: 3 }}
          loadingPosition="start"
          type="submit"
        >
          Iniciar sesión
        </LoadingButton>
      </Stack>
    </Container>
  );
};

export default SignIn;
