import React, { useState, useEffect } from "react";
import AddButton from "./AddButton";
import "./CourseBuilder.css";
import img1 from "../images/img1.png";
import img2 from "../images/img2.png";
import img3 from "../images/img3.png";
import drop_icon from "../images/drop_icon.png";
import pdf_icon from "../images/pdf_icon.png";
import download from "../images/download.png";
import link_upload from "../images/Link_upload.png";

const CourseBuilder = () => {
  const [modules, setModules] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [editingModule, setEditingModule] = useState(null);
  const [renamingFile, setRenamingFile] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [addingLink, setAddingLink] = useState(false);

  const addModule = (moduleName) => {
    setModules([...modules, { name: moduleName, isEditing: false }]);
  };

  const handleAddLink = () => {
    setAddingLink(true);
  };

  const addLink = (linkData) => {
    linkData.type = "url";
    setUploadedFiles([...uploadedFiles, linkData]);
    // console.log(uploadedFiles);
  };

  const handleFileUpload = (file) => {
    setUploadedFiles([
      ...uploadedFiles,
      { name: file.name, url: URL.createObjectURL(file) },
    ]);
  };

  const editModule = (index, newName) => {
    const updatedModules = modules.map((module, i) =>
      i === index ? { ...module, name: newName } : module
    );
    setModules(updatedModules);
  };

  const deleteModule = (index) => {
    const updatedModules = modules.filter((_, i) => i !== index);
    setModules(updatedModules);
  };

  const openEditModal = (index) => {
    setEditingModule(index);
  };

  const closeEditModal = () => {
    setEditingModule(null);
  };

  const openRenameModal = (index) => {
    setRenamingFile(index);
  };

  const closeRenameModal = () => {
    setRenamingFile(null);
  };

  const renameFile = (index, newName) => {
    const updatedFiles = uploadedFiles.map((file, i) =>
      i === index ? { ...file, name: newName } : file
    );
    setUploadedFiles(updatedFiles);
  };

  const handleDownloadClick = (index) => {
    const file = uploadedFiles[index];
    const link = document.createElement("a");

    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteClick = (index) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
  };

  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleClickOutside = (event) => {
    if (
      !event.target.closest(".dropdown-menu") &&
      !event.target.closest(".dropdown-toggle")
    ) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="course-builder">
      <header>
        <h1>Course builder</h1>
        <AddButton
          onModuleCreate={addModule}
          onFileUpload={handleFileUpload}
          onAddLink={handleAddLink}
        />
      </header>
      <div className="content">
        {modules.length === 0 && uploadedFiles.length === 0 ? (
          <div className="empty-state">
            <img src={img1} alt="Box with items" />
          </div>
        ) : (
          <>
            {modules.map((module, index) => (
              <ModuleItem
                key={index}
                index={index}
                module={module}
                onEdit={editModule}
                onDelete={deleteModule}
                openEditModal={openEditModal}
              />
            ))}
            {uploadedFiles.map((file, index) => (
              <div key={index} className="uploaded-file">
                <div className="uploaded-file-content">
                  <img
                    src={file.type === "url" ? link_upload : pdf_icon}
                    alt={file.type === "url" ? "Link icon" : "Pdf icon"}
                    className="icon-img"
                  />
                  <p>{file.name}</p>
                  <button
                    className="dropdown-toggle"
                    onClick={() => handleDropdownToggle(index)}
                  >
                    &#x22EE;
                  </button>
                  {activeDropdown === index && (
                    <DropdownMenu
                      index={index}
                      openRenameModal={openRenameModal}
                      handleDownloadClick={handleDownloadClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {editingModule !== null && (
        <EditModal
          module={modules[editingModule]}
          onSave={(newName) => {
            editModule(editingModule, newName);
            closeEditModal();
          }}
          onClose={closeEditModal}
        />
      )}
      {renamingFile !== null && (
        <RenameModal
          file={uploadedFiles[renamingFile]}
          onSave={(newName) => {
            renameFile(renamingFile, newName);
            closeRenameModal();
          }}
          onClose={closeRenameModal}
        />
      )}

      {addingLink && (
        <LinkModal
          onSave={(newLink) => {
            addLink(newLink);
            setAddingLink(false);
          }}
          onClose={() => setAddingLink(false)}
        />
      )}
    </div>
  );
};

const ModuleItem = ({ index, module, onDelete, openEditModal }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEditClick = () => {
    openEditModal(index);
    setIsDropdownOpen(false);
  };

  const handleDeleteClick = () => {
    onDelete(index);
  };

  return (
    <div className="module-item">
      <div className="module-content">
        <img src={drop_icon} alt="Dropdown icon" className="dropdown-icon" />
        <span>{module.name}</span>
        <button className="dropdown-toggle" onClick={handleDropdownToggle}>
          &#x22EE;
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={handleEditClick}>
              <img src={img2} alt="Edit icon" className="dropdown-icon" />
              Edit module name
            </div>
            <div className="dropdown-item" onClick={handleDeleteClick}>
              <img src={img3} alt="Delete icon" className="dropdown-icon" />
              Delete
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DropdownMenu = ({
  index,
  openRenameModal,
  handleDownloadClick,
  handleDeleteClick,
}) => {
  return (
    <div className="dropdown-menu">
      <div className="dropdown-item" onClick={() => openRenameModal(index)}>
        <img src={img2} alt="Dropdown icon" className="dropdown-icon" />
        Rename
      </div>
      <div className="dropdown-item" onClick={() => handleDownloadClick(index)}>
        <img src={download} alt="Dropdown icon" className="dropdown-icon" />
        Download
      </div>
      <div className="dropdown-item" onClick={() => handleDeleteClick(index)}>
        <img src={img3} alt="Dropdown icon" className="dropdown-icon" />
        Delete
      </div>
    </div>
  );
};

const EditModal = ({ module, onSave, onClose }) => {
  const [newName, setNewName] = useState(module.name);

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSaveClick = () => {
    onSave(newName);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h1>Edit Module</h1>
        <h2>Module name</h2>
        <input
          type="text"
          value={newName}
          onChange={handleInputChange}
          placeholder="Enter module name"
          className="module-input"
        />
        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="save-button" onClick={handleSaveClick}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const RenameModal = ({ file, onSave, onClose }) => {
  const [newName, setNewName] = useState(file.name);

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSaveClick = () => {
    onSave(newName);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h1>Rename File</h1>
        <h3>File name</h3>
        <input
          type="text"
          value={newName}
          onChange={handleInputChange}
          placeholder="Enter file name"
          className="module-input"
        />
        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="save-button" onClick={handleSaveClick}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const LinkModal = ({ onSave, onClose }) => {
  const [url, setUrl] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value);
  };

  const handleSaveClick = () => {
    onSave({ url, name: displayName });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h1>Add new link</h1>
        <h2>URL</h2>
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder="Enter URL"
          className="module-input"
        />
        <h2>Display name</h2>
        <input
          type="text"
          value={displayName}
          onChange={handleDisplayNameChange}
          placeholder="Enter display name"
          className="module-input"
        />
        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="save-button" onClick={handleSaveClick}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseBuilder;
