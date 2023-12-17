import { useEffect, useState } from "react";
import styled from "styled-components";
import Heading from "../ui/Heading";
import { useParams } from "react-router-dom";
const Div = styled.div`
  margin: 20px;
`;

const Label = styled.label`
  width: 100px;
  display: block;
`;
const EditStaff = () => {
  const { _id } = useParams();
  console.log(_id);
  const [staff, setStaff] = useState({});
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const setData = () => {
    setName(() => staff.HO_TEN);
    setDateOfBirth(() => staff.NGAY_SINH);
    setRole(() => staff.VI_TRI);
    setSalary(() => staff.MUC_LUONG);
    setPhoneNumber(() => staff.SO_DIEN_THOAI);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await fetch(`http://localhost:3000/api/v1/staffs/${_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        HO_TEN: name,
        NGAY_SINH: dateOfBirth,
        VI_TRI: role,
        MUC_LUONG: salary,
        SO_DIEN_THOAI: phoneNumber,
      }),
    });
    setNull();
  };
  const fetchStaffData = () => {
    fetch(`http://localhost:3000/api/v1/staffs/${_id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setStaff(data.staff);
        setData();
      });
  };
  useEffect(() => {
    fetchStaffData();
  }, []);
  const setNull = () => {
    setName("");
    setDateOfBirth("");
    setRole("");
    setSalary("");
    setPhoneNumber("");
  };
  return (
    <>
      <Heading as="h1">Edit Info Staff</Heading>
      <form onSubmit={onSubmit}>
        <Div>
          <Label>Ho Ten</Label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Div>
        <Div>
          <Label>Ngay Sinh</Label>
          <input
            value={dateOfBirth}
            onChange={(event) => setDateOfBirth(event.target.value)}
          />
        </Div>
        <Div>
          <Label>Vi Tri</Label>
          <input
            value={role}
            onChange={(event) => setRole(event.target.value)}
          />
        </Div>
        <Div>
          <Label>Muc Luong</Label>
          <input
            value={salary}
            onChange={(event) => setSalary(event.target.value)}
          />
        </Div>
        <Div>
          <Label>Sdt</Label>
          <input
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </Div>
        <Div>
          <button
            style={{
              padding: "8px",
              border: "1px solid black",
              backgroundColor: "blue",
              color: "white",
            }}
          >
            EDIT
          </button>
        </Div>
      </form>
    </>
  );
};

export default EditStaff;
