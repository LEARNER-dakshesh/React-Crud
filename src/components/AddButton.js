import React, { useState } from "react";
import "./AddButton.css";

const AddButton = ({ insertModuleToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="add-button-container">
      <button className="add-button" onClick={toggleDropdown}>
        + Add
      </button>
      {isOpen && (
        <div className="dropdown">
          <div
            onClick={() => {
              insertModuleToggle((state) => !state);
            }}
            className="dropdown-item"
          >
            Create module
          </div>
          <div className="dropdown-item">Add a link</div>
          <div className="dropdown-item">Upload</div>
        </div>
      )}
    </div>
  );
};

export default AddButton;
