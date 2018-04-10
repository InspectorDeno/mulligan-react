import React from "react";
import GetWeather from "../GetWeather";

const DashboardPage = () => (
  <div>
    <GetWeather />
    <GetWeather />
    <GetWeather />
  </div>
);

DashboardPage.propTypes = {
  // isConfirmed: PropTypes.bool.isRequired
};

export default DashboardPage;
