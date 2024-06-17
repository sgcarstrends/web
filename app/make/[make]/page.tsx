import { API_URL } from "@/config";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchApi } from "@/utils/fetchApi";
import { capitaliseWords } from "@/utils/capitaliseWords";
import type { Car } from "@/types";
import Link from "next/link";

interface Props {
  params: { make: string };
  searchParams: { month: string };
}

const CarMakePage = async ({ params, searchParams }: Props) => {
  const { make } = params;
  const { month } = searchParams;

  const cars = await fetchApi<Car[]>(`${API_URL}/make/${make}?month=${month}`);

  const excludeHeaders = ["_id", "make", "importer_type"];
  const tableHeaders = Object.keys(cars[0])
    .filter((item) => !excludeHeaders.includes(item))
    .map((header) => capitaliseWords(header));

  return (
    <section className="flex flex-col gap-y-8">
      <div className="flex items-end gap-x-2">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {decodeURIComponent(make)}
        </h1>
        <p className="text-xl text-muted-foreground">Registrations</p>
      </div>
      <Table>
        <TableCaption>Historical trends for {make}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            {tableHeaders.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars.map((car, index) => {
            const serial = index + 1;
            return (
              <TableRow key={car._id}>
                <TableCell>{serial}</TableCell>
                <TableCell>{car.month}</TableCell>
                <TableCell>
                  <Link
                    href={`/cars/${car.fuel_type.toLowerCase()}?month=${car.month}`}
                    className="hover:underline"
                  >
                    {car.fuel_type}
                  </Link>
                </TableCell>
                <TableCell>{car.vehicle_type}</TableCell>
                <TableCell>{car.number}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow></TableRow>
        </TableFooter>
      </Table>
    </section>
  );
};

export default CarMakePage;
