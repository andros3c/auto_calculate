import { colors } from "@/app/theme/foundations/colors";
import { useAddReceiptContext } from "@/contexts/addReceipt";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/timeAndDate";
import "./style.css";
import {
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import { toPng } from "html-to-image";
import { useReactToPrint } from "react-to-print";
import { startCase } from "lodash";
import { color } from "framer-motion";

export const SummaryOrder = () => {
  const { data, setData, ordersData } = useAddReceiptContext();
  const {
    owner: { value: ownerValue },
    category: { value: CategoryValue },
    date: { value: dateValue },
    day: { value: dayValue },
  } = data;

  const [selected, setSelected] = useState();

  // Function to calculate grand total
  const calculateGrandTotal = () => {
    var total = 0;
    for (const i of ordersData) {
      total += i.totalPrice;
    }
    return total;
  };

  // Function to capture the component and save as an image
  const captureImage = async () => {
    const element = document.getElementById("summary-order-container"); // Reference the container
    if (element) {
      try {
        const dataUrl = await htmlToImage.toPng(element, {
          backgroundColor: "#ffffff", // Set background color
          width: element.scrollWidth, // Capture the full width, including overflow
          height: element.scrollHeight, // Capture the full height, including overflow
          style: {
            transform: "none", // Prevent scaling that might cut off parts of the element
            padding: "0px", // Optional, ensure there's no extra padding
            margin: "0px", // Optional, ensure there's no extra margin
          },
        });

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "summary-order.png"; // Set the file name
        link.click(); // Trigger the download
      } catch (error) {
        console.error("Error capturing the image: ", error);
      }
    }
  };

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <Flex direction="column" w="100%" gap="1em" h="100%">
      <Text fontSize="large">Summary Pesanan</Text>
      <Flex
        ref={contentRef}
        direction="column"
        w="100%"
        h="100%"
        gap="1em"
        id="summary-order-container"
        className="print-padding"
      >
        <Flex direction="column" gap=".5em">
          <Text>Bon Pembelian</Text>
          <Flex direction="column" gap=".2em">
            <Flex justify={"space-between"}>
              <Text fontSize="small" fontWeight="light">
                Pemilik Barang
              </Text>
              <Text fontSize="small" fontWeight="medium">
                {startCase(ownerValue)}
              </Text>
            </Flex>
            <Flex justify={"space-between"}>
              <Text fontSize="small" fontWeight="light">
                Kategori Barang
              </Text>
              <Text fontSize="small" fontWeight="medium">
                {startCase(CategoryValue)}
              </Text>
            </Flex>
            <Flex justify={"space-between"}>
              <Text fontSize="small" fontWeight="light">
                Hari dan Tanggal
              </Text>
              <Text fontSize="small" fontWeight="medium">
                {dayValue + " | " + formatDate(dateValue)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex minHeight="65%" direction={"column"}>
          <TableContainer overflowY="scroll" h="100%">
            <Table borderWidth={".5px"} variant="simple" size={"sm"}>
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th boxSize="40%">Nama Barang</Th>
                  <Th>Jumlah</Th>
                  {/* <Th>Satuan</Th> */}
                  <Th>Harga Per Kg</Th>
                  <Th>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {ordersData.map((ele, idx) => {
                  const { name, amount, unit, price, totalPrice } = ele;
                  const notUsingUnit = unit === "Tidak ada";
                  const usingGram = unit === "Gram";
                  return (
                    <Tr
                      bgColor={
                        selected === idx ? colors.myColor.black[100] : "none"
                      }
                      key={idx}
                      onClick={() => setSelected(idx)}
                      borderWidth={".5px"}
                    >
                      <Td>{idx + 1}</Td>
                      <Td>{startCase(name)}</Td>
                      <Td>
                        {usingGram ? amount / 1000 : amount}
                        {!usingGram ? (!notUsingUnit ? unit : "") : "Kg"}
                      </Td>
                      {/* {!usingGram ? (
                        notUsingUnit ? (
                          <Td></Td>
                        ) : (
                          <Td>{unit}</Td>
                        )
                      ) : (
                        <Td>Kg</Td>
                      )} */}
                      {!notUsingUnit ? (
                        <Td>Rp{formatCurrency(price)}</Td>
                      ) : (
                        <Td></Td>
                      )}
                      <Td>Rp{formatCurrency(totalPrice)}</Td>
                    </Tr>
                  );
                })}
                <Tr>
                  <Td colSpan={4} textAlign={"center"}>
                    Total Harga
                  </Td>
                  <Td bgColor={colors.myColor.black[500]} color={"white"}>
                    Rp{formatCurrency(calculateGrandTotal())}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
        {/* Button to trigger image capture */}
      </Flex>
      <Button onClick={reactToPrintFn}>Cetak Bon</Button>
    </Flex>
  );
};
