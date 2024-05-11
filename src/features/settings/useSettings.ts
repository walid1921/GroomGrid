import { getSettings } from "@/api/apiSettings";
import { useQuery } from "@tanstack/react-query";

function UseSettings() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return {
    isLoading,
    error,
    settings,
  };
}

export default UseSettings;
