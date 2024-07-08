import { HiPlus } from "react-icons/hi";
import { CreateForm } from "./createForm";

const CreateUser = () => {
  return (
    <>
      <CreateForm
        text="New user"
        icon={<HiPlus size={20} />}
        title="Create a new user"
        observations="Please fill out the form below to create a new user. Once
              submitted, the user will be added to your account."
      />
    </>
  );
};

export default CreateUser;
