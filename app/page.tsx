import * as React from "react";
import Header from "./_components/Header";
import Search from "./_components/Search";
import CategoryList from "./_components/Category-list";
import ProductList from "./_components/Product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/Promo-banner";
import RestaurantList from "./_components/Restaurant-list";
import Link from "next/link";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 15,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <div className="px-5 pt-6">
        <Header />
      </div>

      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <PromoBanner
          src="/Promo-banner-01.png"
          alt="Até 30% de desconto em pizzas!"
        />
      </div>
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href={`/products/recommended/`}>
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <ProductList products={products} />
      </div>

      <div className="px-5 pt-6">
        <PromoBanner
          src="/Promo-banner-02.png"
          alt="A partir de R$17,90 em lanches"
        />
      </div>

      <div className="space-y-4 pb-6 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Restaurantes recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/restaurant/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <RestaurantList />
      </div>
    </>
  );
};

export default Home;
