const Tag = ({ status }: { status: string }) => {
  return (
    <span
      className={`${
        status === "unconfirmed"
          ? "text-blue-200 bg-[#267fec7d] border border-[#599ef37d] font-bold "
          : ""
      } ${
        status === "checked-in"
          ? "text-[#a0dfc6] bg-[#33bb8e1a] border border-[#0b6b41] font-bold"
          : ""
      } ${
        status === "checked-out"
          ? " text-gray-200 bg-[#aaaaab7d] border border-[#bababa7d] font-bold"
          : ""
      }  px-3 py-[5px] rounded-full`}
    >
      {" "}
      {status}
    </span>
  );
};

export default Tag;
