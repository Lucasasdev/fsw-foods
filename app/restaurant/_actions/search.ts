"use server";

import { db } from "@/app/_lib/prisma";

export const searchForRestaurants = (search: string) => {
  const restaurants = db.restaurant.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  return restaurants;
};
