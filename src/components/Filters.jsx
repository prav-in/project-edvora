import React, { useState } from "react";
import { format, parse } from "date-fns";
import { getDistance } from "./Ride";
import Dropdown from "./Dropdown";

import "../scss/Filters.scss";

const Filters = ({ setFilteredRides, rides, userStationCode: c }) => {
  // state stuff
  const [upcoming, setUpcoming] = useState(0);
  const [past, setPast] = useState(0);
  const [selected, setSelected] = useState([false, false, false]);

  // functions

  const formatDate = (r) => {
    return format(parse(r.date.replace(" ", ", "), "Pp", new Date()), "t");
  };

  // filters
  const handleNearestFilter = () => {
    setSelected([true, false, false]);
    let filteredRides = [...rides];
    filteredRides = filteredRides.sort((a, b) => {
      return getDistance(a, c) - getDistance(b, c);
    });
    setFilteredRides(filteredRides);
  };

  const handleUpcomingFilter = () => {
    setSelected([false, true, false]);
    const now = format(new Date(), "t");
    let filteredRides = [...rides];
    filteredRides = filteredRides.filter((ride) => now < formatDate(ride));
    filteredRides = filteredRides.sort((a, b) => {
      return formatDate(a) - formatDate(b);
    });
    setUpcoming(filteredRides.length);
    setFilteredRides(filteredRides);
  };

  const handlePastFilter = () => {
    setSelected([false, false, true]);
    const now = format(new Date(), "t");
    let filteredRides = [...rides];
    filteredRides = filteredRides.filter((ride) => now > formatDate(ride));
    filteredRides = filteredRides.sort((a, b) => {
      return formatDate(b) - formatDate(a);
    });
    setPast(filteredRides.length);
    setFilteredRides(filteredRides);
  };

  return (
    <nav className="navbar">
      <ul className="navbar__filters">
        <li
          className={selected[0] ? "selected" : ""}
          onClick={handleNearestFilter}
        >
          Nearest Rides
        </li>
        <li
          className={selected[1] ? "selected" : ""}
          onClick={handleUpcomingFilter}
        >
          Upcoming Rides {upcoming ? `(${upcoming})` : "(0)"}
        </li>
        <li
          className={selected[2] ? "selected" : ""}
          onClick={handlePastFilter}
        >
          Past Rides {past ? `(${past})` : ""}
        </li>
      </ul>

      <Dropdown rides={rides} setFilteredRides={setFilteredRides} />
    </nav>
  );
};

export default Filters;
