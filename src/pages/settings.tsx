import { ModeToggle } from "@/components/mode-toggle";
import UpdateSettingsForm from "@/features/settings/UpdateSettingsForm";

function Settings() {
  return (
    <>
      <h1>Settings</h1>
      <UpdateSettingsForm />
      <ModeToggle />
    </>
  );
}

export default Settings;
