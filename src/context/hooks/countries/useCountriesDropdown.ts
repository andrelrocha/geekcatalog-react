import { useEffect, useState } from "react";
import { listAllCountries } from "../../../services/countries/listAll";
import { DropdownData } from "../../../types/utils/dropDownDTO";
import CountryReturn from "../../../types/countries/countryReturnDTO";

export default function useCountriesDropdown() {
  const [dropdownData, setDropdownData] = useState<DropdownData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listAllCountries();
        const dropdownData = data.map((country: CountryReturn) => ({
            value: country.id,
            label: country.name,
        }));
        setDropdownData(dropdownData);
      } catch (error: any) {
        const errorMessage = error.response?.data || error.message || "Failed to load countries data";
        alert("Error fetching countries: " + errorMessage);
      }
    };
    fetchData();
  }, []);

    return { dropdownData, setDropdownData };
}