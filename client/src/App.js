import "./App.css";
import Switcher from "./components/Switcher";
import Button from "./components/Button";
import LandingPageHeader from "./components/LandingPageHeader";
import ChangeCityModal from "./components/ChangeCityModal";
import ModalCornerLink from "./components/ModalCornerLink";
import SearchResultPage from "./components/SearchResultPage";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
let useEffectLoopCounter = 0;
console.log("top of file", useEffectLoopCounter);

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [coords, setCoords] = useState({ lat: null, long: null });
  const [cityId, setCityId] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [month, setMonth] = useState("");

  const setMonthFromCurrentDate = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString("en", { month: "long" });
    setMonth(currentMonth);
  };

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const getLocation = async () => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(async (result) => {
        // result.state can be one of ['granted', 'prompt', 'denied'])
        console.log("geolocation.permissions.query", result.state);
        if (result.state === "granted") {
          // set coordinates using browser API
          navigator.geolocation.getCurrentPosition((pos) => {
            setCoords({
              lat: pos.coords.latitude,
              lon: pos.coords.longitude,
            });
            // console.log("coords when geolocation granted", coords);
          });
        } else if (result.state === "denied" || result.state === "prompt") {
          // set coordinates using third-party API
          // this is less accurate than navigator.geolocation
          const ipInfoKey = process.env.REACT_APP_IPINFO_ACCESS_TOKEN;
          const request = await fetch(`https://ipinfo.io/json?token=${ipInfoKey}`);
          const jsonResponse = await request.json();
          const latitude = jsonResponse.loc.split(",")[0];
          const longitude = jsonResponse.loc.split(",")[1];
          console.log("latitude", latitude, "longitude", longitude);
          setCoords({ lat: latitude, long: longitude });
          console.log("coords", coords);
        } else {
          // todo: handle asking for location prompt correctly
          console.error("Unexpected state received when querying geolocation permissions", result);
        }
      })
      .then(() => {
        // axios
        //   .get("/cities/")
        //   .then((res) => console.log("/cities", res))
        //   .catch((err) => console.error("/cities err", err));

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
      });
  };

  useEffect(() => {
    // this counter is a hack to make sure that `coords` is updated
    ++useEffectLoopCounter;
    console.log("in useeffect", useEffectLoopCounter);
    if (useEffectLoopCounter <= 2) {
      setMonthFromCurrentDate();
      getLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coords]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/results">
          <SearchResultPage />
        </Route>
        <Route path="/">
          <div className="h-min-screen bg-gray-50">
            <ChangeCityModal open={openModal} onModalUpdate={setOpenModal} />
            {/* {`\nopenModal: ${openModal}`} */}
            <ModalCornerLink onClick={toggleModal} />
            <LandingPageHeader city={city} country={country} />
            <div className="container flex flex-col items-baseline justify-between w-max h-88 mx-auto px-10">
              <Switcher label="Less expensive" isEnabled={true} />
              <Switcher label={`Warmer in ${month}`} isEnabled={true} />
              <Switcher label="Smaller population" isEnabled={true} />
              <Switcher label="Safer" isEnabled={true} />
              <Switcher label={`Close to ${city}`} isEnabled={false} />
              <div className="mt-6 mb-16">
                <Link to="/results">
                  <Button text="Find Vacation Spot" />
                </Link>
              </div>
              {/* <span>{JSON.stringify(coords, null, 4)}</span> */}
            </div>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
