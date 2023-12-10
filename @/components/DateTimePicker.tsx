"use client";
 
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
 
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePickerDemo } from "./time-picker-demo"
 
export function DateTimePicker({ value, onChange, name, ...otherProps }:any) {
  const [date, setDate] = React.useState<Date>();
 
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP HH:mm:ss") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(selectedDate) => onChange(selectedDate)}
          initialFocus
        />
        <div className="p-3 border-t border-border">
          <TimePickerDemo setDate={(selectedDate) => onChange(selectedDate)} date={value} />
        </div>
      </PopoverContent>
    </Popover>
  );
}