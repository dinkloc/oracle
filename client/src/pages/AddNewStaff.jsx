import { useState } from "react";
import Heading from "../ui/Heading";
import styled from "styled-components";
const Div = styled.div`
  margin: 20px;
`;

const Label = styled.label`
  width: 100px;
  display: block;
`;

function AddNewStaff() {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    await fetch("http://localhost:3000/api/v1/staffs", {
      method: "POST",
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
  const setNull = () => {
    setName("");
    setDateOfBirth("");
    setRole("");
    setSalary("");
    setPhoneNumber("");
  };
  return (
    <>
      <Heading as="h1">Add New Staff</Heading>
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
          <button>Add New</button>
        </Div>
      </form>
    </>
  );
}

export default AddNewStaff;
