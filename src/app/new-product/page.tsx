import { Dialog } from "@mui/material";
import ProductForm from "@/components/ProductForm";

export default function ProductModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          bgcolor: "#1E1E1E",
          borderRadius: 2,
        },
      }}
    >
      <ProductForm />
    </Dialog>
  );
}
