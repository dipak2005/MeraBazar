import { Link, useNavigate } from "react-router-dom";
import ShoppingHeader from "../../components/shopping-view/Header";
import ShoppingCategory from "../../components/shopping-view/ShoppingCategory";
import Footer from "../../common/Footer";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllFilteredProducts } from "../../store/shop/productSlice";
import { getBannerImages } from "../../store/common/bannerSlice";

function normalize(value, max = 1000) {
  return Math.min(value / max, 1);
}

function getBestDeals(products) {
  return products
    .map((product) => {
      const discountPercent =
        ((product.price - product.salePrice) / product.price) * 100;

      const dealScore =
        discountPercent * 0.4 +
        (product.rating || 0) * 0.2 +
        normalize(product.popularity || 0) * 0.15 +
        (product.stock < 10 ? 10 : 0) * 0.1; //

      return {
        ...product,
        discountPercent: Math.round(discountPercent),
        dealScore: parseFloat(dealScore.toFixed(2)),
      };
    })
    .sort((a, b) => b.dealScore - a.dealScore)
    .slice(0, 10);
}

const getBestDiscountProducts = (products) => {
  return products
    .map((product) => ({
      ...product,
      discount: Math.round(
        ((product.price - product.salePrice) / product.price) * 100
      ),
    }))
    .sort((a, b) => b.discount - a.discount) // highest discount first
    .slice(0, 10); // top 10 deals
};

const getTopSelection = (products) => {
  return products
    .map((product) => {
      const discountPercent =
        ((product.price - product.salePrice) / product.price) * 100;
      const score =
        (product.reviewVal || 0) * 0.5 + // 50% weight
        (product.popularity || 0) * 0.2 + // 20%
        (discountPercent || 0) * 0.2 + // 20%
        (product.stock < 5 ? 5 : 0); // bonus for urgency

      return {
        ...product,
        discountPercent: Math.round(discountPercent),
        topScore: score.toFixed(2),
      };
    })
    .sort((a, b) => b.topScore - a.topScore) // best first
    .slice(0, 10); // top 10
};

function ShoppingViewHome() {
  const { productList, isLoading } = useSelector((state) => state.shopProduct);
  const { bannerImageList } = useSelector((state) => state.commonBanner);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bestDeals = getBestDeals(productList || []);
  const bestDiscount = getBestDiscountProducts(productList || []);
  const bestTopSelection = getTopSelection(productList || []);
  const electronics = productList.filter((product) =>
    [
      "laptop",
      "tv",
      "printer",
      "router",
      "mobile",
      "freeze",
      "airconditioner",
    ].some((keyword) => product.title.toLowerCase().includes(keyword))
  );

  useEffect(() => {
    const savedFilters = JSON.parse(sessionStorage.getItem("filters"));
    dispatch(
      fetchAllFilteredProducts({
        filterParams: savedFilters,
        sortParams: null,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    // for unfiltered

    sessionStorage.removeItem("filters");

    dispatch(
      fetchAllFilteredProducts({
        filterParams: null,
        sortParams: null,
      })
    );
  }, [dispatch]);

  function handleNavigateToListingPage(product, section = "category") {
    sessionStorage.removeItem("filters");

    const filterKey = section; // "category" or "brand"
    const filterValue = product[filterKey]?._id || product[filterKey]; // support nested
    const currentFilter = {
      [filterKey]: [filterValue], // category : men like this
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  const productSections = [
    {
      title: "Best Deals",
      products: bestDeals,
    },
    {
      title: "Top Offers on Electronics",
      products: electronics.slice(0, 8),
    },
  ];

  const slides = [
    "https://rukminim1.flixcart.com/fk-p-flap/3240/540/image/692ebbda554ea9c0.jpeg?q=60",
    "https://rukminim1.flixcart.com/fk-p-flap/3240/540/image/1482d20068a6469d.jpg?q=60",
    "https://rukminim1.flixcart.com/fk-p-flap/3240/540/image/30e8800d3fcca35b.jpeg?q=60",
    "https://rukminim1.flixcart.com/fk-p-flap/3240/540/image/dfc6954413d2b3d7.jpeg?q=60",
  ];

  useEffect(() => {
    dispatch(getBannerImages()).then((data) => {
      console.log(bannerImageList, "ls");
    });
  }, [dispatch]);


  console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

  return isLoading ? (
    <div className="container py-4">
      <div className="mb-4">
        <div className="placeholder-glow w-100" style={{ height: "200px" }}>
          <div className="placeholder col-12 h-100"></div>
        </div>
      </div>

      <div className="mb-3">
        <div className="placeholder-glow">
          <div className="placeholder col-6"></div>
        </div>
      </div>

      <div className="row">
        {productList.map((_, idx) => (
          <div className="col-md-3 mb-4" key={idx}>
            <div className="card">
              <div className="placeholder-glow">
                <div
                  className="placeholder col-12"
                  style={{ height: "150px" }}
                ></div>
              </div>
              <div className="card-body">
                <p className="card-title placeholder-glow">
                  <span className="placeholder col-6"></span>
                </p>
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-4 me-2"></span>
                  <span className="placeholder col-3"></span>
                </p>
                <div className="d-flex justify-content-end">
                  <span className="placeholder btn btn-primary disabled col-5"></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="container-fluid p-0 bg-light">
      <ShoppingHeader toast={toast} />
      <ShoppingCategory />

      <div
        id="mainBanner"
        className="carousel slide mt-2 mx-2 mx-md-3"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {bannerImageList.map((slide, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
              style={{
                height: "35vh",
                minHeight: "200px",
              }}
            >
              <img
                src={slide.image}
                className="d-block w-100 h-100"
                alt={`Banner ${index + 1}`}
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#mainBanner"
          data-bs-slide="prev"
          // style={{
          //   zIndex: 2,
          //   width: "60px",
          //   height: "60px",
          //   backgroundColor: "white",
          //   borderRadius: "50%",
          //   top: "50%",
          //   transform: "translateY(-50%)",
          //   right: "20px",
          //   transition: "all 0.3s ease",
          // }}
        >
          <span
            className="carousel-control-prev-icon text-dark"
            aria-hidden="true"
            // style={{
            //   filter: "invert(1)",
            //   width: "30px",
            //   height: "30px",
            // }}
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#mainBanner"
          data-bs-slide="next"
          // style={{
          //   zIndex: 2,
          //   width: "60px",
          //   height: "60px",
          //   backgroundColor: "white",
          //   borderRadius: "50%",
          //   top: "50%",
          //   transform: "translateY(-50%)",
          //   right: "20px",
          //   transition: "all 0.3s ease",
          // }}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
            // style={{
            //   filter: "invert(1)",
            //   width: "30px",
            //   height: "30px",
            // }}
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {productSections.map((section, i) => (
        <div className="bg-white p-3 my-3 shadow-sm mx-3" key={i}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">{section.title}</h5>
            <Link to="/shop/listing" className="btn btn-sm btn-outline-primary">
              View All
            </Link>
          </div>

          <div className="d-flex overflow-auto gap-3">
            {section.products.map((product) => (
              <div
                className="card h-100 border-0 rounded-2 product-card p-2 mb-3"
                style={{ minWidth: "230px", maxWidth: "250px" }}
                key={product._id}
              >
                <Link
                  to={"/shop/listing"}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigateToListingPage(product, "category");
                  }}
                >
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                    style={{ height: "15rem", objectFit: "contain" }}
                  />
                </Link>
                <div className="card-body p-2">
                  <h6 className="card-title text-truncate mb-1">
                    {product.title}
                  </h6>
                  <p className="text-primary fw-bold mb-1">
                    ₹{product.salePrice}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="d-flex ">
        <DealsSection
          title={"Best Discount For You"}
          items={bestDiscount}
          load={isLoading}
        />
        <DealsSection
          title={"Top Selection"}
          items={bestTopSelection}
          load={isLoading}
        />
      </div>

      <Footer />
    </div>
  );
}

export default ShoppingViewHome;

const DealsSection = ({ title, items, load }) => {
  return (
    <>
      {!load ? (
        <div className="bg-white p-3 my-2 shadow-sm mx-3 m-4">
          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <h5 className="mb-0">{title}</h5>
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
                  <a
                    href={`/shop/product/${item._id}`}
                    className="text-decoration-none text-dark"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <img
                      src={item?.image}
                      className="card-img-top p-2"
                      alt={item.title}
                      style={{
                        height: "12rem",
                        objectFit: "contain",
                      }}
                    />
                  </a>
                  <div className="card-body py-2 ">
                    <h6 className="card-title small mb-1 text-truncate">
                      {item.title}
                    </h6>
                    <p className="text-success small fw-semibold mb-0">
                      Min. {item.discount}% Off
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white p-3 my-2 shadow-sm mx-3 m-4">
          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <h5 className="mb-0 placeholder-glow">
                <span className="placeholder col-6"></span>
              </h5>
              <button className="btn btn-sm btn-outline-primary disabled placeholder col-3"></button>
            </div>
          </div>

          <div className="row g-2">
            {items.map((_, idx) => (
              <div
                className="col-10 col-sm-7 col-md-6 col-lg-6 col-xl-4"
                key={idx}
              >
                <div
                  className="card h-100 border-0 rounded-2 product-card p-2"
                  style={{ minWidth: "180px", maxWidth: "210px" }}
                >
                  <div
                    className="placeholder-glow"
                    style={{
                      height: "12rem",
                      backgroundColor: "#e0e0e0",
                      borderRadius: "0.25rem",
                    }}
                  ></div>
                  <div className="card-body py-2">
                    <p className="placeholder-glow mb-2">
                      <span className="placeholder col-8"></span>
                    </p>
                    <p className="placeholder-glow mb-0">
                      <span className="placeholder col-4 bg-success"></span>
                    </p>
                  </div>
                  <div className="card-body py-2">
                    <p className="placeholder-glow mb-2">
                      <span className="placeholder col-8"></span>
                    </p>
                    <p className="placeholder-glow mb-0">
                      <span className="placeholder col-4 bg-success"></span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
