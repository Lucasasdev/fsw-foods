// import RestaurantItem from "@/app/_components/Restaurant-item";
import Header from "@/app/_components/Header";
import RestaurantItem from "@/app/_components/Restaurant-item";
import { db } from "@/app/_lib/prisma";

const recommendedRestaurant = async () => {
  {
    /* TODO: Como não temos nenhum fetch de restaurants mais pedidos vou adicionar todos os restaurante momentaneamente. */
  }
  const restaurants = await db.restaurant.findMany({});

  return (
    <>
      <div className="px-5 py-6">
        <Header />
      </div>
      <div className="px-5 pb-6">
        <div className="mb-6 text-lg font-semibold">
          Restaurantes recomendados
        </div>
        <div className="flex w-full flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default recommendedRestaurant;
