"use client";

import DeliveryInfo from "@/app/_components/Delivery-info";
import DiscountBadge from "@/app/_components/Discount-badge";
import ProductList from "@/app/_components/Product-list";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_components/_helpers/price";
import { Button } from "@/app/_components/ui/button";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;

  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantityClick = () =>
    setQuantity((currentState) => currentState + 1);

  const handleDecreaseQuantityClick = () =>
    setQuantity((currentState) => {
      if (currentState === 1) return 1;

      return currentState - 1;
    });

  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5 ">
      <div className="flex items-center gap-[6px] px-5">
        <div className="relative mb-2 h-6 w-6">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>
      <h1 className="mb-2 mt-1 px-5 text-xl font-semibold">{product.name}</h1>
      <div className="flex justify-between px-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>
            {product.discountPercentage && <DiscountBadge product={product} />}
          </div>
          {product.discountPercentage > 0 && (
            <p className="text-sm text-muted-foreground">
              De: {formatCurrency(Number(product.price))}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 text-center">
          <Button
            size="icon"
            variant="ghost"
            className="border border-solid border-muted-foreground"
            onClick={handleDecreaseQuantityClick}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-4">{quantity}</span>
          <Button size="icon" onClick={handleIncreaseQuantityClick}>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
      <div className="px-5">
        <DeliveryInfo restaurant={product.restaurant} />
      </div>

      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>
      <div className="mt-6 space-y-3">
        <h3 className="px-5 font-semibold">Sucos</h3>
        <ProductList products={complementaryProducts} />
      </div>
      <div className="mt-6 px-5">
        <Button className="w-full font-semibold">Adicionar à sacola</Button>
      </div>
    </div>
  );
};

export default ProductDetails;
