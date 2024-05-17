import React, { useState } from "react";
import AddButton from "./AddButton";
import "./CourseBuilder.css";
import img1 from "../images/img1.png";
import img2 from "../images/img2.png";
import img3 from "../images/img3.png";
import drop_icon from "../images/drop_icon.png";

const CourseBuilder = () => {
  const [modules, setModules] = useState([]);

  const addModule = (moduleName) => {
    setModules([...modules, { name: moduleName, isEditing: false }]);
  };

  // Function to edit a module name
  const editModule = (index, newName) => {
    const updatedModules = modules.map((module, i) =>
      i === index ? { ...module, name: newName, isEditing: false } : module
    );
    setModules(updatedModules);
  };

  const deleteModule = (index) => {
    const updatedModules = modules.filter((_, i) => i !== index);
    setModules(updatedModules);
  };

  const toggleEditing = (index) => {
    const updatedModules = modules.map((module, i) =>
      i === index ? { ...module, isEditing: !module.isEditing } : module
    );
    setModules(updatedModules);
  };

  return (
    <div className="course-builder">
      <header>
        <h1>Course builder</h1>
        <AddButton onModuleCreate={addModule} />
      </header>
      <div className="content">
        {modules.length === 0 ? (
          <div className="empty-state">
            <img src={img1} alt="Box with items" />
          </div>
        ) : (
          modules.map((module, index) => (
            <ModuleItem
              key={index}
              index={index}
              module={module}
              onEdit={editModule}
              onDelete={deleteModule}
              toggleEditing={toggleEditing}
            />
          ))
        )}
      </div>
    </div>
  );
};

const ModuleItem = ({ index, module, onEdit, onDelete, toggleEditing }) => {
  const [newName, setNewName] = useState(module.name);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEditClick = () => {
    toggleEditing(index);
    setIsDropdownOpen(false);
  };

  const handleDeleteClick = () => {
    onDelete(index);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSaveClick = () => {
    onEdit(index, newName);
  };

  return (
    <div className="module-item">
      {module.isEditing ? (
        <div className="module-edit">
          <input type="text" value={newName} onChange={handleNameChange} />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div className="module-content">
          <img src={drop_icon} alt="Dropdown icon" className="dropdown-icon" />
          <span> {module.name}</span>
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
      )}
    </div>
  );
};

export default CourseBuilder;
