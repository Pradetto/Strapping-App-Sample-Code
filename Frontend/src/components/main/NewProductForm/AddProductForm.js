import React, { useState } from "react";

// CSS
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Heading,
  Highlight,
  Text,
  Button,
  Stack,
  IconButton,
} from "@chakra-ui/react";

import { CloseIcon } from "@chakra-ui/icons";

const AddProductForm = ({
  viewFormHandler,
  newLabelHandler,
  apiWebsite,
  setActiveFilter,
  viewForm,
}) => {
  const [label, setLabel] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const postLabel = async () => {
      try {
        const res = await fetch(`${apiWebsite}/api/label`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ label: label }),
        });

        if (res.ok) {
          newLabelHandler();
        }
      } catch (e) {
        console.log(e);
      }
    };
    postLabel();
    setLabel("");
  };

  return (
    <Flex justifyContent={"center"}>
      <Flex
        alignItems={"center"}
        m={5}
        flexDir={"column"}
        bgColor={"lightblue"}
        p={"1rem"}
        rounded={5}
        boxShadow={"xl"}
      >
        <Flex w={"100%"} justifyContent={"flex-end"}>
          <IconButton
            colorScheme="red"
            aria-label="Search database"
            size={"sm"}
            icon={<CloseIcon />}
            onClick={viewFormHandler}
          />
        </Flex>
        <Heading as={"h2"} size={"lg"}>
          Scan Barcode
        </Heading>
        <Text
          mt="1"
          fontWeight="normal"
          borderBottom={"5px solid gray.500"}
          maxW={["none", "none", "40%"]} // can control width of scan box here
        >
          <Highlight
            query="Instructions:"
            styles={{ py: "1", fontWeight: "bold" }}
          >
            Instructions: Plug scanner in. Click on scan label input box below.
            Test scan one label the table below should update with the past 10
            scans and show the label you just scanned. If the check is good
            continue scanning. Make sure to not scan too fast and that the
            entries are being captured.
          </Highlight>
        </Text>
        <Stack as="form" onSubmit={formSubmitHandler} spacing={3} mt={5}>
          <FormControl isRequired>
            <FormLabel htmlFor="label">Label</FormLabel>
            <Input
              id="label"
              name="label"
              placeholder="Scan Label"
              bgColor={"white"}
              type="text"
              onChange={(e) => setLabel(e.target.value)}
              value={label}
            />
          </FormControl>
          <Button
            type={"submit"}
            onClick={() => setActiveFilter("Past 10 Entries")}
          >
            Submit Barcode
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default AddProductForm;
