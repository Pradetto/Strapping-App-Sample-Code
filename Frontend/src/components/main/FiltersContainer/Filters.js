import React from "react";

// Components
import DropDownMenu from "./DropDownMenu";
import DatePicker from "./DatePicker";

// CSS
import {
  Flex,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  HStack,
  Button,
} from "@chakra-ui/react";

//Middleware
import { CSVLink } from "react-csv";

import { SearchIcon } from "@chakra-ui/icons";

const Filters = ({
  activeFilterHandler,
  labels,
  searchBarHandler,
  activeFilter,
}) => {
  return (
    <Stack>
      <Flex justifyContent={"center"} my={5} flexWrap={"wrap"} gap={5}>
        <DropDownMenu activeFilterHandler={activeFilterHandler} />
        <DatePicker activeFilterHandler={activeFilterHandler} />
      </Flex>
      <HStack px={5}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            type="text"
            placeholder="Search Barcode Label"
            onChange={(e) => searchBarHandler(e.target.value.toLowerCase())}
          />
        </InputGroup>
        <CSVLink
          filename={`BarcodeScans ${activeFilter} (CMPTR TIMEZONE).csv`}
          data={labels}
        >
          <Button>Export</Button>
        </CSVLink>
      </HStack>
    </Stack>
  );
};

export default Filters;
