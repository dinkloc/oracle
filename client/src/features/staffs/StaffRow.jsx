import styled from "styled-components";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const ID = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const DateOfBirth = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Role = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function StaffRow({ staff }) {
  const navigate = useNavigate();
  const onDelete = async (id) => {
    await fetch(`http://localhost:3000/api/v1/staffs/${id}`, {
      method: "DELETE",
    });
  };
  console.log(staff);
  return (
    <>
      <TableRow role="row">
        <ID>{staff.MA_NHAN_VIEN}</ID>
        <div>{staff.TEN_NHAN_VIEN}</div>
        <DateOfBirth>{staff.NGAY_SINH}</DateOfBirth>
        <Role>{staff.VI_TRI}</Role>
        <div>{staff.MUC_LUONG} VND</div>
        <div>
          <button style={{ padding: "5px", backgroundColor: "white" }}>
            <HiPencil
              style={{ color: "blue", fontSize: "20px" }}
              onClick={() => navigate(`edit/${staff.MA_NHAN_VIEN}`)}
            />
          </button>
          <button
            style={{
              padding: "5px",
              backgroundColor: "white",
              margin: "0 0 0 10px",
            }}
          >
            <HiTrash
              style={{ color: "red", fontSize: "20px" }}
              onClick={() => {
                onDelete(staff.MA_NHAN_VIEN);
              }}
            />
          </button>
        </div>
      </TableRow>
    </>
  );
}

export default StaffRow;
