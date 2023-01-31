import React from "react";

// CSS
import { Button } from "@chakra-ui/react";
const NavbarButton = ({ text, action }) => {
  return <Button onClick={action}>{text}</Button>;
};

export default NavbarButton;
