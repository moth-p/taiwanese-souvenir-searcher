import { useState, useEffect } from "react";

const ProductCard = ({ product, onClick, onRemove }) => {
  const [colorChange, setColorChange] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isFavorited = storedFavorites.some((item) => item.ID === product.ID);
    setColorChange(isFavorited);
  }, [product.ID]);

  function onClickFavorite(e) {
    e.stopPropagation();
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!colorChange) {
      // 加入收藏
      const updateFavorites = [...storedFavorites, product];
      localStorage.setItem("favorites", JSON.stringify(updateFavorites));
      setColorChange(true);
    } else {
      // 取消收藏
      const updateFavorites = storedFavorites.filter(
        (item) => item.ID !== product.ID
      );
      localStorage.setItem("favorites", JSON.stringify(updateFavorites));
      setColorChange(false);
      // 通知父層移除這張卡片
      if (onRemove) onRemove(product.ID);
    }
  }

  return (
    <div
      onClick={onClick}
      className="cursor-pointer relative w-full max-w-[180px] md:max-w-[200px] h-[280px] md:h-[300px] flex flex-col p-2 md:p-4 gap-2 md:gap-4 border-2 border-stone-300 bg-stone-200 rounded-lg mx-auto shadow-md"
    >
      <button
        onClick={onClickFavorite}
        className={`absolute top-5 right-5 w-9 h-9 p-2 bg-stone-100 rounded-full text-3xl ${
          colorChange ? "text-red-500" : "text-stone-500"
        } flex justify-center items-center`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12.001 4.529a6 6 0 0 1 8.242.228a6 6 0 0 1 .236 8.236l-8.48 8.492l-8.478-8.492a6 6 0 0 1 8.48-8.464"
          />
        </svg>
      </button>
      <div className="w-full max-w-[180px] mx-auto max-h-[150px] rounded-lg">
        <img
          src={
            product.Column1 !== "" ? product.Column1 : "/no_image_default.png"
          }
          loading="lazy"
          alt={product.Name}
          className="object-cover w-[180px] h-[150px] rounded-lg"
        />
      </div>
      <div className="text-md flex flex-col justify-center items-start gap-2">
        <p className="text-stone-800">{product.Name}</p>
        {product.ProduceOrg !== "" && product.County !== "" ? (
          <p className="text-sm text-stone-500">
            {product.ProduceOrg}｜<span>{product.County}</span>
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProductCard;
