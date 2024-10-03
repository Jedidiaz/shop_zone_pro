"use client";
import { Button, IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CategoryTable from "@/components/forms/CategoryTable";
import useCategories from "./useCategories";
import Input from "@/components/forms/Input";
import { LoadingButton } from "@mui/lab";

const Categories = (): JSX.Element => {
  const {
    categories,
    handleDeleteCategory,
    handleSubmit,
    loadingApi,
    handleChange,
    category,
  } = useCategories();
  return (
    <Stack component="section" gap={2}>
      <Stack direction="row" gap={2} justifyContent="flex-end">
        <Button>Productos</Button>
        <Stack direction="row" gap={2} alignItems="center">
          <Input
            label="Categoría"
            placeholder="Crea una nueva categoría"
            name="category"
            onChange={(e) => handleChange(e.target.value)}
            value={category}
          />
          <LoadingButton
            onClick={handleSubmit}
            loading={loadingApi.includes("POST__categories/create")}
          >
            <AddIcon color="primary" />
          </LoadingButton>
        </Stack>
      </Stack>
      <CategoryTable
        categories={categories}
        handleDeleteProduct={handleDeleteCategory}
      />
    </Stack>
  );
};

export default Categories;
