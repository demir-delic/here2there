import './App.css'
import Switcher from './components/Switcher'
import Button from './components/Button'
import LandingPageHeader from './components/LandingPageHeader'
import ChangeCityModal from './components/ChangeCityModal'
import ModalCornerLink from './components/ModalCornerLink'
import SearchResultPage from './components/SearchResultPage'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
    const [openModal, setOpenModal] = useState(false)
    const [coords, setCoords] = useState({ lat: 0, lon: 0 })
    const [userCity, setUserCity] = useState('Sector 336')
    const [userCountry, setUserCountry] = useState('Planet Earth')

    const toggleModal = () => {
        setOpenModal(!openModal)
    }

    const getLocation = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setCoords({
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude,
                })
            })

            const revKey = process.env.REACT_APP_REVGEO_KEY
            const ipKey = process.env.REACT_APP_IP_KEY

            const ip = await axios
                .get('https://api.ipify.org')
                .then((res) => res.data)

            await axios
                .get(
                    `https://api.ipgeolocation.io/ipgeo?apiKey=${ipKey}&ip=${ip}`
                )
                .then((res) => res.data)
                .then((data) => {
                    setCoords({
                        lat: data.latitude,
                        lon: data.longitude,
                    })
                    setUserCountry(data.country_name)
                    if (data.city !== null) {
                        setUserCity(data.city)
                    }
                })
        }
        // Reverse Geocode function below
        // await axios
        //     .get(
        //         `http://api.positionstack.com/v1/forward?access_key=${revKey}&query=${coords.lat},${coords.lon}`
        //     )
        //     .then((res) => res.data)
        //     .then((data) => data)
    }

    useEffect(() => {
        getLocation()
    }, [])

    return (
        <BrowserRouter>
            <Switch>
                <Route path='/results'>
                    <SearchResultPage />
                </Route>
                <Route path='/'>
                    <div className='h-min-screen bg-gray-50'>
                        <ChangeCityModal
                            open={openModal}
                            onModalUpdate={setOpenModal}
                        />
                        {/* {`\nopenModal: ${openModal}`} */}
                        <ModalCornerLink onClick={toggleModal} />
                        <LandingPageHeader
                            userCity={userCity}
                            userCountry={userCountry}
                        />
                        <div className='container flex flex-col items-baseline justify-between w-max h-88 mx-auto px-10'>
                            <Switcher label='Less expensive' isEnabled={true} />
                            <Switcher
                                label='Warmer in April'
                                isEnabled={true}
                            />
                            <Switcher
                                label='Smaller population'
                                isEnabled={true}
                            />
                            <Switcher label='Safer' isEnabled={true} />
                            <Switcher
                                label={`Close to ${userCity}`}
                                isEnabled={false}
                            />
                            <div className='mt-6 mb-16'>
                                <Link to='/results'>
                                    <Button text='Find Vacation Spot' />
                                </Link>
                            </div>
                        </div>
                    </div>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App
