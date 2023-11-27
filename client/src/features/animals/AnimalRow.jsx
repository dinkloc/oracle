import styled from "styled-components";
import { HiPencil, HiTrash } from "react-icons/hi2";
// import { useNavigate } from "react-router-dom";

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
          <button>
            <HiPencil />
          </button>
          <button>
            <HiTrash />
          </button>
        </div>
      </TableRow>
    </>
  );
}

export default AnimalRow;
