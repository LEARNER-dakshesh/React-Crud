import React, { useState } from "react";
import "./AddButton.css";
import link_icon from "../images/link_icon.png";
import module_icon from "../images/module_icon.png";
import upload_icon from "../images/upload_icon.png";

const AddButton = ({ onModuleCreate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [moduleName, setModuleName] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCreateModuleClick = () => {
    setShowModal(true);
    setIsOpen(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setModuleName("");
  };

  const handleInputChange = (event) => {
    console.log("Input changed:", event.target.value);
    setModuleName(event.target.value);
  };

  const handleCreate = () => {
    // console.log("Handle create function called");
    onModuleCreate(moduleName);
    closeModal();
  };

  return (
    <div className="add-button-container">
      <button className="add-button" onClick={toggleDropdown}>
        + Add
      </button>
      {isOpen && (
        <div className="dropdown">
          <div className="dropdown-item" onClick={handleCreateModuleClick}>
            <img src={module_icon} alt="module_icon" /> Create module
          </div>
          <div className="dropdown-item">
            <img src={link_icon} alt="link_icon"></img>Add a link
          </div>
          <div className="dropdown-item">
            <img src={upload_icon} alt="upload_icon" />
            Upload
          </div>
        </div>
      )}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h1>Create new Module</h1>
            <h2>Module name</h2>
            <input
              type="text"
              value={moduleName}
              onChange={handleInputChange}
              placeholder="Enter module name"
              className="module-input"
            />
            <div className="modal-actions">
              <button className="cancel-button" onClick={closeModal}>
                Cancel
              </button>
              <button className="create-button" onClick={handleCreate}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddButton;
