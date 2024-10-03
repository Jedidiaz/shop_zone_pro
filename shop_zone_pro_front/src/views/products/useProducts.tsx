import { IProduct } from "@/interfaces/product_response.interface";

export const getSSRProducts = async () => {
  let products: IProduct[] = [];
  try {
    const response = await fetch("http://localhost:3200/api/products");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseJson = await response.json();
    products = responseJson.data;
  } catch (error) {
    console.error(error);
    products = [];
  }

  return products;
};
