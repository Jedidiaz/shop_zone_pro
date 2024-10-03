"use client";
import ProductTable from "@/components/forms/ProductTable";
import { Button, Modal, Stack, styled, Typography } from "@mui/material";
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
  const {
    products,
    openModal,
    hanldeCloseModal,
    hanldeOpenModal,
    handleChange,
    description,
    image,
    name,
    price,
    stock,
    handleSubmit,
    category,
    categories,
    handleDeleteProduct,
  } = useProducts();
  const router = useRouter();
  const navigateToCategories = () => router.push("/admin/categories");

  return (
    <>
      <Stack component="section" gap={2}>
        <Stack direction="row" gap={2} justifyContent="flex-end">
          <Button variant="text" onClick={navigateToCategories}>
            Categorias
          </Button>
          <Button startIcon={<AddIcon />} onClick={hanldeOpenModal}>
            Agregar Producto
          </Button>
        </Stack>
        <ProductTable
          products={products}
          handleDeleteProduct={handleDeleteProduct}
        />
      </Stack>
      <Modal open={openModal} onClose={hanldeCloseModal}>
        <Stack
          component="form"
          role="form"
          spacing={2}
          maxWidth={400}
          p={2}
          sx={style}
          gap={1}
          onSubmit={handleSubmit}
        >
          <Typography variant="h4" mb={2}>
            Agregar nuevo producto
          </Typography>
          <Input
            label="Titulo"
            name="name"
            onChange={handleChange}
            value={name}
            required
          />
          <Input
            label="Precio"
            InputProps={{
              inputComponent: NumericFormatCustom as any,
            }}
            name="price"
            onChange={handleChange}
            value={price}
            required
          />
          <Input
            label="Stock"
            InputProps={{
              inputComponent: NumericFormatCustom as any,
            }}
            inputProps={{ isCurrency: false, prefix: "" }}
            name="stock"
            onChange={handleChange}
            value={stock}
            required
          />
          <Input
            label="Descripcción"
            name="description"
            multiline
            rows={4}
            onChange={handleChange}
            value={description}
            required
          />
          <SelectCustom
            options={category}
            label="Categorias"
            name="categories"
            multiple
            onChange={handleChange}
            value={categories}
            renderValue={(selected: unknown) => {
              return (selected as Array<number>)
                .map((cat) => {
                  const categoryData = category.find(
                    (item) => item?.value === cat
                  );
                  return categoryData?.label ?? "";
                })
                .join(", ");
            }}
            sx={{
              "&.MuiInputBase-root": {
                border: "none !important",
              },
            }}
            required
          />
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Subir imagen
            <VisuallyHiddenInput
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </Button>
          {image?.url && (
            <Stack alignItems="center">
              <Image
                src={image.url}
                alt="new product image"
                width={180}
                height={180}
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
            </Stack>
          )}
          <Stack direction="row" gap={2} justifyContent="flex-end">
            <Button variant="text" onClick={hanldeCloseModal}>
              Cancelar
            </Button>
            <Button type="submit">Crear</Button>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};

export default Products;
