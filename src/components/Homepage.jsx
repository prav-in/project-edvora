import React, { useEffect, useState } from "react";
import Header from "./Header";
import Filters from "./Filters";
import Ride from "./Ride";
import axios from "axios";

const RIDE_API = "https://assessment.api.vweb.app/rides";
const USER_API = "https://assessment.api.vweb.app/user";

const Homepage = () => {
  // state stuff
  const [user, setUser] = useState({});
  const [rides, setRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);

  useEffect(() => {
    axios
      .get(RIDE_API)
      .then((res) => {
        setRides(res.data);
        setFilteredRides(res.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(USER_API)
      .then((res) => setUser(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Header user={user} />
      <Filters
        setFilteredRides={setFilteredRides}
        rides={rides}
        userStationCode={user.station_code}
      />
      <main>
        {filteredRides.map((ride, i) => (
          <Ride
            key={ride.date + i}
            rideData={ride}
            userStationCode={user.station_code}
          />
        ))}
      </main>
    </>
  );
};

export default Homepage;
