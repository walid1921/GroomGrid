import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { updateWorkingTimeSchema } from "@/validators/updateWorkingTime";

import { HiPencil } from "react-icons/hi2";
import useUpdateWorkingTime from "./useUpdateWorkingTime";
import { Input } from "@/components/ui/input";

type InputType = z.infer<typeof updateWorkingTimeSchema>;

type workingTimeProps = {
  id: number;
  day: string;
  isOpen: boolean;
  start: number;
  end: number;
};

export function UpdateTime({
  workingTimeToEdit,
}: {
  workingTimeToEdit: workingTimeProps;
}) {
  const { id, day, isOpen, start, end } = workingTimeToEdit;

  const form = useForm<InputType>({
    resolver: zodResolver(updateWorkingTimeSchema),
    defaultValues: { day, isOpen, start, end },
  });

  //! Edit working time
  const { isUpdating, updateTime } = useUpdateWorkingTime();

  //! Submit form
  const onSubmit = (data: InputType) => {
    const formattedData = {
      day: data.day,
      isOpen: data.isOpen,
      start: Number(data.start),
      end: Number(data.end),
    };
    updateTime({ id, data: formattedData });
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="flex gap-2 bg-background w-full h-8 border-none">
            <HiPencil size={20} /> Update
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              Edit your working time for{" "}
              <span className="text-[#3ecf8e80] uppercase">{day}</span>{" "}
            </SheetTitle>
          </SheetHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3 sm:gap-8 mt-10"
            >
              <FormField
                control={form.control}
                name="isOpen"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      defaultValue={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">Open</SelectItem>
                        <SelectItem value="false">Blocked</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="start"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="23"
                        placeholder="Start Time"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="23"
                        placeholder="End Time"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SheetClose className="sm:mt-10 mt-4">
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="hover:text-primary-foreground border border-[#3ecf8e4d] hover:bg-[#3ecf8e80]"
                >
                  Save Changes
                </Button>
              </SheetClose>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
}
