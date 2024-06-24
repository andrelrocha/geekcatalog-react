import { Box, Typography } from "@mui/material";
import { colors } from "../../utils/colors";

interface TextWarningProps {
  children: string | string[]
  backgroundColor?: string
  textColor?: string
  fs?: number
  w?: number
  o?: number
  mt?: number
  mb?: number
  mr?: number
  ml?: number
  h?: number
  fw?: string
}

const styles = {
    warningWrapper: {
      marginBottom: 10,
      marginTop: 0,
      marginLeft: 0,
      marginRight: 0,
      borderRadius: 10,
      padding: 5,
      borderWidth: 1,
      borderColor: colors.blackOpacity,
      backgroundColor: colors.sageOpacity,
      width: "100%",
      opacity: 0.8,
      height: 30,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

const TextWarning = (props: TextWarningProps) => {
    const dynamicStylesBG = {
        backgroundColor: props.backgroundColor || styles.warningWrapper.backgroundColor,
        width: props.w || styles.warningWrapper.width,
        opacity: props.o || styles.warningWrapper.opacity,
        marginTop: props.mt || styles.warningWrapper.marginTop,
        marginBottom: props.mb || styles.warningWrapper.marginBottom,
        marginRight: props.mr || styles.warningWrapper.marginRight,
        marginLeft: props.ml || styles.warningWrapper.marginLeft,
        height: props.h || styles.warningWrapper.height,
    };

    return (
        <Box sx={[styles.warningWrapper, dynamicStylesBG]}>
            <Typography fontSize={props.fs} fontWeight={props.fw} color={props.textColor}>{props.children}</Typography>
        </Box>
    );
}

export default TextWarning;