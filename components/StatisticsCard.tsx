"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { DistributionPieChart } from "@/app/cars/DistributionPieChart";
import { Progress } from "@/app/components/Progress";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FUEL_TYPE } from "@/config";
import { formatPercent } from "@/utils/formatPercent";

export const StatisticsCard = ({
  title,
  description,
  data,
  total,
  // TODO: Temporary solution
  linkPrefix,
}: {
  title: string;
  description: string;
  data: Record<string, number>;
  total: number;
  // TODO: Temporary solution
  linkPrefix?: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleRowClick = (type: string) => {
    router.push(
      `/cars/${linkPrefix}/${encodeURIComponent(type.toLowerCase())}?${searchParams}`,
    );
  };

  const getBadgeVariant = (value: number) => {
    const percentage = (value / total) * 100;
    if (percentage > 30) return "default";
    if (percentage > 15) return "secondary";
    return "outline";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <DistributionPieChart data={data} type={title} />
          {Object.keys(data).includes(FUEL_TYPE.OTHERS) && (
            <p className="text-sm italic text-muted-foreground">
              Note: We do not know what is the Land Transport Authority&apos;s
              exact definition of &quot;Others&quot;.
            </p>
          )}
          <Table>
            <TableCaption>Click on each row for more details</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Count</TableHead>
                <TableHead>Distribution</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(data)
                .filter(([_, value]) => value)
                .sort(([_A, numberA], [_B, numberB]) => numberB - numberA)
                .map(([key, value], index) => (
                  <TableRow
                    key={key}
                    className="cursor-pointer"
                    onClick={() => handleRowClick(key)}
                  >
                    <TableCell>
                      <div className="flex flex-col gap-2">{key}</div>
                    </TableCell>
                    <TableCell className="flex gap-1 font-semibold text-primary">
                      {value}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(value)}>
                        {formatPercent(value / total, {
                          minimumFractionDigits: 2,
                        })}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
