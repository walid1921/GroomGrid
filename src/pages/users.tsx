import { Row } from "@/components/row";
import UsersTable from "@/features/authentication/usersTable";

function Users() {
  return (
    <>
      <Row className="flex-col sm:flex-row items-start gap-[1.6rem]">
        <h1>Create a new user</h1>
      </Row>
      <Row variant="vertical">
        <UsersTable />
      </Row>
    </>
  );
}

export default Users;
