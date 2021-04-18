import "./App.css";
import Switcher from "./Switcher";
import Button from "./Button";
import Header from "./Header";
import Modal from "./Modal";
import ModalCornerLink from "./ModalCornerLink";
import SearchResultPage from "./SearchResultPage";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { useState } from "react";

function App() {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/results">
          <SearchResultPage></SearchResultPage>
        </Route>
        <Route path="/">
          <div className="h-min-screen bg-gray-50">
            <Modal open={openModal} onModalUpdate={setOpenModal} />
            {/* {`\nopenModal: ${openModal}`} */}
            <ModalCornerLink onClick={toggleModal}></ModalCornerLink>
            <Header userCity="Munich" userCountry="Germany"></Header>
            <div className="container flex flex-col items-baseline justify-between w-max h-88 mx-auto px-10">
              <Switcher label="Less expensive" isEnabled={true}></Switcher>
              <Switcher label="Warmer in April" isEnabled={true}></Switcher>
              <Switcher label="Smaller population" isEnabled={true}></Switcher>
              <Switcher label="Safer" isEnabled={true}></Switcher>
              <Switcher label="Close to Munich" isEnabled={false}></Switcher>
              <div className="mt-6 mb-16">
                <Link to="/results">
                  <Button text="Find Vacation Spot"></Button>
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
