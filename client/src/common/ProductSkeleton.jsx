function ProductSkeleton() {
  return (
    <div className="col-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 border-0">
        <div className="placeholder-glow">
          <div
            className="placeholder w-100"
            style={{ height: "200px", borderRadius: "0.5rem" }}
          ></div>
        </div>
        <div className="card-body">
          <p className="placeholder-glow mb-2">
            <span className="placeholder col-8"></span>
          </p>
          <p className="placeholder-glow mb-2">
            <span className="placeholder col-5"></span>
          </p>
          <p className="placeholder-glow d-flex align-items-center">
            <span className="placeholder bg-grey-300 col-4 me-2"></span>
            <span className="placeholder col-3 ms-auto"></span>
          </p>
          <span className="placeholder col-6 btn btn-primary disabled"></span>
        </div>
      </div>
    </div>
  );
}

export default ProductSkeleton;
