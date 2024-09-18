import React, { useEffect, useState } from "react";
import { countries } from "countries-list";
import Select from "react-select";

const customStyles = {
    container: (provided) => ({
        ...provided,
        width: 300,
    }),
    control: (provided) => ({
        ...provided,
        borderColor: "#ddd",
        boxShadow: "none",
        "&:hover": {
            borderColor: "#aaa",
        },
        borderRadius: "8px",
        padding: "0 10px",
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    }),
    menuList: (provided) => ({
        ...provided,
        padding: 0,
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#007bff" : "white",
        color: state.isSelected ? "white" : "black",
        "&:hover": {
            backgroundColor: "#007bff",
            color: "white",
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "#333",
    }),
    placeholder: (provided) => ({
        ...provided,
        color: "#999",
    }),
};

const Allroles = [
    { label: "Jr.Developer", value: "Jr.Developer" },
    { label: "Intern", value: "Intern" },
    { label: "Sr.developer", value: "Sr.developer" },
    { label: "Process Manager", value: "Process Manager" },
    {
        label: "BDA(Bussiness Development Executive)",
        value: "BDA(Bussiness Development Executive)",
    },
];

const AllIndustries = [
    { label: "Banking & Insurance.", value: "Banking & Insurance." },
    { label: "Information Technology (IT)", value: "Information Technology (IT)" },
    { label: "Iron & Steel", value: "Iron & Steel" },
    { label: "Textiles", value: "Textiles" },
    { label: "Automobile", value: "Automobile" },
    { label: "Petrochemical", value: "Petrochemical" },
];
const payload = {
    users: "user1",
    experience: "", country: [], Roles: [], industries: [],
    country_obj: { label: "select", value: null },
    Roles_obj: { label: "select", value: null },
    industries_obj: { label: "select", value: null },
}
const FormModal = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [countryOptions, setCountryOptions] = useState([]);
    const [data, setData] = useState(payload);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        setData(payload);
    };

    useEffect(() => {
        if (countries) {
            const countryData = Object.keys(countries).map((code) => ({
                label: countries[code].name,
                value: code,
            }));
            setCountryOptions(countryData);
        }
    }, []);

    const handleRadioChange = (event) => {
        const { name, value } = event?.target;
        if (name == "users-radio-group") {
            if (value == "user2") {
                setData((prev) => ({
                    ...prev,
                    country: [],
                    Roles: [],
                    industries: [],
                    country_obj: { label: "select", value: null },
                    Roles_obj: { label: "select", value: null },
                    industries_obj: { label: "select", value: null },
                    experience: ""
                }));

            } else {
                setData((prev) => ({
                    ...prev,
                    country_obj: { label: "select", value: null },
                    Roles_obj: { label: "select", value: null },
                    industries_obj: { label: "select", value: null },
                    experience: ""
                }));
            }
            setData((prev) => ({ ...prev, users: event.target.value }));
        } else {
            setData((prev) => ({ ...prev, experience: event.target.value }));
        }
    };
    const isDuplicate = (arr, event) => {
        return arr.some(item => item?.value === event?.value);
    };

    const handleSelectedData = (event, actionMeta) => {
        const { name } = actionMeta;
        if (data?.users === 'user2') {
            if (name === 'Roles') {
                if (!isDuplicate(data?.Roles, event)) {
                    setData(prev => ({
                        ...prev,
                        [name]: [...(prev[name] || []), event],
                        Roles_obj: event
                    }));
                }
            } else if (name === 'industries') {
                if (!isDuplicate(data.industries, event)) {
                    setData(prev => ({
                        ...prev,
                        [name]: [...(prev[name] || []), event],
                        industries_obj: event
                    }));
                }
            } else {
                if (!isDuplicate(data.country, event)) {
                    setData(prev => ({
                        ...prev,
                        [name]: [...(prev[name] || []), event],
                        country_obj: event
                    }));
                }
            }
        } else {
            if (name === 'Roles') {
                setData(prev => ({ ...prev, Roles_obj: event }));
            } else if (name === 'industries') {
                setData(prev => ({ ...prev, industries_obj: event }));
            } else {
                setData(prev => ({ ...prev, country_obj: event }));
            }
        }
    };

    const handleSubmitData = () => {
        console.log("data", data);
    };

    const handleRemoveData = (name, valueToRemove) => {
        const newFilterData = data[name]?.filter(obj => obj?.label !== valueToRemove) || [];
        setData(prev => ({
            ...prev,
            [name]: newFilterData
        }));
    };

    return (
        <React.Fragment>
            <div className=" mt-4 ">
                <div className="rounded-lg p-4 shadow-sm">
                    <button
                        onClick={toggleModal}
                        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button"
                    >
                        Click
                    </button>

                </div>
            </div>

            {isModalOpen && (
                <div
                    id="static-modal"
                    className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
                    aria-hidden="true"
                >
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h6 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Experience
                                </h6>
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5 space-y-4 overflow-y-auto max-h-[60vh]">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="flex items-center">
                                        <div className="space-y-4">
                                            <label className="text-lg font-medium text-gray-800">
                                                Role/Positions:
                                            </label>
                                            <br />
                                            {data?.users === "user2" && data?.Roles?.length > 0 ? (
                                                data?.Roles?.map((role, index) => (
                                                    <span
                                                        key={index}
                                                        id="badge-dismiss-default"
                                                        className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full shadow-md dark:bg-blue-900 dark:text-blue-300"
                                                    >
                                                        {role?.label}
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveData("Roles", role?.label)}
                                                            className="inline-flex items-center p-1 ms-2 text-blue-400 bg-transparent rounded-full hover:bg-blue-200 dark:hover:bg-blue-800"
                                                            aria-label="Remove"
                                                        >
                                                            <svg
                                                                className="w-3 h-3"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M2 2l12 12M2 14L14 2"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </span>
                                                ))
                                            ) : (
                                                <></>
                                            )}
                                            <Select
                                                name="Roles"
                                                options={Allroles}
                                                value={data?.Roles_obj}
                                                onChange={handleSelectedData}
                                                styles={customStyles}
                                            // isMulti={data.users === "user2"}
                                            />
                                        </div>  
                                    </div>
                                    <div className="flex flex-col bg-slate-200 border border-gray-300 rounded-lg p-4 shadow-sm">
                                            <label  className="text-lg font-medium text-gray-800 mb-2">Select User : </label>
                                        <div className="flex items-center mb-4">
                                            <input
                                                id="inline-radio-1"
                                                type="radio"
                                                value="user1"
                                                name="users-radio-group"
                                                checked={data.users === "user1"}
                                                onChange={handleRadioChange}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                            />
                                            <label
                                                htmlFor="inline-radio-1"
                                                className="ms-3 text-sm font-medium text-gray-800"
                                            >
                                                User 1
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="inline-radio-2"
                                                type="radio"
                                                value="user2"
                                                name="users-radio-group"
                                                checked={data.users === "user2"}
                                                onChange={handleRadioChange}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                            />
                                            <label
                                                htmlFor="inline-radio-2"
                                                className="ms-3 text-sm font-medium text-gray-800"
                                            >
                                                User 2
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                                    <div className="space-y-4">
                                        <label className="text-lg font-medium text-gray-800">
                                            Industries:
                                        </label>
                                        <br />
                                        {data?.users === "user2" && data?.industries?.length > 0 ? (
                                            data?.industries?.map((role, index) => (
                                                <span
                                                    key={index}
                                                    id="badge-dismiss-default"
                                                    className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full shadow-md dark:bg-blue-900 dark:text-blue-300"
                                                >
                                                    {role?.label}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveData("industries", role?.label)}
                                                        className="inline-flex items-center p-1 ms-2 text-blue-400 bg-transparent rounded-full hover:bg-blue-200 dark:hover:bg-blue-800"
                                                        aria-label="Remove"
                                                    >
                                                        <svg
                                                            className="w-3 h-3"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path
                                                                stroke="currentColor"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M2 2l12 12M2 14L14 2"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            ))
                                        ) : (
                                            <></>
                                        )}

                                        <Select
                                            name="industries"
                                            options={AllIndustries}
                                            value={data?.industries_obj}
                                            onChange={handleSelectedData}
                                            styles={customStyles}
                                        />

                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-lg font-medium text-gray-800">
                                            Locations:
                                        </label>
                                        <br />
                                        {data?.users === "user2" && data?.country?.length > 0 ? (
                                            data?.country?.map((role, index) => (
                                                <span
                                                    key={index}
                                                    id="badge-dismiss-default"
                                                    className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full shadow-md dark:bg-blue-900 dark:text-blue-300"
                                                >
                                                    {role?.label}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveData("country", role?.label)}
                                                        className="inline-flex items-center p-1 ms-2 text-blue-400 bg-transparent rounded-full hover:bg-blue-200 dark:hover:bg-blue-800"
                                                        aria-label="Remove"
                                                    >
                                                        <svg
                                                            className="w-3 h-3"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path
                                                                stroke="currentColor"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M2 2l12 12M2 14L14 2"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            ))
                                        ) : (
                                            <></>
                                        )}
                                        <Select
                                            name="country"
                                            value={data?.country_obj}
                                            onChange={handleSelectedData}
                                            options={countryOptions}
                                            styles={customStyles}
                                        />

                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-lg font-medium text-gray-800">
                                            Career Experience:
                                        </label>
                                        <div className="flex space-x-6">
                                            <div className="flex items-center">
                                                <input
                                                    id="inline-radio-3"
                                                    type="radio"
                                                    value="fresher"
                                                    name="career-radio-group"
                                                    checked={data.experience === "fresher"}
                                                    onChange={handleRadioChange}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <label
                                                    htmlFor="inline-radio-3"
                                                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >
                                                    Fresher
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    id="inline-radio-4"
                                                    type="radio"
                                                    value="0-3 years"
                                                    name="career-radio-group"
                                                    checked={data.experience === "0-3 years"}
                                                    onChange={handleRadioChange}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <label
                                                    htmlFor="inline-radio-4"
                                                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >
                                                    0-3 Years
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    id="inline-radio-5"
                                                    type="radio"
                                                    value="3-6 years"
                                                    name="career-radio-group"
                                                    checked={data.experience === "3-6 years"}
                                                    onChange={handleRadioChange}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <label
                                                    htmlFor="inline-radio-5"
                                                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >
                                                    3-6 Years
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end h-full p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button
                                    onClick={handleSubmitData}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Submit
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default FormModal;
