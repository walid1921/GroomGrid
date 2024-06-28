import { Row } from "@/components/row";
import { TabsAccount } from "@/components/tabsAccount";
import { UpdateUserData } from "@/features/authentication/updateUserData";

function Account() {
  return (
    <>
      <h1>Update your account</h1>

      <div className="flex justify-center gap-96">
        <Row variant={"vertical"}>
          <h3 className="text-center">Update user data</h3>
          <UpdateUserData />
        </Row>
        <Row variant={"vertical"}>
          <TabsAccount />
        </Row>

        <Row variant={"vertical"}>
          <h3 className="text-center">Update password</h3>
          <p>Update user password form</p>
        </Row>
      </div>
    </>
  );
}

export default Account;
