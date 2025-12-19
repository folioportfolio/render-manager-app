import {
    StyleSheet,
    StyleProp,
    ViewStyle,
    PressableProps,
    Pressable,
    MouseEvent
} from "react-native";
import { theme } from "../../themes/themes";
import { useRef, useState } from "react";

export interface ButtonProps extends PressableProps {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

const Button = ({ children, style, ...props }: ButtonProps) => {
    const [hovered, setHovered] = useState(false);

    const onHoverIn = (e: MouseEvent) => {
        setHovered(true);
        props.onHoverIn?.(e);
    }

    const onHoverOut = (e: MouseEvent) => {
        setHovered(false);
        props.onHoverOut?.(e);
    }

    return (
        <>
            <Pressable
                {...props}
                style={({pressed}) => [
                    styles.button,
                    styles.shadow,
                    pressed && styles.pressed,
                    hovered && styles.hovered,
                    style
                    ]}
                onHoverIn={onHoverIn}
                onHoverOut={onHoverOut}>
                {children}
            </Pressable>
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.accent,
        height: 40,
        borderWidth: 3,
        borderColor: theme.borderColor,
        marginTop: 5,
        marginHorizontal: 10,
        paddingHorizontal: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    pressed: {
        transform: [{
            translateX: 3,
        },{
            translateY: 3
        }],
        boxShadow: [
            {
                offsetX: 2,
                offsetY: 2,
                blurRadius: 0,
                spreadDistance: 0,
                color: theme.shadow,
            },
        ],
    },
    hovered: {
        backgroundColor: theme.accentLight
    },
    shadow: {
        boxShadow: [
            {
                offsetX: 5,
                offsetY: 5,
                blurRadius: 0,
                spreadDistance: 0,
                color: theme.shadow,
            },
        ],
    },
});

export default Button;
