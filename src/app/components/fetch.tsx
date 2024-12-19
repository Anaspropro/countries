"use client";

type FilterProps = {
  currentRegion: string; // The currently selected region
};

export default function Filter({ currentRegion }: FilterProps) {
  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const region = event.target.value;
    const searchParams = new URLSearchParams(window.location.search);
    if (region) {
      searchParams.set("region", region);
    } else {
      searchParams.delete("region");
    }
    window.location.search = searchParams.toString(); // Update URL and reload the page
  };

  return (
    <select
      name="region"
      defaultValue={currentRegion}
      onChange={handleRegionChange}
      className="bg-gray-800 text-white p-2 rounded"
    >
      <option value="">Filter by region</option>
      <option value="africa">Africa</option>
      <option value="europe">Europe</option>
      <option value="asia">Asia</option>
      <option value="antarctic">Antarctic</option>
      <option value="americas">Americas</option>
      <option value="oceania">Oceania</option>
    </select>
  );
}
