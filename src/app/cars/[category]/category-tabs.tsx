"use client";

import { Card, CardBody, Tabs, Tab } from "@heroui/react";
import { AnimatedNumber } from "@/components/animated-number";
import { formatDateToMonthYear } from "@/utils/format-date-to-month-year";

interface TypeItem {
  name: string;
  count: number;
}

interface Props {
  types: TypeItem[];
  month: string;
  category: string;
  title: string;
}

export const CategoryTypesTabsView = ({ types, month, title }: Props) => {
  return (
    <div className="w-full">
      <Tabs
        aria-label={`${title} Statistics`}
        variant="underlined"
        className="w-full"
      >
        {types.map((type) => {
          const TypeTabContent = () => {
            return (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardBody className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        <AnimatedNumber value={type.count} />
                      </div>
                      <p className="text-sm text-gray-600">
                        Total Registrations
                      </p>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {type.name}
                      </div>
                      <p className="text-sm text-gray-600">{title}</p>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {formatDateToMonthYear(month)}
                      </div>
                      <p className="text-sm text-gray-600">Period</p>
                    </CardBody>
                  </Card>
                </div>

                <div className="text-center text-sm text-gray-500">
                  Detailed statistics for {type.name} {title.toLowerCase()} in{" "}
                  {formatDateToMonthYear(month)}
                </div>
              </div>
            );
          };

          return (
            <Tab key={type.name} title={type.name}>
              <TypeTabContent />
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
};
