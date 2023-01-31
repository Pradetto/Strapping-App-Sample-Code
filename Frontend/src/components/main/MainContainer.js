import React from "react";
import DataDisplay from "./DataDisplay";
import Filters from "./FiltersContainer/Filters";

//CSS
import { Spinner, Flex } from "@chakra-ui/react";

const MainContainer = ({
  retrievePresetDateHandler,
  labels,
  viewWidget,
  viewFormHandler,
  isLoading,
  retrieveFromDateHandler,
  retrieveFromToDateHandler,
  searchBarHandler,
  activeFilter,
  setActiveFilter,
}) => {
  const activeFilterHandler = (...args) => {
    let d, d1, d2;
    // Drop Down Selected | Just Date From | Date From & To Date
    if (args[0] === "1") {
      let start = args[1].slice(0, 1);
      let end = args[1].slice(1).toUpperCase();
      let s = start + " " + end;
      setActiveFilter(s);
      retrievePresetDateHandler(args[1]);
    } else if (args[0] === "2") {
      console.log(2, args[1]);
      d = new Date(args[1]).toISOString().slice(0, 19).replace("T", " ");
      //Filter Date below
      let date = new Date();
      let dateString = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
      let s = args[1].replace("T", " ") + " to " + dateString;
      setActiveFilter(s);
      retrieveFromDateHandler(d);
    } else if (args[0] === "3") {
      console.log(3, args[1], args[2]);
      d1 = new Date(args[1]).toISOString().slice(0, 19).replace("T", " ");
      d2 = new Date(args[2]).toISOString().slice(0, 19).replace("T", " ");

      setActiveFilter(
        args[1].replace("T", " ") + " to " + args[2].replace("T", " ")
      );
      retrieveFromToDateHandler(d1, d2);
    }
  };

  return (
    <>
      {viewWidget && (
        <Filters
          activeFilterHandler={activeFilterHandler}
          labels={labels}
          searchBarHandler={searchBarHandler}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      )}
      {isLoading ? (
        <Flex justifyContent={"center"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      ) : (
        <DataDisplay
          viewFormHandler={viewFormHandler}
          labels={labels}
          activeFilter={activeFilter}
        />
      )}
    </>
  );
};

export default MainContainer;
