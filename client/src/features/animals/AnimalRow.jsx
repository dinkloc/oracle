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

function AnimalRow({ animal }) {
  const navigate = useNavigate();
  const onDelete = async (id) => {
    await fetch(`http://localhost:3000/api/v1/animals/${id}`, {
      method: "DELETE",
    });
  };
  console.log(animal);
  return (
    <>
      <TableRow role="row">
        <ID>{animal.MA_DONG_VAT}</ID>
        <div>{animal.TEN}</div>
        <DateOfBirth>{animal.NGAY_SINH}</DateOfBirth>
        <Role>{animal.TRANG_THAI_SUC_KHOE}</Role>
        <div>{animal.MO_TA}</div>
        <div>
          <button style={{ padding: "5px", backgroundColor: "white" }}>
            <HiPencil
              onClick={() => navigate(`edit/${animal.MA_DONG_VAT}`)}
              style={{ color: "blue", fontSize: "20px" }}
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
              onClick={() => onDelete(animal.MA_DONG_VAT)}
              style={{ color: "red", fontSize: "20px" }}
            />
          </button>
        </div>
      </TableRow>
    </>
  );
}

export default AnimalRow;
