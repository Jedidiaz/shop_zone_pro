import colors from "@/resources/colors";
import {
  styled,
  Table,
  TableBody,
  TableCell as TB,
  TableHead,
  TableRow,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Swal from "sweetalert2";
import { ICategory } from "@/interfaces/category_response.interface";

const header = [
  "Id",
  "Nombre",
  "Fecha de creación",
  "Eliminar",
];

const TableCell = styled(TB)(() => ({
  textAlign: "center",
}));

const CategoryTable = ({
  categories,
  handleDeleteProduct,
}: {
  categories: ICategory[];
  handleDeleteProduct: (productId: number) => void;
}) => {
  const handleDelete = (productId: number) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar la categoria?",
      text: "Una vez eliminada, no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then(result => {
      if (result.isConfirmed) {
        handleDeleteProduct(productId);
      }
    })
  }

  return (
    <Table>
      <TableHead sx={{ bgcolor: colors.borderColor }}>
        <TableRow>
          {header.map((th, index) => (
            <TableCell key={index} sx={{ py: 1.5, textAlign: "center" }}>
              <Typography>{th}</Typography>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {categories.map(({ id, name, createdAt }) => (
          <TableRow key={id}>
            <TableCell>{id}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>
              {new Date(createdAt!).toLocaleDateString("es-Es", {
                weekday: "long",
                day: "2-digit",
                month: "short",
              })}
            </TableCell>
            <TableCell>
              <IconButton onClick={() => handleDelete(id)}>
                <DeleteOutlineIcon fontSize="small" color="error" />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
