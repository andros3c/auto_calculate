"use client";
import HomeIconGenerator from "@/components/HomeIconGenerator";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { IoIosMenu, IoMdAdd } from "react-icons/io";

export default function Home() {
  const { push } = useRouter();
  return (
    <Flex h="100%" w="100%" position={"relative"}>
      <Flex
        direction="column"
        justifyContent="center"
        w="100%"
        alignItems="center"
        gap="2em"
      >
        {" "}
        <HomeIconGenerator
          icon={IoIosMenu}
          text={"Daftar Bon"}
          colorScheme={"green"}
          onClick={() => {}}
        />
        <HomeIconGenerator
          icon={IoMdAdd}
          text={"Tambah Bon"}
          colorScheme={"orange"}
          onClick={() => {
            push("/add-receipt");
          }}
        />
      </Flex>
    </Flex>
  );
}
