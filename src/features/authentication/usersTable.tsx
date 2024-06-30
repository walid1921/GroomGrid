import { HiPlus } from "react-icons/hi";
import { CreateForm } from "./createForm";

const UsersTable = () => {
  return (
    <>
      <div className="flex gap-4 justify-end">
        <CreateForm
          bgPrimary="bg-primary "
          icon={<HiPlus size={20} />}
          title="Create a new user"
          observations="Please fill out the form below to create a new user. Once
              submitted, the user will be added to your account."
        />
      </div>
    </>
  );
};

export default UsersTable;
