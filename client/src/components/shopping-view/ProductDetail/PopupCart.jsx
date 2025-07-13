import React from "react";


function Popup({ title, content, onClose, onConfirm, show }) {
  if (!show) return null;

  return (
    <div className="popup-overlay h-100">
      <div className="popup-box p-4 bg-white rounded shadow">
        <h5 className="mb-3">{title || "Popup"}</h5>
        <div className="mb-4">{content || "Are you sure?"}</div>
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
