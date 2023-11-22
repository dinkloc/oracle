import styled from "styled-components";
import StaffRow from "./StaffRow";
import { useEffect } from "react";
import { useState } from "react";

// import Spinner from "../../ui/Spinner";
// import CabinRow from "./CabinRow";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function StaffTable() {
  const [staffs, setStaffs] = useState([]);
  const fetchStaffData = () => {
    fetch("http://localhost:3000/api/v1/staffs")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setStaffs(data.data);
      });
  };
  useEffect(() => {
    fetchStaffData();
  }, []);
  return (
    <Table role="table">
      <TableHeader role="row">
        <div>Id</div>
        <div>Name</div>
        <div>Date of Birth</div>
        <div>Role</div>
        <div>Salary</div>
      </TableHeader>
      {staffs.map((staff) => (
        <StaffRow staff={staff} key={staff.MA_NHAN_VIEN} />
      ))}
    </Table>
  );
}

export default StaffTable;
