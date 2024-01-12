import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCar,
  faList,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Partnersidebar() {
  return (
    <>
      <div className="w-2/4  md:w-1/5 lg:w-1/5 bg-black text-white">
        <div className="px-4 md:px-10 py-2 md:py-11">
          <p className="inline-block text-2xl md:text-1xl  text-gray-600  lg:text-2xl">
            <FontAwesomeIcon icon={faHome} />
            Dashboard
          </p>
        </div>
        <div className="px-4 md:px-10 py-4 md:py-11">
          <p className="inline-block text-1xl  text-gray-600  md:text-3xl lg:text-2xl">
            <Link to="/partner/addcar">
              <FontAwesomeIcon icon={faCar} />
              Add Car
            </Link>
          </p>
        </div>
        <div className="px-4 md:px-10 py-4 md:py-11">
          <p className="inline-block text-1xl  text-gray-600 md:text-3xl lg:text-2xl">
          <FontAwesomeIcon icon={faList} />
            <Link to="/partner/carlist">
              Car List
            </Link>
          </p>{" "}
        </div>
        <div className="px-4 md:px-10 py-4 md:py-11">
          <p className="inline-block text-1xl  text-gray-600 md:text-3xl lg:text-2xl">
            <Link to="/partner/booking">
              <FontAwesomeIcon icon={faBook} />
              BookList
            </Link>{" "}
          </p>
        </div>
      </div>
    </>
  );
}

export default Partnersidebar;
