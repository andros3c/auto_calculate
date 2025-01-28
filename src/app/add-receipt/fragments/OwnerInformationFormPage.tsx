import { OwnerInitialValue, useAddReceiptContext } from "@/contexts/addReceipt";
import { checkIsValueValid } from "@/utils/checkIsValueValid";
import { day } from "@/utils/timeAndDate";

import { Flex, Input, Select, Text } from "@chakra-ui/react";
import { cloneDeep } from "lodash";

const OwnerInformationFormPage = () => {
  const { data, setData, setCanClickNextButton } = useAddReceiptContext();
  const { owner, category, day: _day, date } = data;

  const handleOnChange = (key: keyof OwnerInitialValue, value: string) => {
    const copiedData: OwnerInitialValue = cloneDeep(data);

    copiedData[key].value = value;
    copiedData[key].error = !checkIsValueValid(value)
      ? `${copiedData[key].label} harus diisi`
      : "";

    setData(copiedData);

    const ownerInformationFilled = Object.values(copiedData).every(
      (field) => field.value && field.error === ""
    );
    setCanClickNextButton(ownerInformationFilled);
  };

  return (
    <Flex direction="column" w="100%" gap="2em" h="100%" py="5em">
      <Text fontWeight={"bold"} fontSize="large">
        Masukkan Data Pelanggan
      </Text>
      <Flex direction="column" w="100%" gap="2.5em">
        <Flex direction="column">
          <Text>pemilik</Text>
          <Input
            type="text"
            variant="line"
            value={owner.value}
            onChange={(e) => handleOnChange("owner", e.target.value)}
          />
          <Text fontSize="small" color="red">
            {data.owner.error}
          </Text>
        </Flex>
        <Flex direction="column">
          <Text>kategori</Text>
          <Input
            onChange={(e) => handleOnChange("category", e.target.value)}
            type="text"
            variant="line"
            value={category.value}
          />
          <Text fontSize="small" color="red">
            {data.category.error}
          </Text>
        </Flex>
        <Flex direction="column">
          <Text>hari dan tanggal</Text>
          <Flex justifyContent="space-between">
            {/* <Input value={time?.day} w={"40%"} type="text" variant="line" /> */}
            <Select
              w={"50%"}
              value={_day.value}
              onChange={(e) => handleOnChange("day", e.target.value)}
            >
              {day.map((day, idx) => {
                return (
                  <option value={day} key={idx}>
                    {day}
                  </option>
                );
              })}
            </Select>
            <Input
              w={"50%"}
              type="date"
              value={date.value}
              variant="line"
              onChange={(e) => handleOnChange("date", e.target.value)}
            />
          </Flex>
          <Text fontSize="small" color="red">
            {date.error}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default OwnerInformationFormPage;
