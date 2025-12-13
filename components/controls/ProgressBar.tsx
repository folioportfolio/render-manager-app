import { View, StyleSheet, DimensionValue, StyleProp, ViewStyle } from "react-native";
import { theme } from "../../themes/themes";

export interface ProgressBarProps {
    min: number;
    max: number;
    value: number;
    color?: string;
    style?: StyleProp<ViewStyle>;
}

const ProgressBar = ({min, max, value, color, style}: ProgressBarProps) => {

    const getRightValue = () : DimensionValue => {
        return `${100 - ((value - min) / (max - min) * 100)}%`;
    }

    return (
        <View style={[styles.border, style]}>
            <View style={[styles.value, {right: getRightValue(), backgroundColor: color ?? theme.accent}]} />
        </View>
    );
}

const styles = StyleSheet.create({
    border: {
        backgroundColor: theme.background,
        borderColor: theme.borderColor,
        borderWidth: theme.borderThickness,
        height: 10
    },
    value: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0
    }
});

export default ProgressBar;