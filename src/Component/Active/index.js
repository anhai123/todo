import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
function Active() {
  const location = useLocation();
  const from = location.state;
  // console.log(from);
  return (
    // {props.map((todo) => {
    //     return (
    //       <li>
    //         <div className="view">
    //           <input
    //             type="checkbox"
    //             className="toggle"
    //             onChange={handleChange}
    //           ></input>
    //           <label htmlFor="">{todo}</label>
    //           <button className="destroy"></button>
    //         </div>
    //       </li>
    //     );
    //   })}
    <div>hello</div>
  );
}

export default Active;
