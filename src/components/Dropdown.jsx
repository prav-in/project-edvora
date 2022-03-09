import React, { useState, useEffect, useRef } from "react";
import { useTransition, animated } from "react-spring";
import { BiMenuAltLeft } from "react-icons/bi";
import { state_arr } from "../data/location";
import { s_a } from "../data/location";
import "../scss/Dropdown.scss";

export default function Dropdown({ rides, setFilteredRides }) {
  // state stuff
  const [stateIndia, setStateIndia] = useState("State");
  const [city, setCity] = useState("City");
  const [isOpen, setIsOpen] = useState(false);
  const dropRef = useRef();

  const transition = useTransition(isOpen, {
    from: { scale: 0 },
    enter: { scale: 1 },
    leave: { scale: 0 },
    duration: 1,
  });

  useEffect(() => {
    let handler = (event) => {
      if (dropRef.current === null) return;
      if (!dropRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  // functions
  const handleLocationFilter = () => {
    let filtered = [...rides];

    let stateIn = stateIndia === "State" ? "State" : state_arr[stateIndia];
    let cityIn =
      city === "City" ? "City" : s_a[stateIndia].trim().split(" | ")[city];

    filtered = filtered.filter((ride) => {
      return stateIn === "State"
        ? true
        : cityIn === "City"
        ? ride.state === stateIn
        : ride.state === stateIn && ride.city === cityIn;
    });

    setFilteredRides(filtered);
  };

  return (
    <div ref={dropRef} className="dropdown">
      <div className="dropdown__container" onClick={() => setIsOpen(!isOpen)}>
        <BiMenuAltLeft className="dropdown__btn" />
        <span>Filter</span>
      </div>

      {transition((styles, item) => {
        return (
          item && (
            <animated.div
              style={styles}
              id="myDropdown"
              className="dropdown__content"
            >
              <div className="dropdown__content__title">Filters</div>
              <select
                onClick={handleLocationFilter}
                onChange={(e) => {
                  setCity("City");
                  setStateIndia(e.target.value);
                }}
                className="selection"
                name="state"
                id="state"
              >
                <option value="State">State</option>
                {state_arr.map((state, index) => (
                  <option key={state} value={index}>
                    {state}
                  </option>
                ))}
              </select>

              <select
                onClick={handleLocationFilter}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                className="selection"
                name="city"
                id="city"
              >
                <option value="City">City</option>
                {s_a[stateIndia] &&
                  s_a[stateIndia]
                    .trim()
                    .split(" | ")
                    .map((city, index) => (
                      <option key={city} value={index}>
                        {city}
                      </option>
                    ))}
              </select>
            </animated.div>
          )
        );
      })}
    </div>
  );
}
