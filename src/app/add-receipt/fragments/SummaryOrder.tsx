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
import { useReactToPrint } from "react-to-print";
import { startCase } from "lodash";
import { colors } from "@/app/theme/foundations/colors";

export const SummaryOrder = () => {
  const { data, ordersData } = useAddReceiptContext();
  const {
    owner: { value: ownerValue },
    category: { value: CategoryValue },
    date: { value: dateValue },
    day: { value: dayValue },
  } = data;

  const [selected, setSelected] = useState(0);

  // Function to calculate grand total
  const calculateGrandTotal = () => {
    let total = 0;
    for (const i of ordersData) {
      total += i.totalPrice ?? 0;
    }
    return total;
  };

  // Function to capture the component and save as an image

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const handleClick = () => {
    reactToPrintFn();
  };
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
                      {!notUsingUnit ? (
                        <Td>Rp{formatCurrency(price)}</Td>
                      ) : (
                        <Td></Td>
                      )}
                      <Td>Rp{formatCurrency(totalPrice ?? 0)}</Td>
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
      <Button onClick={handleClick}>Cetak Bon</Button>
    </Flex>
  );
};
