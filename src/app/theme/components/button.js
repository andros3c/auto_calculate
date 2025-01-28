import { colors } from "../foundations/colors";

export const buttonStyles = {
  baseStyle: (props) => {
    const { isDisabled } = props;

    return {
      color: "#FFF",
      fontSize: "0.875em",
      border: "none",
      borderRadius: "11px",
      cursor: "pointer",
      ...(isDisabled && {
        _disabled: {
          bgColor: colors.myColor.black[100],
        },
      }),
    };
  },
  variants: {
    solid: ({ colorScheme, isDisabled }) => ({
      bgColor: colors.myColor[colorScheme][500],
      borderRadius: "11px",
      _hover: {
        bgColor: colors.myColor[colorScheme][400],
        ...(isDisabled && {
          _disabled: { bgColor: colors.myColor.black[200] },
        }),
      },
    }),
    light: ({ colorScheme, isDisabled }) => ({
      bgColor: colors.myColor[colorScheme][200],
      color: colors.myColor[colorScheme][500],
      borderRadius: "11px",
      _disabled: { bgColor: "transparent" },
      _hover: {
        bgColor: colors.myColor[colorScheme][100],
        color: colors.myColor[colorScheme][500],
        ...(isDisabled && {
          _disabled: { bgColor: colors.myColor.black[200] },
        }),
      },
    }),
    transparent: ({ colorScheme, isDisabled }) => ({
      bgColor: "transparent",
      color: colors.myColor[colorScheme][500],
      _disabled: { bgColor: "transparent" },
      _hover: {
        bgColor: colors.myColor[colorScheme][200],
        color: colors.myColor[colorScheme][500],
        ...(isDisabled && {
          _disabled: { bgColor: colors.myColor.black[200] },
        }),
      },
    }),
  },

  defaultProps: {
    colorScheme: "green",
    variant: "solid",
  },
};
