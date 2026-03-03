import { Link, useNavigate } from "react-router-dom";
import ShoppingHeader from "../../components/shopping-view/Header";
import ShoppingCategory from "../../components/shopping-view/ShoppingCategory";
import Footer from "../../common/Footer";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllFilteredProducts } from "../../store/shop/productSlice";
import { getBannerImages } from "../../store/common/bannerSlice";



const formatToTwo = (value) => {
  if (value === undefined || value === null || isNaN(value)) return "0.00";
  return Number(value).toFixed(2);
};

const getSafeDiscount = (price, salePrice) => {
  const p = Number(price) || 0;
  const s = Number(salePrice) || 0;

  if (p <= 0) return 0;

  const discount = ((p - s) / p) * 100;

  return discount > 0 ? discount : 0; // prevent negative discount
};

function normalize(value, max = 1000) {
  return Math.min(value / max, 1);
}

function getBestDeals(products = []) {
  return products
    .map((product) => {
      const discountPercent = getSafeDiscount(
        product?.price,
        product?.salePrice
      );

      const dealScore =
        discountPercent * 0.4 +
        (product?.rating || 0) * 0.2 +
        normalize(product?.popularity || 0) * 0.15 +
        (product?.stock < 10 ? 10 : 0) * 0.1;

      return {
        ...product,
        discountPercent,
        dealScore,
      };
    })
    .sort((a, b) => b.dealScore - a.dealScore)
    .slice(0, 10);
}

const getBestDiscountProducts = (products = []) => {
  return products
    .map((product) => {
      const price = Number(product?.price) || 0;
      const sale = Number(product?.salePrice) || 0;

      if (price <= 0) return null;

      const discount = ((price - sale) / price) * 100;

      // 🚫 Remove negative or zero discount products
      if (discount <= 0) return null;

      return {
        ...product,
        discount,
      };
    })
    .filter(Boolean) // removes null values
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 10);
};

const getTopSelection = (products = []) => {
  return products
    .map((product) => {
      const discountPercent = getSafeDiscount(
        product?.price,
        product?.salePrice
      );

      const score =
        (product?.reviewVal || 0) * 0.5 +
        (product?.popularity || 0) * 0.2 +
        discountPercent * 0.2 +
        (product?.stock < 5 ? 5 : 0);

      return {
        ...product,
        discountPercent,
        topScore: score,
      };
    })
    .sort((a, b) => b.topScore - a.topScore)
    .slice(0, 10);
};

/* ================= MAIN COMPONENT ================= */

function ShoppingViewHome() {
  const { productList = [], isLoading } = useSelector(
    (state) => state.shopProduct
  );

  const { bannerImageList = [] } = useSelector(
    (state) => state.commonBanner
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bestDeals = getBestDeals(productList);
  const bestDiscount = getBestDiscountProducts(productList);
  const bestTopSelection = getTopSelection(productList);

  const electronics = productList.filter((product) =>
    [
      "laptop",
      "tv",
      "printer",
      "router",
      "mobile",
      "freeze",
      "airconditioner",
    ].some((keyword) =>
      product?.title?.toLowerCase()?.includes(keyword)
    )
  );

  useEffect(() => {
    sessionStorage.removeItem("filters");

    dispatch(
      fetchAllFilteredProducts({
        filterParams: null,
        sortParams: null,
      })
    );

    dispatch(getBannerImages());
  }, [dispatch]);

  function handleNavigateToListingPage(product, section = "category") {
    sessionStorage.removeItem("filters");

    const filterValue =
      product?.[section]?._id || product?.[section];

    const currentFilter = {
      [section]: [filterValue],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  return isLoading ? (
    <div className="container py-4 text-center">
      <h5>Loading...</h5>
    </div>
  ) : (
    <div className="container-fluid p-0 bg-light">
      <ShoppingHeader toast={toast} />
      <ShoppingCategory />

      {/* Banner */}
      <div
        id="mainBanner"
        className="carousel slide mt-2 mx-2 mx-md-3"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {bannerImageList.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item ${
                index === 0 ? "active" : ""
              }`}
              style={{ height: "35vh", minHeight: "200px" }}
            >
              <img
                src={slide?.image}
                className="d-block w-100 h-100"
                alt="banner"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>

      {[
        { title: "Best Deals", products: bestDeals },
        {
          title: "Top Offers on Electronics",
          products: electronics.slice(0, 8),
        },
      ].map((section, i) => (
        <div className="bg-white p-3 my-3 shadow-sm mx-3" key={i}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>{section.title}</h5>
            <Link
              to="/shop/listing"
              className="btn btn-sm btn-outline-primary"
            >
              View All
            </Link>
          </div>

          <div className="d-flex overflow-auto gap-3">
            {section.products.map((product) => (
              <div
                key={product?._id}
                className="card border-0 p-2"
                style={{ minWidth: "230px", maxWidth: "250px" }}
              >
                <Link
                  to="/shop/listing"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigateToListingPage(
                      product,
                      "category"
                    );
                  }}
                >
                  <img
                    src={product?.image}
                    alt={product?.title}
                    className="card-img-top"
                    style={{
                      height: "15rem",
                      objectFit: "contain",
                    }}
                  />
                </Link>

                <div className="card-body p-2">
                  <h6 className="text-truncate mb-1">
                    {product?.title}
                  </h6>
                  <p className="text-primary fw-bold mb-1">
                    ₹{formatToTwo(product?.salePrice)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* DO NOT CHANGE DIRECTION */}
      <div className="row mx-2">
        <div className="col-md-6 d-flex">
        <DealsSection
          title="Best Discount For You"
          items={bestDiscount}
          load={isLoading}
        />
        </div>
        <div className="col-md-6 d-flex">
        <DealsSection
          title="Top Selection"
          items={bestTopSelection}
          load={isLoading}
        />
      </div>
      </div>

      <Footer />
    </div>
  );
}

export default ShoppingViewHome;

/* ================= DEALS SECTION ================= */

const DealsSection = ({ title, items = [], load }) => {
  return (
    <>
      {!load ? (
        <div className="bg-white p-3 my-2 shadow-sm m-3 flex-fill" style={{ minWidth: "48%" }}>
          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <h5>{title}</h5>
              <Link
                to="/shop/listing"
                className="btn btn-sm btn-outline-primary mb-1"
              >
                View All
              </Link>
            </div>
          </div>

          <div className="row g-2">
            {items.slice(0, 6).map((item, idx) => (
              <div
                className="col-10 col-sm-7 col-md-6 col-lg-6 col-xl-4"
                key={idx}
              >
                <div
                  className="card h-100 border-0 rounded-2 product-card p-2"
                  style={{ minWidth: "180px", maxWidth: "210px" }}
                >
                  <Link
                    to={`/product/${item?._id}`}
                    className="text-decoration-none text-dark"
                  >
                    <img
                      src={item?.image}
                      className="card-img-top p-2"
                      alt={item?.title}
                      style={{
                        height: "12rem",
                        objectFit: "contain",
                      }}
                    />
                  </Link>

                  <div className="card-body py-2">
                    <h6 className="card-title small mb-1 text-truncate">
                      {item?.title}
                    </h6>

                    {item?.discount > 0 ? (
                      <p className="text-success small fw-semibold mb-0">
                        Min. {formatToTwo(item.discount)}% Off
                      </p>
                    ) : (
                      <p className="text-muted small fw-semibold mb-0">
                        No Discount Applicable
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};