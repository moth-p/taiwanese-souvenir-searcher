import { useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import NavBar from "../components/NavBar";

const MainLayout = () => {
  // 處理搜尋關鍵字（來自 NavBar）
  const [searchParams, setSearchParams] = useSearchParams();
  const searchKeywords = searchParams.get("search") || "";

  const handleSearch = (keywords) => {
    setSearchParams({ search: keywords });
  };

  // 處理商品詳情彈窗狀態
  const [selectedProduct, setSelectedProduct] = useState(null);

  const showProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <section className="relative w-screen h-screen py-40 md:py-20">
      {/* Nav */}
      <NavBar onSearch={handleSearch} />

      {/* Main */}
      <Outlet
        context={{
          searchKeywords,
          selectedProduct,
          setSelectedProduct,
          showProductDetails,
          closeProductDetails,
        }}
      />

      {/* 商品詳情彈窗（所有頁面共用） */}
      {selectedProduct && (
        <>
          {/* 遮罩 */}
          <div
            className="fixed inset-0 bg-black/30 z-20"
            onClick={closeProductDetails}
          ></div>

          {/* 彈窗內容 */}
          <section
            className="animate__animated animate__fadeIn animate__faster fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          bg-slate-50 border-2 border-slate-200 w-[350px] h-[400px] md:w-[400px] md:h-[450px] 
          z-30 py-8 px-12 rounded-xl shadow-xl flex flex-col gap-8 overflow-scroll"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-stone-50 text-lg bg-red-400 rounded-full w-8 h-8"
              onClick={closeProductDetails}
            >
              ✕
            </button>
            <h2 className="text-xl text-cyan-800 font-bold">
              {selectedProduct.Name}
            </h2>
            <div className="w-[150px] h-[120px]">
              <img
                src={
                  selectedProduct.Column1 !== ""
                    ? selectedProduct.Column1
                    : "/no_image_default.png"
                }
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <p>{selectedProduct.Feature}</p>
            {selectedProduct.ProduceOrg !== "" &&
            selectedProduct.County !== "" ? (
              <p className="text-sm text-stone-600">
                {selectedProduct.ProduceOrg}｜{selectedProduct.County}
              </p>
            ) : (
              ""
            )}
          </section>
        </>
      )}
    </section>
  );
};

export default MainLayout;
