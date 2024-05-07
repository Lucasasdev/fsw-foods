import { db } from "../_lib/prisma";
import RestaurantItem from "./Restaurant-item";

const RestaurantList = async () => {
  const restaurants = await db.restaurant.findMany({ take: 10 });
  // TODO: pegar restaurantes com maior número de pedidos
  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantList;
