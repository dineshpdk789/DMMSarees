import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import { Country, State, City }  from 'country-state-city';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveshippingInfo } from '../features/cart/cartSlice';
import Footer from '../components/Footer';



// Main Shipping Page Component
const Shipping = () => {
   

    const { shippingInfo } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate=useNavigate();


    const [address, setAddress] = useState(shippingInfo?.address||'');
    const [pincode, setPincode] = useState(shippingInfo?.pincode||'');
    const [phone, setPhone] = useState(shippingInfo?.phone||'');
    const [selectedCountry, setSelectedCountry] = useState(shippingInfo?.selectedCountry||'');
    const [selectedState, setSelectedState] = useState(shippingInfo?.selectedState||'');
    const [selectedCity, setSelectedCity] = useState(shippingInfo?.selectedCity||'');

    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
        setSelectedState('');
        setSelectedCity('');
    };

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        setSelectedCity('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(phone.length<10){
            toast.error("Invalid Phone Number. It should be 10 digits",{autoClose:3000,toastId:"phone"})
             return;
        }
        dispatch(saveshippingInfo({address,pincode,phone,selectedCountry,selectedCity,selectedState}))
        navigate("/order/confirm");
    }



    return (
        <>
            <PageTitle title="shipping" />
            <Navbar />
            <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center py-12 font-sans">
                {/* <Checkoutpath/> */}
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">
                        Shipping Details
                    </h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Address */}
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Enter your address"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>

                            {/* Pincode */}
                            <div>
                                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                                    PinCode
                                </label>
                                <input
                                    type="text"
                                    id="pincode"
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value)}
                                    placeholder="Enter your pincode"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Enter your phone number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Country Dropdown */}
                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                                    Country
                                </label>
                                <select
                                    id="country"
                                    value={selectedCountry}
                                    onChange={handleCountryChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-white"
                                    required
                                >
                                    <option value="">Select a Country</option>
                                    { Country && Country.getAllCountries().map((country,index) => (
                                        <option key={country.isoCode} value={country.isoCode}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* State Dropdown - Conditional */}
                            {selectedCountry && (
                                <div>
                                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                                        State
                                    </label>
                                    <select
                                        id="state"
                                        value={selectedState}
                                        onChange={handleStateChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-white"
                                        required
                                    >
                                        <option value="">Select a State</option>
                                        { State && State.getStatesOfCountry(selectedCountry).map((state) => (
                                            <option key={state.isoCode} value={state.isoCode}>
                                                {state.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* City Dropdown - Conditional */}
                            {selectedState && (
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                        City
                                    </label>
                                    <select
                                        id="city"
                                        value={selectedCity}
                                        onChange={(e) => setSelectedCity(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-white"
                                        required
                                    >
                                        <option value="">Select a City</option>
                                        {City && City.getCitiesOfState(selectedCountry,selectedState).map((city) => (
                                            <option key={city.name} value={city.name}>
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Continue Button - Spans both columns */}
                        <div className="md:col-span-2 pt-4">
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
                            >
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Shipping;
