import DivAnimation from "@/components/divAnimation";
import { TabsAccount } from "@/components/tabsAccount";

function Account() {
  return (
    <DivAnimation className="flex flex-col gap-10">
      <h1>Update your account</h1>
      <div className="flex justify-center mt-10">
        <TabsAccount />
      </div>
    </DivAnimation>
  );
}

export default Account;
