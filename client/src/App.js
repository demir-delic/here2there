import "./App.css";
import Switcher from "./components/Switcher";
import Button from "./components/Button";
import LandingPageHeader from "./components/LandingPageHeader";
import ChangeCityModal from "./components/ChangeCityModal";
import ModalCornerLink from "./components/ModalCornerLink";
import SearchResultPage from "./components/SearchResultPage";
import Alert from "./components/Alert";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
let useEffectLoopCounter = 0;

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [coords, setCoords] = useState({ lat: null, long: null });
  const [cityId, setCityId] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [month, setMonth] = useState("");
  const [monthNumber, setMonthNumber] = useState("");
  const [cheapEnabled, setCheapEnabled] = useState(false);
  const [warmEnabled, setWarmEnabled] = useState(false);
  const [smallPopEnabled, setSmallPopEnabled] = useState(false);
  const [safeEnabled, setSafeEnabled] = useState(false);
  const [closeEnabled, setCloseEnabled] = useState(false);
  let isMonthSet = false;

  const onCitySelection = (selectedCity) => {
    setCityId(selectedCity.city_id);
    setCity(selectedCity.city);
    setCountry(selectedCity.country);
  };

  const setMonthFromCurrentDate = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString("en", { month: "long" });
    setMonth(currentMonth);
    setMonthNumber(currentDate.getMonth() + 1);
    isMonthSet = true;
  };

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const setCoordsWithApi = async () => {
    if (useEffectLoopCounter <= 2) {
      // set coordinates using third-party API
      // this is less accurate than navigator.geolocation
      const ipInfoKey = process.env.REACT_APP_IPINFO_ACCESS_TOKEN;
      const request = await fetch(`https://ipinfo.io/json?token=${ipInfoKey}`);
      const jsonResponse = await request.json();
      const latitude = jsonResponse.loc.split(",")[0];
      const longitude = jsonResponse.loc.split(",")[1];
      // console.log("latitude", latitude, "longitude", longitude);
      setCoords({ lat: latitude, long: longitude });
    }
  };

  const setCoordsWithGeolocation = () => {
    // set coordinates using browser API
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoords({
        lat: pos.coords.latitude,
        long: pos.coords.longitude,
      });
    });
    console.log("setCoordsWithGeolocation coords", coords);
  };

  const setNearestCityData = () => {
    if (coords.lat !== null && coords.long !== null) {
      axios
        .get(`/api/nearest-city?lat=${coords.lat}&long=${coords.long}`)
        .then((res) => {
          console.log("/api/nearest-city", res);
          setCityId(res.data[0].city_id);
          setCity(res.data[0].city);
          setCountry(res.data[0].country);
          console.log(cityId, city, country, coords);
        })
        .catch((err) => console.error("/api/nearest-city err", err));
    }
  };

  // const getHardCodedLocation = () => {
  //   setCoords({
  //     lat: "43.6135",
  //     long: "-116.20345",
  //   });
  //   setCityId("boise");
  //   setCity("Boise");
  //   setCountry("United States");
  // };

  const getLocation = () => {
    if (navigator.permissions) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(async (result) => {
          // result.state can be 'granted', 'prompt', or 'denied'
          switch (result.state) {
            case "granted":
              setCoordsWithGeolocation();
              break;
            case "prompt":
              setCoordsWithGeolocation();
              setCoordsWithApi();
              break;
            case "denied":
              setCoordsWithApi();
              break;
            default:
              console.error(
                "Unexpected state received when querying geolocation permissions",
                result
              );
          }
          console.log("geolocation.permissions.query", result.state, coords);
        })
        .then(() => {
          setNearestCityData();
        });
    } else {
      setCoordsWithApi().then(setNearestCityData());
    }
  };

  useEffect(() => {
    // this counter is a hack to make sure that `coords` is updated
    ++useEffectLoopCounter;
    console.log("useEffectLoopCounter in useeffect", useEffectLoopCounter);
    if (!isMonthSet) {
      setMonthFromCurrentDate();
    }
    if (useEffectLoopCounter <= 3) {
      getLocation();
      // getHardCodedLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coords, cheapEnabled, warmEnabled, smallPopEnabled, safeEnabled, closeEnabled]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/results">
          <SearchResultPage
            cityId={cityId}
            mon={monthNumber}
            cheap={cheapEnabled}
            warm={warmEnabled}
            pop={smallPopEnabled}
            safe={safeEnabled}
            close={closeEnabled}
          />
        </Route>
        <Route path="/">
          <div className="h-min-screen bg-gray-50">
            {cityId === "" ? (
              <div className="max-w-3xl mx-auto pt-16 px-4 sm:px-6 lg:px-8">
                <Alert type="info" alertText="Finding the supported city closest to you..." />
              </div>
            ) : (
              ""
            )}
            <ChangeCityModal
              open={openModal}
              onModalUpdate={setOpenModal}
              citySelection={{ cityId, city, country }}
              onCitySelection={onCitySelection}
            />
            <ModalCornerLink onClick={toggleModal} />
            <LandingPageHeader city={city} country={country} />
            <div className="container flex flex-col items-baseline justify-between w-max h-88 mx-auto px-10">
              <Switcher
                label="Less expensive"
                isEnabled={cheapEnabled}
                onStateChange={setCheapEnabled}
              />
              <Switcher
                label={`Warmer in ${month}`}
                isEnabled={warmEnabled}
                onStateChange={setWarmEnabled}
              />
              <Switcher
                label="Smaller population"
                isEnabled={smallPopEnabled}
                onStateChange={setSmallPopEnabled}
              />
              <Switcher label="Safer" isEnabled={safeEnabled} onStateChange={setSafeEnabled} />
              <Switcher
                label={`Close to ${city}`}
                isEnabled={closeEnabled}
                onStateChange={setCloseEnabled}
              />
              <div className="mt-6 mb-16">
                <Link to="/results">
                  <Button text="Find Vacation Spot" disabled={cityId === ""} />
                </Link>
              </div>
            </div>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
