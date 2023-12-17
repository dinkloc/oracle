import { useState } from "react";
import styled from "styled-components";
import Heading from "../ui/Heading";
import { useParams } from "react-router-dom";
const Div = styled.div`
  margin: 20px;
`;

const Label = styled.label`
  width: 200px;
  display: block;
`;
const EditAnimal = () => {
  const { _id } = useParams();
  console.log(_id);
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [maLoai, setMaLoai] = useState("");
  const [gender, setGender] = useState("");
  const [nguonGoc, setNguonGoc] = useState("");
  const [healthStatus, setHealthStatus] = useState("");
  const [desc, setDesc] = useState("");
  const [maChuong, setMaChuong] = useState("");
  const [ngayVaoChuong, setNgayVaoChuong] = useState("");
  const [maLoaiThucAn, setMaLoaiThucAn] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    await fetch(`http://localhost:3000/api/v1/animals/${_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        TEN: name,
        NGAY_SINH: dateOfBirth,
        MA_LOAI: maLoai,
        GIOI_TINH: gender,
        NGUON_GOC: nguonGoc,
        TRANG_THAI_SUC_KHOE: healthStatus,
        MO_TA: desc,
        MA_CHUONG: maChuong,
        NGAY_VAO_CHUONG: ngayVaoChuong,
        MA_LOAI_THUC_AN: maLoaiThucAn,
      }),
    });
    setNull();
  };

  const setNull = () => {
    setName("");
    setDateOfBirth("");
    setMaLoai("");
    setGender("");
    setNguonGoc("");
    setHealthStatus("");
    setDesc("");
    setMaChuong("");
    setNgayVaoChuong("");
    setMaLoaiThucAn("");
  };
  return (
    <>
      <Heading as="h1">Edit Info Staff</Heading>
      <form onSubmit={onSubmit}>
        <Div>
          <Label>Tên</Label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Div>
        <Div>
          <Label>Mã Loài</Label>
          <input
            value={maLoai}
            onChange={(event) => setMaLoai(event.target.value)}
          />
        </Div>
        <Div>
          <Label>Ngày Sinh</Label>
          <input
            value={dateOfBirth}
            onChange={(event) => setDateOfBirth(event.target.value)}
          />
        </Div>
        <Div>
          <Label>Giới Tính</Label>
          <input
            value={gender}
            onChange={(event) => setGender(event.target.value)}
          />
        </Div>
        <Div>
          <Label>Nguồn Gốc</Label>
          <input
            value={nguonGoc}
            onChange={(event) => setNguonGoc(event.target.value)}
          />
        </Div>
        <Div>
          <Label>Trạng Thái Sức Khoẻ</Label>
          <input
            value={healthStatus}
            onChange={(event) => setHealthStatus(event.target.value)}
          />
        </Div>
        <Div>
          <Label>Mô Tả</Label>
          <input
            value={desc}
            onChange={(event) => setDesc(event.target.value)}
          />
        </Div>
        <Div>
          <Label>Mã Chuồng</Label>
          <input
            value={maChuong}
            onChange={(event) => setMaChuong(event.target.value)}
          />
        </Div>
        <Div>
          <Label>Ngày Vào Chuồng</Label>
          <input
            value={ngayVaoChuong}
            onChange={(event) => setNgayVaoChuong(event.target.value)}
          />
        </Div>
        <Div>
          <Label>Mã Loại Thức Ăn</Label>
          <input
            value={maLoaiThucAn}
            onChange={(event) => setMaLoaiThucAn(event.target.value)}
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
            Edit
          </button>
        </Div>
      </form>
    </>
  );
};

export default EditAnimal;
