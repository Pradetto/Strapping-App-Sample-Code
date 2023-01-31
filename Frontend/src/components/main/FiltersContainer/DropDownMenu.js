import React, { useState } from "react";

import { Select, Heading, Stack, HStack, Button } from "@chakra-ui/react";

const DropDownMenu = ({ activeFilterHandler }) => {
  const [presetFilter, setPresetFilter] = useState(null);

  const presetDateSubmitHandler = (e) => {
    e.preventDefault();
    activeFilterHandler("1", presetFilter);
  };
  return (
    <Stack
      as={"form"}
      minH={"100%"}
      bgColor={"coral"}
      rounded={5}
      p={2}
      onSubmit={presetDateSubmitHandler}
      id={"presetDateForm"}
    >
      <HStack gap={20}>
        <Heading m={0} p={0}>
          Preset Date Widget
        </Heading>
        <Button type={"submit"} form="presetDateForm" colorScheme={"twitter"}>
          Go
        </Button>
      </HStack>
      <Select
        placeholder="Select option"
        p={2}
        bgColor={"white"}
        borderColor={"gray.500"}
        onChange={(e) => {
          setPresetFilter(e.target.value);
        }}
      >
        <option value="1week">1 Week</option>
        <option value="2weeks">2 Weeks</option>
        <option value="1month">1 Month</option>
        <option value="3months">3 Months</option>
        <option value="6months">6 Months</option>
        <option value="1year">1 Year</option>
      </Select>
    </Stack>
  );
};

export default DropDownMenu;
