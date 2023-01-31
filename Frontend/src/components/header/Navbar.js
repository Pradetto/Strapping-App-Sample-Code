import React from "react";

//CSS
import { Box, Flex } from "@chakra-ui/react";
import NavbarButton from "./NavbarButton";

const Navbar = ({ viewFormHandler, viewWidgetHandler }) => {
  return (
    <Flex
      minH={"4.5rem"}
      minW={"100vw"}
      bgColor={"lightgray"}
      justifyContent={"space-between"}
      alignItems={"center"}
      gap={"1rem"}
      px={"1rem"}
    >
      <Box as={"h1"}>
        <Box
          as={"img"}
          src="https://www.atsginc.com/sites/atsg-inc/files/logos/LGSTX-Logo.png"
          h={"3rem"}
        />
      </Box>
      <Box
        color="gray.700"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="1rem"
        textTransform="uppercase"
        ml="2"
      >
        LGSTX Strapping App (CHICAGO)
      </Box>
      <Flex gap={".5rem"}>
        <NavbarButton text="Filters" action={viewWidgetHandler} />
        <NavbarButton text="Add Item" action={viewFormHandler} />
      </Flex>
    </Flex>
  );
};

export default Navbar;
