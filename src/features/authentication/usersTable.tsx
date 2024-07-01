import { HiPlus } from "react-icons/hi";
import { CreateForm } from "./createForm";
import DivAnimation from "@/components/divAnimation";

const UsersTable = () => {
  return (
    <>
      <DivAnimation className="flex gap-4 justify-end">
        <CreateForm
          text="New user"
          icon={<HiPlus size={20} />}
          title="Create a new user"
          observations="Please fill out the form below to create a new user. Once
              submitted, the user will be added to your account."
        />
      </DivAnimation>
    </>
  );
};

export default UsersTable;
