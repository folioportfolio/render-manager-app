import { Text as ReactText, StyleSheet, StyleProp, ViewStyle, TextStyle} from "react-native";
import { theme } from "../../themes/themes";

export interface TextProps {
    children?: React.ReactNode;
    style?: StyleProp<TextStyle>
}

const Text = ({children, style}: TextProps) => {
    return (
        <>
            <ReactText style={[styles.text, style]}>
                {children}
            </ReactText>
        </>
    );
}

const styles = StyleSheet.create({
    text: {
        color: theme.color
    }
});

export default Text;