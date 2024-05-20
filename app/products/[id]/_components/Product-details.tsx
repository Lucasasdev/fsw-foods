"use client";

import DiscountBadge from "@/app/_components/Discount-badge";
import ProductList from "@/app/_components/Product-list";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_components/_helpers/price";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { Prisma } from "@prisma/client";
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from "lucide-react";
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
    <>
      {/*RESTAURANTE*/}
      <div className="flex items-center gap-[6px] px-5 pt-5">
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
      {/*NOME DO PRODUTO*/}
      <h1 className="mb-2 mt-1 px-5 text-xl font-semibold">{product.name}</h1>
      {/*PREÇO DO PRODUTO E QUANTIDADE*/}
      <div className="flex justify-between px-5">
        <div>
          <div className="flex items-center gap-2">
            {/*PREÇO COM DESCONTO*/}
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>
            {/* BADGE DE DESCONTO*/}
            {product.discountPercentage && <DiscountBadge product={product} />}
          </div>

          {/*PREÇO ORIGINAL*/}
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
        <Card className="mt-6 flex justify-around px-5 py-2">
          {/*delivery price*/}
          <div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-sm">Entrega</span>
              <BikeIcon size={14} />
            </div>

            {Number(product.restaurant.deliveryFee) > 0 ? (
              <p className="text-sm font-semibold">
                {formatCurrency(Number(product.restaurant.deliveryFee))}
              </p>
            ) : (
              <p className="text-sm font-semibold">Grátis</p>
            )}
          </div>
          {/*delivery time*/}
          <div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-sm">Entrega</span>
              <TimerIcon size={14} />
            </div>

            {Number(product.restaurant.deliveryTimeMinutes) > 0 ? (
              <p className="text-sm font-semibold">
                {product.restaurant.deliveryTimeMinutes} min
              </p>
            ) : (
              <p className="text-sm font-semibold">0 min</p>
            )}
          </div>
        </Card>
      </div>

      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>
      <div className="mt-6 space-y-3 pb-5">
        <h3 className="px-5 font-semibold">Sucos</h3>
        <ProductList products={complementaryProducts} />
      </div>
    </>
  );
};

export default ProductDetails;
