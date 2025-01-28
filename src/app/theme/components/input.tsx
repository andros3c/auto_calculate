import { colors } from "../foundations/colors";

export const inputStyles = {
  variants: {
    line: () => {
      // const { isRequired, isDisabled } = props;
      return {
        field: {
          padding: 0,
          width: "100%",
          borderBottom: `2px solid ${colors.myColor.black[200]}`,
          borderTop: "0px",
          borderRight: "0px",
          borderLeft: "0px",
          borderRadius: "0px",
          // ...(isDisabled && {
          //   bgColor: colors.myColor.black[500],
          //   color: colors.myColor.black[500],
          // }),

          // borderColor: isRequired
          //   ? colors.myColor.black[500]
          //   : colors.myColor.black[200],
          _focus: {
            outline: "none",
            borderColor: "primary",
          },
          _disabled: {
            opacity: 1,
          },
        },
      };
    },
  },
};
