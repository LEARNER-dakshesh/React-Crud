import React from "react";
import { useDrag, useDrop } from "react-dnd";
import pdf_icon from "../images/pdf_icon.png";
import link_upload from "../images/Link_upload.png";
import drop_icon from "../images/drop_icon.png";

export const ItemTypes = {
  FILE: "file",
};

export const FileItem = ({ file, index }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.FILE,
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="uploaded-file"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="uploaded-file-content">
        <img
          src={file.type === "url" ? link_upload : pdf_icon}
          alt={file.type === "url" ? "Link icon" : "Pdf icon"}
          className="icon-img"
        />
        <p>{file.name}</p>
        <button className="dropdown-toggle">&#x22EE;</button>
      </div>
    </div>
  );
};

export const ModuleItem = ({ index, module, moveFileToModule }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.FILE,
    drop: (item) => moveFileToModule(item.index, index),
  }));

  return (
    <div ref={drop} className="module-item">
      <div className="module-content">
        <img src={drop_icon} alt="Dropdown icon" className="dropdown-icon" />
        <span>{module.name}</span>
        <button className="dropdown-toggle">&#x22EE;</button>
      </div>
      <div className="module-files">
        {module.files.map((file, fileIndex) => (
          <div key={fileIndex} className="module-file">
            <img
              src={file.type === "url" ? link_upload : pdf_icon}
              alt={file.type === "url" ? "Link icon" : "Pdf icon"}
              className="icon-img"
            />
            <p>{file.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
