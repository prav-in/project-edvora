import React from "react";
import { format, parse } from "date-fns";
import "../scss/Ride.scss";

const getDistance = (rideData, c) => {
  let path = [
    rideData.origin_station_code,
    ...rideData.station_path,
    rideData.destination_station_code,
  ];
  let ind = path.length;
  for (let i = 0; i < path.length; i++) {
    if (c <= path[i]) {
      ind = i;
      break;
    }
  }

  let min = 0;
  if (ind === 0) {
    min = path[0] - c;
  } else {
    min = Math.min(c - path[ind - 1], path[ind] - c);
  }

  return min;
};

const Ride = ({ rideData, userStationCode: c }) => {
  // functions

  const getFormattedDate = () => {
    let date = rideData.date;
    date = date.replace(" ", ", ");
    const day = format(parse(date, "Pp", new Date()), "do");
    const month = format(parse(date, "Pp", new Date()), "MMM");
    const year = format(parse(date, "Pp", new Date()), "yyyy");
    const hour = format(parse(date, "Pp", new Date()), "HH");
    const minute = format(parse(date, "Pp", new Date()), "mm");

    return `${day} ${month} ${year} ${hour}:${minute}`;
  };

  return (
    <div className="ride">
      <img className="ride__map" src={rideData.map_url} alt="Ride Image" />
      <ul className="ride__list">
        <li>
          <span>Ride Id : </span>
          {rideData.id}
        </li>
        <li>
          <span>Origin Station : </span>
          {rideData.origin_station_code}
        </li>
        <li>
          <span>station_path : </span>
          {`[${rideData.origin_station_code}, ${rideData.station_path.join(
            ", "
          )}, ${rideData.destination_station_code}]`}
        </li>
        <li>
          <span>Date : </span> {getFormattedDate()}
        </li>
        <li>
          <span>Distance :</span> {getDistance(rideData, c)}
        </li>
      </ul>
      <div className="ride__location">
        <div className="ride__location__place">{rideData.city}</div>
        <div className="ride__location__place">{rideData.state}</div>
      </div>
    </div>
  );
};

export default Ride;
export { getDistance };
