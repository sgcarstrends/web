import type { Car } from "@/types";

export const sortByMake = (a: Car, b: Car) => a.make.localeCompare(b.make);
