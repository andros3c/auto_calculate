import { colors } from "@/app/theme/foundations/colors";
import { Flex, Icon, Text } from "@chakra-ui/react";

const HomeIconGenerator = ({ icon, text, colorScheme, onClick }) => {
  const handleClick = typeof onClick === "function" ? onClick : undefined;
  return (
    <Flex
      p=".5em"
      px=".7em"
      pb="1em"
      bgColor={colors.myColor[colorScheme][500]}
      direction="column"
      borderRadius={"11px"}
      cursor={"pointer"}
      _hover={{ bgColor: colors.myColor[colorScheme][400], boxShadow: "lg" }}
      onClick={handleClick}
    >
      <Icon width="120px" height="120px" as={icon} textColor="white" />
      <Text
        fontSize="large"
        mt="-20px"
        textAlign="center"
        color={"white"}
        fontWeight={"bold"}
      >
        {text}
      </Text>
    </Flex>
  );
};
export default HomeIconGenerator;
