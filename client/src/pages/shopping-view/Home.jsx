import { Link } from "react-router-dom";
import ShoppingHeader from "../../components/shopping-view/Header";
import ShoppingCategory from "../../components/shopping-view/ShoppingCategory";
import Footer from "../../common/Footer";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllFilteredProducts } from "../../store/shop/productSlice";

function ShoppingViewHome() {
  // const { isLoading } = useSelector((state) => state.auth);
  const { productList , isLoading} = useSelector((state) => state.shopProduct);
  const dispatch = useDispatch();

  const mens = "category=men";
  const sortMens = "sort=&sortBy=nullquery";
  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: mens,
        sortParams: null,
      })
    );
    console.log();
  }, [dispatch]);

  const productSections = [
    {
      title: "Best Deals",
      products: [
        {
          id: 1,
          title: "Realme Narzo",
          price: 9999,
          image:
            "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/1/r/z/narzo-n61-narzo-n61-realme-original-imah4ff7syhrqwnh.jpeg?q=70",
        },
        {
          id: 2,
          title: "Boat Earbuds",
          price: 1299,
          image:
            "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/q/m/s/-original-imah3zvdthupfejc.jpeg?q=70",
        },
        {
          id: 3,
          title: "T-Shirt",
          price: 599,
          image:
            "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/w/f/f/xl-ausk0165-ausk-original-imahc7bcvb78cuyj.jpeg?q=70",
        },
        {
          id: 4,
          title: "Fan",
          price: 2199,
          image:
            "https://rukminim2.flixcart.com/image/832/832/xif0q/fan/n/w/u/neo-star-p2-48-ultra-hight-speed-50-2-ceiling-fan-1200-minmax-original-imah6f5xaqpgks2f.jpeg?q=70&crop=false",
        },
        {
          id: 5,
          title: "Realme Narzo",
          price: 9999,
          image:
            "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/1/r/z/narzo-n61-narzo-n61-realme-original-imah4ff7syhrqwnh.jpeg?q=70",
        },
        {
          id: 6,
          title: "Boat Earbuds",
          price: 1299,
          image:
            "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/q/m/s/-original-imah3zvdthupfejc.jpeg?q=70",
        },

        {
          id: 7,
          title: "Fan",
          price: 2199,
          image:
            "https://rukminim2.flixcart.com/image/832/832/xif0q/fan/n/w/u/neo-star-p2-48-ultra-hight-speed-50-2-ceiling-fan-1200-minmax-original-imah6f5xaqpgks2f.jpeg?q=70&crop=false",
        },
      ],
    },
    {
      title: "Top Offers on Electronics",
      products: [
        {
          id: 7,
          title: "Laptop",
          price: 39999,
          image:
            "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/i/t/b/-original-imahcd999rpcg3cj.jpeg?q=70",
        },
        {
          id: 8,
          title: "Smart TV",
          price: 14999,
          image:
            "https://rukminim2.flixcart.com/image/312/312/xif0q/television/j/u/i/-original-imahefyhj2gjg5h3.jpeg?q=70",
        },
        {
          id: 9,
          title: "Printer",
          price: 4999,
          image:
            "https://rukminim2.flixcart.com/image/612/612/k4a7c7k0/printer/y/j/z/canon-e3370-original-imafn2wyyxjjvzd6.jpeg?q=70",
        },
        {
          id: 10,
          title: "Router",
          price: 1499,
          image:
            "https://rukminim2.flixcart.com/image/312/312/xif0q/router/b/w/g/dir-825-dlink-original-imagkcchgzwwzqac.jpeg?q=70",
        },
        {
          id: 11,
          title: "Router",
          price: 1499,
          image:
            "https://rukminim2.flixcart.com/image/312/312/xif0q/router/b/w/g/dir-825-dlink-original-imagkcchgzwwzqac.jpeg?q=70",
        },
        {
          id: 12,
          title: "Laptop",
          price: 39999,
          image:
            "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/i/t/b/-original-imahcd999rpcg3cj.jpeg?q=70",
        },
        {
          id: 13,
          title: "Laptop",
          price: 39999,
          image:
            "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/i/t/b/-original-imahcd999rpcg3cj.jpeg?q=70",
        },
        {
          id: 14,
          title: "Laptop",
          price: 39999,
          image:
            "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/i/t/b/-original-imahcd999rpcg3cj.jpeg?q=70",
        },
      ],
    },
  ];

  const slides = [
    "https://rukminim1.flixcart.com/fk-p-flap/3240/540/image/692ebbda554ea9c0.jpeg?q=60",
    "https://rukminim1.flixcart.com/fk-p-flap/3240/540/image/1482d20068a6469d.jpg?q=60",
    "https://rukminim1.flixcart.com/fk-p-flap/3240/540/image/30e8800d3fcca35b.jpeg?q=60",
    "https://rukminim1.flixcart.com/fk-p-flap/3240/540/image/dfc6954413d2b3d7.jpeg?q=60",
  ];

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
        {productSections.map((_, idx) => (
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
          {slides.map((slide, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
              style={{
                height: "35vh",
                minHeight: "200px",
              }}
            >
              <img
                src={slide}
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
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#mainBanner"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
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
                key={product.id}
              >
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                  style={{
                    height: "15rem",
                    // width: "210px",
                    objectFit: "contain",
                  }}
                />
                <div className="card-body p-2">
                  <h6 className="card-title text-truncate mb-1">
                    {product.title}
                  </h6>
                  <p className="text-primary fw-bold mb-1">₹{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="d-flex ">
        <DealsSection title={"mens"} items={productList} load={isLoading} />
        <DealsSection title={"Featured Products"} items={productList} />
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
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
