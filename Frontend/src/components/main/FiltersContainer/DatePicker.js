import React, { useState } from "react";

import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
  HStack,
  Button,
} from "@chakra-ui/react";

const DatePicker = ({ activeFilterHandler }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const customDateFilter = (e) => {
    e.preventDefault();

    if (fromDate && !toDate) {
      activeFilterHandler("2", fromDate);
    } else if (fromDate && toDate > fromDate) {
      activeFilterHandler("3", fromDate, toDate);
    }

  };
  return (
    <Flex
      flexDir={"column"}
      justifyContent={"flex-start"}
      rounded={5}
      border={"5px solid orange"}
      backgroundColor={"orange"}
      p={2}
    >
      <HStack justifyContent={"space-between"}>
        <Heading m={0} p={0}>
          Custom Date Widget
        </Heading>
        <Button type={"submit"} form="datePicker" colorScheme={"twitter"}>
          Go
        </Button>
      </HStack>
      <Flex
        as={"form"}
        gap={5}
        onSubmit={customDateFilter}
        id="datePicker"
        flexDir={["column", "row", "row"]}
      >
        <FormControl>
          <FormLabel htmlFor="fromDate">From Date:</FormLabel>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
            id="fromDate"
            name="fromDate"
            onChange={(e) => setFromDate(e.target.value)}
            backgroundColor={"white"}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="toDate">To Date:</FormLabel>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
            id="toDate"
            name="toDate"
            onChange={(e) => setToDate(e.target.value)}
            backgroundColor={"white"}
          />
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default DatePicker;
