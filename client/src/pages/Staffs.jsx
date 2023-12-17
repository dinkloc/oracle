import StaffTable from "../features/staffs/StaffTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { NavLink } from "react-router-dom";

function Staff() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Staffs</Heading>
        <NavLink to="/staffs/add">
          <button
            style={{
              padding: "8px",
              border: "1px solid black",
              backgroundColor: "green",
              color: "white",
            }}
          >
            Add New Staff
          </button>
        </NavLink>
      </Row>
      <Row>
        <StaffTable />
      </Row>
    </>
  );
}

export default Staff;
