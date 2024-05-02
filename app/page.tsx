import * as React from "react";
import Header from "./_components/Header";
import Search from "./_components/Search";
import CategoryList from "./_components/Category-list";
import Image from "next/image";

const Home = () => {
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
        <Image
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizzas!"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full object-contain"
          quality={100}
        />
      </div>
    </>
  );
};

export default Home;
