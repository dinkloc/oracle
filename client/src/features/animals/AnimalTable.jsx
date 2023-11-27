import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import AnimalRow from "./AnimalRow";

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

function AnimalTable() {
  const [animals, setAnimals] = useState([]);
  const fetchStaffData = () => {
    fetch("http://localhost:3000/api/v1/animals")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAnimals(data.data);
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
        <div>Date Of Birth</div>
        <div>Health</div>
        <div>Desc</div>
        <div>Date</div>
      </TableHeader>
      {animals.map((animal) => (
        <AnimalRow animal={animal} key={animal.MA_DONG_VAT} />
      ))}
    </Table>
  );
}

export default AnimalTable;
