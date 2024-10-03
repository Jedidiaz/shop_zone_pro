import { useApi } from "@/hooks/useApi";
import useForm, { IInputs } from "@/hooks/useForm";
import {
  CategoryOptions,
  ICategory,
  IGetCategoriesResponse,
} from "@/interfaces/category_response.interface";
import {
  ICrateProductResponse,
  IGetProductsResponse,
  IProduct,
  IProductForm,
} from "@/interfaces/product_response.interface";
import { BasicIResponse } from "@/interfaces/user_response.interface";
import { SelectChangeEvent } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { FormEvent, useEffect, useState } from "react";

const useCategories = () => {
  const { loadApi, loadingApi } = useApi();
  const [category, setCategory] = useState<string>("");
  const [categories, setCategories] = useState<ICategory[]>([]);

  const handleChange = (value: string) => setCategory(value);

  const handleGetCategories = async () => {
    try {
      const { data } = await loadApi<IGetCategoriesResponse>({
        endpoint: "categories",
        type: "GET",
      });
      setCategories(data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    try {
      await loadApi<BasicIResponse>({
        endpoint: `categories/${categoryId}`,
        type: "DELETE",
      });
      enqueueSnackbar("Producto eliminado correctamente", {
        autoHideDuration: 3000,
        variant: "success",
      });
      handleGetCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!category.trim()) return
    try {
      const { msg } = await loadApi<ICrateProductResponse>({
        endpoint: "categories/create",
        type: "POST",
        body: { name: category },
      });
      enqueueSnackbar(msg, { autoHideDuration: 3000, variant: "success" });
      handleGetCategories();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

  return {
    loadingApi,
    category,
    handleChange,
    handleSubmit,
    handleDeleteCategory,
    categories,
  };
};

export default useCategories;
