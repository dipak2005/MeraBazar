import { Link } from "react-router-dom";
import ShoppingHeader from "../../components/shopping-view/Header";
import ShoppingCategory from "../../components/shopping-view/ShoppingCategory";
import Footer from "../../common/Footer";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function ShoppingViewHome() {
  const { isLoading } = useSelector((state) => state.auth);
  const categories = [
    { name: "Mobiles", image: "/images/mobiles.png" },
    { name: "Fashion", image: "/images/fashion.png" },
    { name: "Electronics", image: "/images/electronics.png" },
    { name: "Home", image: "/images/home.png" },
    { name: "Appliances", image: "/images/appliances.png" },
    { name: "Grocery", image: "/images/grocery.png" },
    { name: "Toys", image: "/images/toys.png" },
  ];

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
    <div className="text-center py-4 opacity-0.5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Uploading...</span>
      </div>
      <p className="mt-2 mb-0">Uploading image...</p>
    </div>
  ) : (
    <div className="container-fluid p-0 bg-light">
      <ShoppingHeader toast={toast} />
      <ShoppingCategory />
      {/* Banner Carousel */}

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
                style={{ minWidth: "180px", maxWidth: "250px" }}
                key={product.id}
              >
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                  style={{
                    height: "15rem",
                    width: "210px",
                    objectFit: "contain",
                  }}
                />
                <div className="card-body p-2">
                  <h6 className="card-title text-truncate mb-1">
                    {product.title}
                  </h6>
                  <p className="text-primary fw-bold mb-1">₹{product.price}</p>
                  {/* <Link
                    to={`/product/${product.id}`}
                    className="btn btn-sm btn-outline-secondary w-100"
                  >
                    View
                  </Link> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default ShoppingViewHome;
