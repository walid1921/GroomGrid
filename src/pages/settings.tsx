import TitleAnimation from "@/components/titleAnimation";
import UsersTable from "@/features/authentication/usersTable";
import UpdateSettingsForm from "@/features/settings/UpdateSettingsForm";
import { Row } from "@/components/row";

function Settings() {
  return (
    <>
      <TitleAnimation>Settings</TitleAnimation>
      <Row variant="vertical">
        <UsersTable />
      </Row>
      <UpdateSettingsForm />
    </>
  );
}

export default Settings;
