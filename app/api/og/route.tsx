import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { formatDateToMonthYear } from "@/utils/formatDateToMonthYear";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const title = searchParams.get("title");
  const type = searchParams.get("type");
  const make = searchParams.get("make");
  const month = searchParams.get("month");
  const formattedMonth = month && formatDateToMonthYear(month);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          backgroundColor: "#ffffff",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #e5e7eb 2%, transparent 0%), radial-gradient(circle at 75px 75px, #e5e7eb 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      >
        <div tw="flex h-[630px] w-[1200px] flex-col items-center justify-center relative">
          <div tw="flex items-center gap-x-2 absolute left-8 top-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2563eb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-trending-up"
            >
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
            <span tw="ml-2 text-sm font-bold lg:text-xl">
              <span tw="text-black">SGCars</span>
              <span tw="text-blue-600">Trends</span>
            </span>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              boxShadow:
                "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
              backgroundImage: "linear-gradient(90deg, #f9fafb, #e5e7eb)",
            }}
          >
            <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
              <div tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                {title || <span>Car Trends ({formattedMonth})</span>}
                {type && <span tw="capitalize text-blue-600">{type}</span>}
                {make && <span tw="capitalize text-blue-600">{make}</span>}
              </div>
              {/*<div tw="mt-8 flex md:mt-0">*/}
              {/*  <div tw="flex rounded-md shadow">*/}
              {/*    <a tw="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-3 text-base font-medium text-white">*/}
              {/*      Explore*/}
              {/*    </a>*/}
              {/*  </div>*/}
              {/*  <div tw="ml-3 flex rounded-md shadow">*/}
              {/*    <a tw="flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-blue-600">*/}
              {/*      Details*/}
              {/*    </a>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
};
