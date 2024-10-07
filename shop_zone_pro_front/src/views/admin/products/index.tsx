"use client";
import ProductTable from "@/components/forms/ProductTable";
import {
  Alert,
  Box,
  Button,
  Grow,
  InputAdornment,
  Modal,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import useProducts from "./useProducts";
import AddIcon from "@mui/icons-material/Add";
import colors from "@/resources/colors";
import Input from "@/components/forms/Input";
import NumericFormatCustom from "@/components/forms/NumericFormat";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "next/image";
import SelectCustom from "@/components/forms/SelectCustom";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import { filteredOptions } from "@/api/datasource";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  p: 4,
  bgcolor: colors.backgorund,
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Products = (): JSX.Element => {
  const { products, handleDeleteProduct } = useProducts();

  return (
    <>
      <Stack component="section" gap={2}>
        <Grow in>
          <Alert severity="info">
            Para crear un producto debe de haber como minimo 1 categoria, si no
            hay categorías creada, agrega{" "}
            <Link href="/admin/categories/create-category">aquí</Link>
          </Alert>
        </Grow>
        <Stack direction="row" gap={2} justifyContent="flex-end">
          <Input
            placeholder="Buscar..."
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Box sx={{ overflowX: "auto" }}>
          <ProductTable
            products={products}
            handleDeleteProduct={handleDeleteProduct}
          />
        </Box>
      </Stack>
    </>
  );
};

export default Products;
