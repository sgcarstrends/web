import { KeyStatistics } from "@/app/components/KeyStatistics";
import { TotalNewCarRegistrationsByYear } from "@/app/components/TotalNewCarRegistrationsByYear";
import { Top5CarMakesByYear } from "@/app/components/Top5CarMakesByYear";
import Typography from "@/components/Typography";
import { FEATURE_FLAG_RELEASED } from "@/config";

const data = [
  { year: 2013, total: 22472 },
  { year: 2014, total: 28932 },
  { year: 2015, total: 57589 },
  { year: 2016, total: 87504 },
  { year: 2017, total: 91922 },
  { year: 2018, total: 80281 },
  { year: 2019, total: 72344 },
  { year: 2020, total: 44465 },
  { year: 2021, total: 45442 },
  { year: 2022, total: 30939 },
  { year: 2023, total: 30225 },
];

const topMakes2023 = [
  { make: "BYD", value: 1416 },
  { make: "Toyota", value: 7248 },
  { make: "BMW", value: 3436 },
  { make: "Mercedes Benz", value: 4317 },
  { make: "Honda", value: 2631 },
];

const HomePage = () => {
  return (
    <section className="flex flex-col gap-y-8">
      <Typography.H1>Dashboard</Typography.H1>
      <div className="flex flex-col gap-y-4">
        {FEATURE_FLAG_RELEASED && (
          <>
            <TotalNewCarRegistrationsByYear data={data} />
            <KeyStatistics data={data} />
            <Top5CarMakesByYear topMakes2023={topMakes2023} />
          </>
        )}
      </div>
    </section>
  );
};

export default HomePage;
