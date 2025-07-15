import { Link } from "react-router-dom";
import ShoppingHeader from "../../components/shopping-view/Header";
import ShoppingCategory from "../../components/shopping-view/ShoppingCategory";

function ShoppingViewHome() {
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
          image: "/images/phone1.jpg",
        },
        {
          id: 2,
          title: "Boat Earbuds",
          price: 1299,
          image: "/images/earbuds.jpg",
        },
        { id: 3, title: "T-Shirt", price: 599, image: "/images/tshirt.jpg" },
        { id: 4, title: "Fan", price: 2199, image: "/images/fan.jpg" },
      ],
    },
    {
      title: "Top Offers on Electronics",
      products: [
        { id: 5, title: "Laptop", price: 39999, image: "/images/laptop.jpg" },
        { id: 6, title: "Smart TV", price: 14999, image: "/images/tv.jpg" },
        { id: 7, title: "Printer", price: 4999, image: "/images/printer.jpg" },
        { id: 8, title: "Router", price: 1499, image: "/images/router.jpg" },
      ],
    },
  ];

  return (
    <div className="container-fluid p-0 bg-light">
      <ShoppingHeader />
      <ShoppingCategory/>
      {/* Banner Carousel */}
      <div
        id="mainBanner"
        className="carousel slide mt-2 mx-3"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/b2019166910e3876.jpeg?q=60"
              className="d-block w-100"
              alt="Banner 1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/3b8351d48612fe3d.jpg?q=60"
              className="d-block w-100"
              alt="Banner 2"
            />
          </div>
        </div>
      </div>

      {/* Product Carousels */}
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
                className="card"
                style={{ minWidth: "160px", maxWidth: "180px" }}
                key={product.id}
              >
                <img
                  src={product.image}
                  className="card-img-top p-2"
                  alt={product.title}
                  style={{ height: "140px", objectFit: "contain" }}
                />
                <div className="card-body p-2">
                  <h6 className="card-title text-truncate mb-1">
                    {product.title}
                  </h6>
                  <p className="text-primary fw-bold mb-1">₹{product.price}</p>
                  <Link
                    to={`/product/${product.id}`}
                    className="btn btn-sm btn-outline-secondary w-100"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShoppingViewHome;
