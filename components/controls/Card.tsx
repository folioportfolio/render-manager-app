import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { theme } from "../../themes/themes";

export interface CardProps {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

const Card = ({ children, style }: CardProps) => {
    return (
        <>
            <View style={[styles.card, styles.shadow, style]}>
                {children}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.background,
        borderColor: theme.borderColor,
        borderWidth: theme.borderThickness
    },
    shadow: {
        boxShadow: [{
            offsetX: 5,
            offsetY: 5,
            blurRadius: 0,
            spreadDistance: 0,
            color: theme.shadow,
        }]
    }
});

export default Card;