import React from "react";
import WrappedDashboard from "./dashboard";
import WrappedDashboardPro from "./dashboardPro";

const Dashboard = (props) => props.isPro?<WrappedDashboardPro {...props} />:<WrappedDashboard {...props} />;

export default Dashboard;
