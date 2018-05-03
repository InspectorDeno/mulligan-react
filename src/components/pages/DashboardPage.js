import React from "react";
import GetWeather from "../GetWeather";

const DashboardPage = () => (
  <div>
    <GetWeather />
  </div>
);

DashboardPage.propTypes = {
  // isConfirmed: PropTypes.bool.isRequired
};

export default DashboardPage;
