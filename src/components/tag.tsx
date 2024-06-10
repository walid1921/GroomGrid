const Tag = ({ status }: { status: string }) => {
  return (
    <span
      className={`${
        status === "unconfirmed" ? "text-blue-800 bg-blue-200 font-bold " : ""
      } ${
        status === "checked-in" ? "text-green-800 bg-green-200 font-bold" : ""
      } ${
        status === "checked-out" ? " text-slate-800 bg-slate-300 font-bold" : ""
      }  px-3 py-[5px] rounded-full`}
    >
      {" "}
      {status}
    </span>
  );
};

export default Tag;
