import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

type ClientCardInfoTypes = {
  fullName: string;
  email: string;
  phoneNumber: string;
  observations: string;
};

const ClientCardInfo = ({ client }: ClientCardInfoTypes) => {
  const { created_at, fullName, email, phoneNumber, observations } = client;

  const mailto = `mailto:${email}`;
  const phoneto = `tel:${phoneNumber}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex text-lg sm:text-2xl sm:items-center gap-4">
          {fullName}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex sm:gap-10">
          <div className="mb-4 grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0">
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-gray-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                Email :{" "}
                <Link
                  to={mailto}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-yellow-700 cursor-pointer"
                >
                  {email}
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="flex sm:gap-10">
          <div className="mb-4 grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0">
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-gray-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                Phone number :{" "}
                <span className="text-primary cursor-pointer">
                  <Link
                    to={phoneto}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary cursor-pointer"
                  >
                    {phoneNumber}
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
        {observations && (
          <div className="flex sm:gap-10">
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-gray-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">observations</p>
                <p className="text-sm text-muted-foreground">{observations}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground text-right w-full">
          <p>Created {format(new Date(created_at), " MMM dd yyyy")}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ClientCardInfo;
