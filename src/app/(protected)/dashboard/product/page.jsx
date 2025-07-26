"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { useProductStore } from "@/store/useProductStore";
import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import StaticBreadcrumb from "@/components/DynamicBreadcrumb";

function AlertDialogDelete({productId, children }) {
  console.log("prodcutId", productId)
  const { deleteProduct } = useProductStore();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className={'cursor-pointer'}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteProduct(productId)}  className={'cursor-pointer'}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const ProductListPage = () => {
  const { products, loading, error, fetchProducts, deleteProduct } =
    useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products);

  return (
    <div className="p-4">
     <StaticBreadcrumb
             items={[
               { label: "Dashboard", href: "/dashboard" },
               { label: "Products", href: "/dashboard/products" },
              //  { label: "Add Product" }, /
             ]}
           />
           <h1 className="mb-3 font-semibold text-lg">All Product</h1>

      <Table>
        <TableCaption>A list of all products in the system.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Thumbnail</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Subcategory</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                Loading products...
              </TableCell>
            </TableRow>
          ) : products?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No products found.
              </TableCell>
            </TableRow>
          ) : (
            products?.map((product) => (
              <TableRow key={product._id}>
                <TableCell className="font-medium">
                  {product.productName}
                </TableCell>
                <TableCell>
                  {product.productSlug ? product.productSlug : "-"}
                </TableCell>
                <TableCell>
                  {console.log("product.productImage", product.productImage)}

                  {product.productImage ? (
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_BASE_URL + product.productImage
                      }
                      alt={product.productImage}
                      width={50}
                      height={50}
                    />
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  {product.categoryName ? product.categoryName : "-"}
                </TableCell>
                <TableCell>
                  {product.subCategoryName ? product.subCategoryName : "-"}
                </TableCell>
                <TableCell>
                  {product.status ? (
                    <span
                      className={`inline-block px-2 py-1 rounded text-sm ${
                        product.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.status}
                    </span>
                  ) : (
                    "-"
                  )}
                </TableCell>

                <TableCell className={"flex items-center gap-2"}>
                  <Link href={`/dashboard/product/create/${product?._id}`}>
                    <Edit className="w-5" />
                  </Link>
                  {/* <Button
                    onClick={() => deleteProduct(product?._id)}
                    className={"cursor-pointer"}
                  > */}
                  <AlertDialogDelete productId={product?._id}>
                    <Trash2 className="w-5 cursor-pointer" />
                  </AlertDialogDelete>
                  {/* </Button> */}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductListPage;
