import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);

  // 從 MainLayout 取得 showProductDetails 函式
  const { showProductDetails } = useOutletContext();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveFavorite = (productID) => {
    const updatedFavorites = favorites.filter((item) => item.ID !== productID);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <main className="flex flex-col justify-start items-center gap-10 py-10">
      <div>
        <p className="text-slate-500 mb-5">您的收藏清單</p>
      </div>
      <section className="max-w-[1440px] mx-auto w-screen grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-8 px-4 md:px-20 mb-10">
        {favorites.length === 0 ? (
          <p className="text-gray-400 col-span-full text-center">
            目前沒有收藏項目
          </p>
        ) : (
          favorites.map((product) => (
            <ProductCard
              product={product}
              key={product.ID || product.Name}
              onRemove={handleRemoveFavorite}
              onClick={() => showProductDetails(product)}
            />
          ))
        )}
      </section>
    </main>
  );
};

export default Favorite;
