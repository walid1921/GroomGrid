import { ModeToggle } from "@/components/mode-toggle";
import UpdateSettingsForm from "@/features/settings/UpdateSettingsForm";

function Settings() {
  return (
    <>
      <div className="sm:hidden fixed right-6">
        <ModeToggle />
      </div>
      <h1>Settings</h1>
      <UpdateSettingsForm />
    </>
  );
}

export default Settings;
