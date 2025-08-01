import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  status: String,
  categoryName: String,
  subCategoryName: String,
  productName: String,
  productSlug: String,
  description: String,
  datasheetFile: String,
  connectionDiagramFile: String,
  userManualFile: String,
  productImage: String,
  productkeywords: String,
  features: [
    {
      title: String,
      image: String,
    },
  ],
  table: [
    {
      column1: String,
      column2: String,
    },
  ],
    isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
}, { timestamps: true });

// ✅ Force delete cached model before redefining
mongoose.models.Product && delete mongoose.models.Product;

export const ProductModel = mongoose.model("Product", productSchema);
