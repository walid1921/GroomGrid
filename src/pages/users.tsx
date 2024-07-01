import { Row } from "@/components/row";
import TitleAnimation from "@/components/titleAnimation";
import UsersTable from "@/features/authentication/usersTable";

function Users() {
  return (
    <>
      <Row className="flex-col sm:flex-row items-start gap-[1.6rem]">
        <TitleAnimation>Create a new user</TitleAnimation>
      </Row>
      <Row variant="vertical">
        <UsersTable />
      </Row>
    </>
  );
}

export default Users;
