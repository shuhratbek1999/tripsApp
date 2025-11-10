"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ProductCard from "./ProductCard";
import { Product } from "@/redux/productsSlice";

export default function ProductList() {
  const products = useSelector((state: RootState) => state.products.products);

  return (
    <div className="flex flex-col gap-4">
      {products.map((p: Product) => (
        <ProductCard
          key={p.id}
          id={p.id}
          name={p.name}
          article={p.article}
          barcode={p.barcode}
          code={p.code}
          image={p.image}
          planned={p.planned}
          status={p.status}
        />
      ))}
    </div>
  );
}
