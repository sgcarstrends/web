"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { DistributionPieChart } from "@/app/cars/DistributionPieChart";
import { Progress } from "@/app/components/Progress";
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
  const params = useSearchParams();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <DistributionPieChart data={data} type={title} />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Count</TableHead>
                <TableHead>% of Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(data)
                .filter(([_, value]) => value)
                .sort(([_A, numberA], [_B, numberB]) => numberB - numberA)
                .map(([key, value]) => {
                  return (
                    <TableRow
                      key={key}
                      className="group cursor-pointer rounded px-2 py-1 transition-colors duration-200 hover:bg-secondary"
                    >
                      <TableCell>
                        <Link
                          href={{
                            pathname: `/${linkPrefix}/${encodeURIComponent(key.toLowerCase())}`,
                            query: params.toString(),
                          }}
                          className="flex gap-1"
                        >
                          <span>{key}</span>
                          <ArrowUpRight className="h-4 w-4 text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                        </Link>
                      </TableCell>
                      <TableCell className="flex gap-1 font-semibold text-primary">
                        {value}
                      </TableCell>
                      <TableCell>
                        <Progress value={value / total}>
                          {formatPercent(value / total, {
                            minimumFractionDigits: 2,
                          })}
                        </Progress>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          {Object.keys(data).includes(FUEL_TYPE.OTHERS) && (
            <p className="text-sm text-muted-foreground">
              Note: We do not know what is the Land Transport Authority&apos;s
              exact definition of &quot;Others&quot;.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
