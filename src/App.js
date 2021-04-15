import "./App.css";
import Switcher from "./Switcher";
import Button from "./Button";
import Header from "./Header";
import LinkComponent from "./Link";
import Modal from "./Modal";
import Card from "./Cards";
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
          <div className="fill-viewport bg-gray-50">
            <Card></Card>
            <div className="btn-container container mx-auto px-10">
              <Link to="/">
                <Button text="Search Again" className="mb-20"></Button>
              </Link>
            </div>
          </div>
        </Route>
        <Route path="/">
          <div className="fill-viewport bg-gray-50">
            <Modal open={openModal} onModalUpdate={setOpenModal} />
            {/* {`\nopenModal: ${openModal}`} */}
            <div className="cursor-pointer" onClick={toggleModal}>
              <LinkComponent></LinkComponent>
            </div>
            <Header userCity="Munich" userCountry="Germany"></Header>
            <div className="form-control container mx-auto px-10">
              <Switcher label="Less expensive" isEnabled={true}></Switcher>
              <Switcher label="Warmer in April" isEnabled={true}></Switcher>
              <Switcher label="Smaller population" isEnabled={true}></Switcher>
              <Switcher label="Safer" isEnabled={true}></Switcher>
              <Switcher label="Close to Munich" isEnabled={false}></Switcher>
              <Link to="/results">
                <Button text="Find Vacation Spot" className="mt-10"></Button>
              </Link>
            </div>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
