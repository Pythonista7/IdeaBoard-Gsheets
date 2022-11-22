import Head from "next/head";
import styles from "../styles/Home.module.css";

import {
  VStack,
  Stack,
  Text,
  Textarea,
  Input,
  Button,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { useForm } from "react-hook-form";

export default function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }, // catch error messages
  } = useForm();

  function submitHandler(data) {
    fetch("/api/sheet", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    reset(); // clears the input on submitting
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Idea Board!</title>
      </Head>
      <main className={styles.main}>
        <VStack spacing="1px" width="70%" align="center">
          <Text fontSize="2xl" fontWeight="bold">
            Share Exciting Ideas!
          </Text>

          <Stack textAlign={"center"} flexDirection={"column"}>
            <form onSubmit={handleSubmit(submitHandler)}>
              <Input
                placeholder="Enter Name"
                variant="filled"
                mt={2}
                {...register("Name", { required: "Please enter your name" })}
              />
              {errors.Name && errors.Name.message}

              <Textarea
                placeholder="Describe your Idea"
                variant="filled"
                mt={2}
                {...register("Ideas", {
                  required: "Share an Idea!",
                })}
              />
              {errors.Ideas && errors.Ideas.message}

              <VStack align="center">
                <Button
                  colorScheme="teal"
                  bg={"gray.500"}
                  textColor={"white"}
                  _hover={{
                    bgColor: "pink.200",
                    textColor: "gray.900",
                  }}
                  type="submit"
                  mt={4}
                  variant="solid"
                >
                  Submit
                </Button>
              </VStack>
            </form>
          </Stack>
        </VStack>

        <Link
          href="https://docs.google.com/spreadsheets/d/1IFgo8X_j-37gzs2iFe9loo8hdmE6Muo7UH9_t1c1snM/edit?usp=sharing"
          marginTop={4}
          isExternal
        >
          View the Google Sheet <ExternalLinkIcon mx="2px" />
        </Link>
      </main>
    </div>
  );
}
