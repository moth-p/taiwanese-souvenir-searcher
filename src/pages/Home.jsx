import { useState, useEffect } from "react";
import { useSearchParams, useOutletContext } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { fetchGiftsData } from "../services/api";

const itemPerPage = 12;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchKeywords, showProductDetails } = useOutletContext();

  const currentPage = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    async function getData() {
      const data = await fetchGiftsData();
      setProducts(data);
    }
    getData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const name = product.Name?.toLowerCase() || "";
    const feature = product.Feature?.toLowerCase() || "";
    const county = product.County?.toLowerCase() || "";

    return (
      name.includes(searchKeywords.toLowerCase()) ||
      feature.includes(searchKeywords.toLowerCase()) ||
      county.includes(searchKeywords.toLowerCase())
    );
  });

  const totalPages = Math.ceil(products.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentItems = products.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setSearchParams({ page });
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <>
      {/* 有搜尋關鍵字 */}
      {searchKeywords ? (
        <main className="max-w-[1440px] mx-auto min-h-screen w-screen px-4 md:px-20 my-20">
          {filteredProducts.length === 0 ? (
            <p className="col-span-full text-center text-slate-500">
              找不到符合「{searchKeywords}」的商品。
            </p>
          ) : (
            <>
              <p className="flex justify-start items-center text-slate-500 mb-10">
                搜尋關鍵字：「{searchKeywords}」
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    product={product}
                    key={product.Id || product.Name}
                    onClick={() => showProductDetails(product)}
                  />
                ))}
              </div>
            </>
          )}
        </main>
      ) : (
        <main className="flex flex-col justify-start items-center gap-10 py-10">
          <div>
            <p className="text-slate-500 mb-5">搜尋想要的伴手禮</p>
          </div>
          <section className="max-w-[1440px] mx-auto w-screen grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-8 px-4 md:px-20 mb-10">
            {currentItems.map((product) => (
              <ProductCard
                product={product}
                key={product.Id || product.Name}
                onClick={() => showProductDetails(product)}
              />
            ))}
          </section>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </main>
      )}
    </>
  );
};

export default Home;
