// import React, { useState } from "react";
// import AddButton from "./AddButton";
// import "./CourseBuilder.css";
// import img1 from "../images/img1.png";

// const CourseBuilder = () => {

//   return (
//     <div className="course-builder">
//       {" "}
//       <header>
//         <h1>Course builder</h1>
//         <AddButton />{" "}
//       </header>{" "}
//       <div className="content">
//         {" "}
//         <div className="empty-state">
//           <img src={img1} alt="Box with items" />{" "}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseBuilder;

import React, { useState } from "react";
import AddButton from "./AddButton";
import "./CourseBuilder.css";
import img1 from "../images/img1.png";

const CourseBuilder = () => {
  const [modules, setModules] = useState([]);

  // Function to add a new module to the list
  const addModule = (moduleName) => {
    console.log("Moduledss:", modules);
    setModules([...modules, moduleName]);
  };

  return (
    <div className="course-builder">
      <header>
        <h1>Course builder</h1>
        <AddButton onModuleCreate={addModule} />{" "}
      </header>
      <div className="content">
        {modules.length === 0 ? (
          <div className="empty-state">
            <img src={img1} alt="Box with items" />
          </div>
        ) : (
          <ul className="module-list">
            {modules.map((module, index) => (
              <li key={index}>{module}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CourseBuilder;
