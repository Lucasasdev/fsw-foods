import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/Restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/Delivery-info";
import ProductList from "@/app/_components/Product-list";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id: id,
    },
    include: {
      categories: true,
      Product: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantImage restaurant={restaurant} />

      <div className="flex items-center justify-between px-5 pt-5">
        {/*title*/}
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>
        {/*star badge*/}
        <div className="flex items-center gap-[3px] rounded-full bg-foreground px-2 py-[2px] text-white">
          <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold">5.0</span>
        </div>
      </div>
      {/*Delivery info*/}
      <div className="px-5">
        <DeliveryInfo restaurant={restaurant} />
      </div>
      {/*category badges*/}
      <div className="mt-3 flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
        {restaurant.categories.map((category) => (
          <div
            key={category.id}
            className="min-h-[26px] min-w-[167px] items-center rounded-lg bg-[#f4f4f5] text-center"
          >
            <span className="items-center text-xs text-muted-foreground">
              {category.name}
            </span>
          </div>
        ))}
      </div>
      {/*the most ordered products*/}
      <div className="mt-6 space-y-4">
        {/* TODO: Mostrar produtos mais pedidos quando implementarmos realização de pedido*/}
        <h2 className="px-5  font-semibold">Mais pedidos</h2>
        <ProductList products={restaurant.Product} />
      </div>
    </div>
  );
};

export default RestaurantPage;
