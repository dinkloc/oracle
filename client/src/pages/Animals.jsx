import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AnimalTable from "../features/animals/AnimalTable";
function Animals() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Animals</Heading>
      </Row>
      <Row>
        <AnimalTable />
      </Row>
    </>
  );
}

export default Animals;
