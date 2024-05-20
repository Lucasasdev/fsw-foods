import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/Product-image";
import ProductDetails from "./_components/Product-details";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id: id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <div>
      {/*IMAGE*/}
      <ProductImage product={product} />
      {/*TITULO E PREÇO*/}
      <ProductDetails product={product} complementaryProducts={juices} />
    </div>
  );
};

export default ProductPage;
