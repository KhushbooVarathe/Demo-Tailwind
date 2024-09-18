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

const Form = () => {
  const [countryOptions, setCountryOptions] = useState([]);
  const [isAdd, setIsAdd] = useState(false)

  const [data, setData] = useState({
    users: "",
    experience: "",
    country: { label: "select", value: null },
    Roles: { label: "select", value: null },
    industries: { label: "select", value: null },
  });

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
      setIsAdd(true);
      if (value == "user2") {
        setData((prev) => ({
          ...prev,
          country: [],
          Roles: [],
          industries: [],
        }));

      } else {
        setData((prev) => ({
          ...prev,
          country: { label: "select", value: null },
          Roles: { label: "select", value: null },
          industries: { label: "select", value: null },
        }));
      }
      setData((prev) => ({ ...prev, users: event.target.value }));
    } else {
      setData((prev) => ({ ...prev, experience: event.target.value }));
    }
  };

  const handleSelectedData = (event, actionMeta) => {
    const { name } = actionMeta;
    if (data?.users == 'user2') {
      
      setData(prev => ({
        ...prev,
        [name]: [...(prev[name] || []), event]
      }));
    } else {

      setData((prev) => ({ ...prev, [name]: event }));
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 shadow-lg rounded-lg w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-center">
            <h6 className="text-2xl font-semibold text-gray-800">Experience</h6>
          </div>
          <div className="flex flex-col bg-slate-200 border border-gray-300 rounded-lg p-4 shadow-sm">
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
        {
          isAdd &&
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  // value={data?.Roles}
                  onChange={handleSelectedData}
                  styles={customStyles}
                // isMulti={data.users === "user2"}
                />
              </div>

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
                  // value={data?.industries}
                  onChange={handleSelectedData}
                  styles={customStyles}
                // isMulti={data.users === "user2"}
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
                  // value={data?.country}
                  onChange={handleSelectedData}
                  options={countryOptions}
                  styles={customStyles}
                // isMulti={data.users === "user2"}
                />

              </div>

              <div className="space-y-4">
                <label className="text-lg font-medium text-gray-800">
                  Career Experience:
                </label>
                <div className="flex items-center me-4">
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
                <div className="flex items-center me-4">
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
                <div className="flex items-center me-4">
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
            <div className="mr-5 mt-5">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleSubmitData}
              >
                Submit
              </button>
            </div>
          </>
        }
      </form>
    </div>
  );
};

export default Form;