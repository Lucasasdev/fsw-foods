import * as React from "react";
import Header from "./_components/Header";
import Search from "./_components/Search";
import CategoryList from "./_components/Category-list";

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
    </>
  );
};

export default Home;
