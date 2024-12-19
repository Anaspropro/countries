"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import Filter from "./components/fetch";

interface Country {
  name: {
    common: string;
    official?: string;
  };
  cca3: string;
  population: number;
  capital: string[];
  region: string;
  flags: {
    svg: string;
  };
}

const fetchCountries = async (url: string): Promise<Country[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response not okay");
  }
  return response.json();
};

const CountriesList: React.FC = () => {
  const searchParams = useSearchParams();

  // Read `region` and `search` from query parameters
  const region = searchParams.get("region") || "";
  const search = searchParams.get("search") || "";

  // Construct the URL dynamically based on the query parameters
  const url = search
    ? `https://restcountries.com/v3.1/name/${search}`
    : region
    ? `https://restcountries.com/v3.1/region/${region}`
    : "https://restcountries.com/v3.1/all";

  const { data, error, isLoading } = useQuery<Country[], Error>({
    queryKey: ["countries", region, search],
    queryFn: () => fetchCountries(url),
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return (
      <p className="text-center text-xl">
        {search || region
          ? "No countries found. Please adjust your filters."
          : "Unable to fetch countries. Please try again later."}
      </p>
    );
  }

  return (
    <div className="px-8 py-28 md:px-12">
      {/* Search and Filter Section */}
      <div className="flex mb-8 justify-between items-center">
        {/* Search Form */}
        <form
          action="/"
          method="GET"
          className="bg-[#2b3945] flex items-center w-96"
        >
          <button
            type="submit"
            className="text-xl px-2 text-white"
            aria-label="Search"
          >
            <FaSearch />
          </button>
          <input
            type="search"
            name="search"
            placeholder="Search country by name"
            defaultValue={search}
            className="p-3 w-full bg-[#2b3945] outline-none text-xl"
            aria-label="Search for a country"
          />
        </form>

        {/* Region Filter */}
        <Filter currentRegion={region} />
      </div>

      {/* Countries Display */}
      <section className="grid md:grid-cols-3 gap-12">
        {data.map((country) => (
          <Link href={`/${country.cca3}`} key={country.cca3}>
            <div>
              <article className="rounded-lg shadow-black shadow overflow-hidden">
                <Image
                  src={country.flags.svg}
                  alt={`${country.name.common} flag`}
                  width={400}
                  height={300}
                  className="h-52 w-full object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="p-5">
                  <h1 className="text-2xl font-semibold my-4">
                    {country.name.common}
                  </h1>
                  <ul className="flex flex-col justify-start items-start gap-2 text-sm">
                    <li>Population: {country.population.toLocaleString()}</li>
                    <li>Region: {country.region}</li>
                    <li>Capital: {country.capital?.[0] || "N/A"}</li>
                  </ul>
                </div>
              </article>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default CountriesList;
