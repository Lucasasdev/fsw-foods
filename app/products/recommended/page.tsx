import Header from "@/app/_components/Header";
import ProductItem from "@/app/_components/Product-item";
import { db } from "@/app/_lib/prisma";

const recommendedProductsPage = async () => {
  {
    /*TODO: take products more orders*/
  }

  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 20,
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
      <div className="px-5 py-6">
        <Header />
      </div>
      <div className="px-5 pb-6">
        <div className="mb-6 text-lg font-semibold">Produtos recomendados</div>
        <div className="grid grid-cols-2 gap-6">
          {products.map((product) => (
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

export default recommendedProductsPage;
