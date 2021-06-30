import SearchResultCard from "./SearchResultCard";
import Button from "./Button";
import Alert from "./Alert";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SearchResultPage(props) {
  const [recommendations, setRecommendations] = useState();

  const getRecommendedCities = async () => {
    const resp = await fetch(
      `/api/recommended-cities?id=${props.cityId}&warm=${props.warm}&mon=${props.mon}&cheap=${props.cheap}&safe=${props.safe}&pop=${props.pop}&close=${props.close}`
    );
    const json = await resp.json();
    console.log("recommendations", json);
    setRecommendations(json);
  };

  useEffect(() => {
    getRecommendedCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayRecommendations = () => {
    return recommendations.map((result) => (
      <SearchResultCard key={result.city_id} result={result} />
    ));
  };

  return (
    <div className="relative bg-gray-50 py-4 md:py-16">
      {props.cityId === "" ? (
        <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl mb-16">
          <Alert
            type="error"
            alertText="Your location could not be found. Please return to the homepage and refresh the page."
          />
        </div>
      ) : (
        ""
      )}

      {!recommendations && props.cityId !== "" ? (
        <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl mb-16">
          <Alert type="info" alertText="Loading recommendations..." />
        </div>
      ) : (
        <>
          <div className="text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <p className="mt-2 text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
              Here are some places you might like to visit
            </p>
          </div>
          <div className="mt-12 mx-auto max-w-md px-4 grid gap-8 sm:max-w-lg sm:px-6 lg:px-8 lg:grid-cols-3 lg:max-w-7xl">
            {recommendations ? displayRecommendations() : ""}
          </div>
        </>
      )}
      <div className="w-max mx-auto my-16">
        <Link to="/">
          <Button text="Search Again" />
        </Link>
      </div>
    </div>
  );
}
