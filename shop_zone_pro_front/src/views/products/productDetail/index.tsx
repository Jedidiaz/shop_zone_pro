"use client";

import { IProduct } from "@/interfaces/product_response.interface";
import colors from "@/resources/colors";
import { formatCurrency } from "@/resources/numberManager";
import {
  Button,
  Chip,
  Container,
  Divider,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

interface Props {
  product: IProduct;
}

const ProductDetail = ({ product }: Props) => {
  const { name, images, description, price, stock, categories } = product;
  return (
    <Container
      component="main"
      sx={{
        my: 6,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 3,
        alignItems: "center",
      }}
    >
      <Stack component="picture" height={380} position="relative" flex={1}>
        <Image
          src={images[0]}
          alt={`${name} image`}
          style={{ objectFit: "contain", width: "100%" }}
          sizes="100%"
          fill
        />
      </Stack>
      <Stack component="section" flex={2} gap={2}>
        <Typography variant="h2">{name}</Typography>
        <Stack direction="row" gap={1} alignItems="center">
          <Rating name="read-only" value={5} readOnly size="small" />
          <Typography variant="caption" color={colors.textDisabled}>
            300 reviews
          </Typography>
        </Stack>
        <Typography variant="h4" color="primary">
          {formatCurrency(price)}
        </Typography>
        <Divider />
        <Typography variant="body2" color={colors.textPlaceholder} lineHeight="normal" >
          {description}
        </Typography>
        <Divider />
        <Stack direction="row" gap={1}>
          {categories.map(({ name }, index) => (
            <Chip
              key={index}
              label={name}
              variant="outlined"
              color="primary"
              sx={{ color: "#4A4A4A" }}
            />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};

export default ProductDetail;
