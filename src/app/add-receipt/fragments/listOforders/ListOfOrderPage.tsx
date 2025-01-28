import { colors } from "@/app/theme/foundations/colors";
import { useAddReceiptContext } from "@/contexts/addReceipt";
import { formatDate } from "@/utils/timeAndDate";
import { Flex, Text } from "@chakra-ui/react";
import { ListOfOrderStack } from "./ListOfOrderStack";
import { capitalize } from "lodash";

const ListOfOrderPage = () => {
  const { data } = useAddReceiptContext();
  const { owner, category, day, date } = data;

  return (
    <Flex direction="column" w="100%" h="75%" gap="1.5em">
      <Flex
        bgColor={colors.myColor.green[200]}
        direction="column"
        textColor="quaternary"
        p=".8em"
        borderRadius="10px"
      >
        <Flex justify={"space-between"}>
          <Text>Pemilik Barang</Text>
          <Flex w="50%">
            <Text>{capitalize(owner.value)}</Text>
          </Flex>
        </Flex>
        <Flex justify={"space-between"}>
          <Text>Kategori Barang</Text>
          <Flex w="50%">
            <Text>{capitalize(category.value)}</Text>
          </Flex>
        </Flex>
        <Flex justify={"space-between"}>
          <Text>Hari dan Tanggal</Text>
          <Flex w="50%">
            <Text justifySelf="flex-start">
              {day.value + " " + formatDate(date.value)}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <ListOfOrderStack />
    </Flex>
  );
};
export default ListOfOrderPage;
