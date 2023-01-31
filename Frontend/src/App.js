import { useState, useEffect } from "react";

//Components
import Navbar from "./components/header/Navbar";
import MainContainer from "./components/main/MainContainer";
import AddProductForm from "./components/main/NewProductForm/AddProductForm";
import LoginPage from "./components/auth/LoginPage";

// CSS
import { Box } from "@chakra-ui/react";

const apiWebsite = "http://localhost:8000";

function App() {
  const [viewForm, setViewForm] = useState(false);
  const [viewWidget, setViewWidget] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchBar, setSearchBar] = useState("");
  const [activeFilter, setActiveFilter] = useState("Past 100 Entries");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // INITIAL PAGE LAOD
  useEffect(() => {
    const retrieveLabels = async () => {
      const response = await fetch(`${apiWebsite}/api/allLabels`);
      const data = await response.json();
      setData(data);
    };
    retrieveLabels();
  }, []);

  // CREATE NEW LABEL FETCH DATA
  const newLabelHandler = async () => {
    const response = await fetch(`${apiWebsite}/api/recentScannedLabels`);
    const data = await response.json();
    setData(data);
  };

  // Retrieving Preset Dates
  const retirevePresetFetch = async (filter) => {
    const response = await fetch(`${apiWebsite}/api/preset/${filter}`);
    const data = await response.json();
    setData(data);
    setIsLoading(false);
  };

  const retrievePresetDateHandler = (type) => {
    if (type === "1week") {
      setIsLoading(true);
      retirevePresetFetch(type);
    } else if (type === "2weeks") {
      setIsLoading(true);
      retirevePresetFetch(type);
    } else if (type === "1month") {
      setIsLoading(true);
      retirevePresetFetch(type);
    } else if (type === "3months") {
      setIsLoading(true);
      retirevePresetFetch(type);
    } else if (type === "6months") {
      setIsLoading(true);
      retirevePresetFetch(type);
    } else if (type === "1year") {
      setIsLoading(true);
      retirevePresetFetch(type);
    }
  };

  // Retrieving From Date Only
  const retrieveFromDateHandler = async (fromDate) => {
    setIsLoading(true);
    const response = await fetch(
      `${apiWebsite}/api/custom/from?fromDate=${fromDate}`
    );
    const data = await response.json();
    setData(data);
    setIsLoading(false);
  };

  // Retrieving From & To Date
  const retrieveFromToDateHandler = async (fromDate, toDate) => {
    setIsLoading(true);
    const response = await fetch(
      `${apiWebsite}/api/custom/between?fromDate=${fromDate}&toDate=${toDate}`
    );
    const data = await response.json();
    setData(data);
    setIsLoading(false);
  };

  // Searchbar Handlers (Can optimize Binary Search if needed)
  const searchBarHandler = (val) => {
    setSearchBar(val);
  };

  // View Handlers
  const viewFormHandler = () => {
    setViewForm(!viewForm);
  };

  const viewWidgetHandler = () => {
    setViewWidget(!viewWidget);
  };

  const websiteLoad = (
    <>
      {viewForm && (
        <AddProductForm
          viewFormHandler={viewFormHandler}
          newLabelHandler={newLabelHandler}
          apiWebsite={apiWebsite}
          setActiveFilter={setActiveFilter}
          viewForm={viewForm}
        />
      )}

      <MainContainer
        viewFormHandler={viewFormHandler}
        viewWidget={viewWidget}
        labels={data
          .map((item) => {
            const utcTime = new Date(item.date);
            const newDate = utcTime.toLocaleString("en-US");
            const obj = {
              ...item,
              label: "#" + String(item.label),
              date: newDate,
            };
            return obj;
          })
          .filter((item) => {
            if (searchBar === "") {
              return item;
            } else {
              return item.label.toLowerCase().includes(searchBar);
            }
          })}
        retrievePresetDateHandler={retrievePresetDateHandler}
        retrieveFromDateHandler={retrieveFromDateHandler}
        retrieveFromToDateHandler={retrieveFromToDateHandler}
        searchBarHandler={searchBarHandler}
        isLoading={isLoading}
        setActiveFilter={setActiveFilter}
        activeFilter={activeFilter}
      />
    </>
  );

  return (
    <Box minH={"100vh"} maxW={"100vw"} minW={"100vw"}>
      <Navbar
        viewFormHandler={viewFormHandler}
        viewWidgetHandler={viewWidgetHandler}
      />

      {isLoggedIn ? websiteLoad : <LoginPage loginHandler={loginHandler} />}
    </Box>
  );
}

export default App;
