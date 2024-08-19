"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Make } from "@/types";

interface MakeSelectorProps {
  makes: Make[];
  selectedMake: Make;
}

export const MakeSelector = ({ makes, selectedMake }: MakeSelectorProps) => {
  const router = useRouter();

  return (
    <div>
      <Select
        defaultValue={decodeURIComponent(selectedMake)}
        onValueChange={(make) => router.push(make)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a make" />
        </SelectTrigger>
        <SelectContent>
          {makes.map((make) => {
            return (
              <SelectItem key={make} value={make}>
                {make}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
