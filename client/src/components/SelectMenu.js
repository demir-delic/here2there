import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { deepEqual } from "../utils";

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export default function SelectMenu(props) {
  const [selected, setSelected] = useState(props.citySelection);
  const [allCities, setAllCities] = useState();
  const selectedEmpty = { city: "", cityId: "", country: "" };
  let limiter = deepEqual(selected, selectedEmpty) ? " " : ",";

  async function getAllCities() {
    const request = await fetch(`/api/cities/`);
    const jsonResponse = await request.json();

    console.log("cities", jsonResponse);
    setAllCities(jsonResponse);
  }

  useEffect(() => {
    getAllCities();
  }, []);

  return (
    <Listbox
      value={selected}
      onChange={(selectedCity) => {
        console.log("selectedCity", selectedCity);
        setSelected(selectedCity);
        props.onCitySelection(selectedCity);
      }}
    >
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            Choose a city
          </Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 sm:text-sm">
              <span className="block truncate">
                {`${selected.city}${limiter} ${selected.country}`}
                &nbsp;
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                static
                className="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
              >
                {allCities &&
                  allCities.map((city) => (
                    <Listbox.Option
                      key={city.city_id}
                      className={({ active }) =>
                        classNames(
                          active ? "text-white bg-blue-600" : "text-gray-900",
                          "cursor-default select-none relative py-2 pl-3 pr-9"
                        )
                      }
                      value={city}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate"
                            )}
                          >
                            {`${city.city}, ${city.country}`}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-blue-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
