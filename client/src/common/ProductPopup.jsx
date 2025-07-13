import { X } from "lucide-react";
import Button from "../components/ui/Button";
function Popup({ onClose, children , currentEditedId}) {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
      style={{ zIndex: 1150 }}
      onClick={onClose}
    >
      <div
        className="position-absolute top-0 end-0 bg-white p-4 shadow h-100"
        style={{
          width: "500px",
          maxWidth: "100%",
          overflowY: "auto",
          transition: "transform 0.3s ease-in-out",
          transform: "translateX(0%)", 
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
         <h5 className="mb-0">
                {
                  currentEditedId !== null ? "Edit Product" : "Add New Product"
                }
              </h5>
          <Button className="btn btn-sm btn-outline" onClick={onClose}>
           <X />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Popup;
