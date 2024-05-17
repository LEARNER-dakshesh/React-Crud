import React, { useState } from "react";
import AddButton from "./AddButton";
import "./CourseBuilder.css";
import img1 from "../images/img1.png";

const CourseBuilder = () => {
  const [insertModuleModal, setInsertModuleModal] = useState(false);

  return (
    <div className="course-builder">
      {insertModuleModal ? (
        <div id="InsertModuleModal" className="insertModal">
          Hello this is modal
        </div>
      ) : null}
      <header>
        <h1>Course builder</h1>
        <AddButton insertModuleToggle={setInsertModuleModal} />
      </header>
      <div className="content">
        <div className="empty-state">
          <img src={img1} alt="Box with items" />
        </div>
      </div>
    </div>
  );
};

export default CourseBuilder;
