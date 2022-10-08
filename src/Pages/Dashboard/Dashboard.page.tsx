import { Route, Routes } from "react-router-dom";
import { Navbar, Sidebar } from "../../stories";
import { LeaveRequest } from "../../components";
import { sidebarTabData } from "../../Util/Constants";
import * as styles from "./Dashboard.module.scss";
import { ProfilePage } from "..";

function Dashboard() {
  return (
    <>
      <Navbar />
      <Sidebar
        user="John Doe"
        position="Admin"
        sidebarTabData={sidebarTabData}
        userImage={"./assets/images/profile.png"}
      />
      <div className={styles.maincontent}>
        <Routes>
          <Route path="/home" element={<ProfilePage />} />
          <Route path="/holidays" element={<h1>Holidays</h1>} />
          <Route
            path="leaverequest"
            element={<LeaveRequest logindate={"18/10/2022"} />}
          />
          <Route
            path="/manageleaverequest"
            element={<h1>manageleaverequest</h1>}
          />
          <Route path="/employeelist" element={<h1>employeelist</h1>} />
          <Route
            path="/employeeleaveslist"
            element={<h1>employeeleaveslist</h1>}
          />
          <Route path="/leavetype" element={<h1>leavetype</h1>} />
          <Route path="/department" element={<h1>department</h1>} />
        </Routes>
      </div>
    </>
  );
}

export default Dashboard;
