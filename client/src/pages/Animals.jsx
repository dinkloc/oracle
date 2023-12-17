import { NavLink } from "react-router-dom";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AnimalTable from "../features/animals/AnimalTable";
function Animals() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Animals</Heading>
        <NavLink to="/animals/add">
          <button
            style={{
              padding: "8px",
              border: "1px solid black",
              backgroundColor: "green",
              color: "white",
            }}
          >
            ADD NEW ANIMAL
          </button>
        </NavLink>
      </Row>
      <Row>
        <AnimalTable />
      </Row>
    </>
  );
}

export default Animals;
