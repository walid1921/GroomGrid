import TitleAnimation from "@/components/titleAnimation";
import { Row } from "@/components/row";
import { WorkingTimeTable } from "@/features/workingTime/workingTimeTable";
import CreateUser from "@/features/authentication/createUser";
import UpdatePriceForm from "@/features/settings/updatePriceForm";
import DivAnimation from "@/components/divAnimation";
function Settings() {
  return (
    <>
      <Row>
        <TitleAnimation>Settings</TitleAnimation>
        <DivAnimation className="flex gap-5">
          <CreateUser />
          <UpdatePriceForm />
        </DivAnimation>
      </Row>

      <WorkingTimeTable />
    </>
  );
}

export default Settings;
