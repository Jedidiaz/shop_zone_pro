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

const initForm: IProductForm = {
  categories: [],
  description: "",
  image: undefined,
  name: "",
  price: 0,
  stock: 0,
};

const useProducts = () => {
  const { loadApi, loadingApi } = useApi();
  const { form, onChange, resetForm } = useForm(initForm);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [category, setCategory] = useState<CategoryOptions[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const hanldeOpenModal = () => setOpenModal(true);
  const hanldeCloseModal = () => {
    resetForm();
    setOpenModal(false);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string | unknown>
      | IInputs
  ) => {
    const { type, name } = e.target as HTMLInputElement;
    const file = type === "file";
    onChange(e, name as keyof IProductForm, file);
  };

  const handleGetProducts = async () => {
    try {
      const { data } = await loadApi<IGetProductsResponse>({
        endpoint: "products",
        type: "GET",
      });
      setProducts(data.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetCategories = async () => {
    try {
      const { data } = await loadApi<IGetCategoriesResponse>({
        endpoint: "categories",
        type: "GET",
      });
      setCategory(
        data.map((category) => ({
          value: category.id,
          label: category.name,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await loadApi<BasicIResponse>({
        endpoint: `products/${productId}`,
        type: "DELETE",
      });
      enqueueSnackbar("Producto eliminado correctamente", {
        autoHideDuration: 3000,
        variant: "success",
      });
      handleGetProducts();
    } catch (error) {
      console.error(error);
    }
  }

  const createBodyRequest = () => {
    const { image, ...body } = form;
    if (!image) {
      enqueueSnackbar("No ha seleccionado una imagen", {
        autoHideDuration: 3000,
        variant: "warning",
      });
      return null;
    }

    return { ...body, images: [image.file] };
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = createBodyRequest();
    if (!body) return;
    try {
      const { msg } = await loadApi<ICrateProductResponse>({
        endpoint: "products/create",
        type: "POST",
        body,
      });
      hanldeCloseModal();
      enqueueSnackbar(msg, { autoHideDuration: 3000, variant: "success" });
      handleGetProducts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetProducts();
    handleGetCategories();
  }, []);

  return {
    loadingApi,
    products,
    category,
    hanldeOpenModal,
    hanldeCloseModal,
    openModal,
    form,
    ...form,
    handleChange,
    handleSubmit,
    handleDeleteProduct
  };
};

export default useProducts;
