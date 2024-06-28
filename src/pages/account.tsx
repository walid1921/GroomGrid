import { Row } from "@/components/row";
import { TabsAccount } from "@/components/tabsAccount";

function Account() {
  return (
    <>
      <h1>Update your account</h1>
      <div className="flex justify-center gap-96">
        <Row variant={"vertical"}>
          <TabsAccount />
        </Row>
      </div>
    </>
  );
}

export default Account;
