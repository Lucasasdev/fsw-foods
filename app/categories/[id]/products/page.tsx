import Header from "@/app/_components/Header";
import ProductItem from "@/app/_components/Product-item";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";

interface categoriesPageProps {
  params: {
    id: string;
  };
}

const categoriesPage = async ({ params: { id } }: categoriesPageProps) => {
  const category = await db.category.findUnique({
    where: {
      id: id,
    },
    include: {
      products: {
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

  if (!category) {
    notFound();
  }

  return (
    <>
      <div className="px-5 py-6">
        <Header />
      </div>
      <div className="px-5 pb-6">
        <div className="mb-6 text-lg font-semibold">{category.name}</div>
        <div className="grid grid-cols-2 gap-6">
          {category.products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              className="min-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default categoriesPage;
