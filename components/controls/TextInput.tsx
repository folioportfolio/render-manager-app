import { TextInput as ReactInput, TextInputProps as ReactInputProps, Text, StyleProp, StyleSheet, View, ViewStyle, BlurEvent, FocusEvent} from "react-native";
import { theme } from "../../themes/themes";
import { useEffect, useRef, useState } from "react";

export interface TextInputProps extends ReactInputProps {
    label?: string;
    style?: StyleProp<ViewStyle>;
    onCommit?: (v: string) => void;
}

const TextInput = ({value, label, style, onCommit, ...props}: TextInputProps) => {
    const [isFocused, setIsFocused] = useState(false);

    const onFocus = (e: FocusEvent) => {
        setIsFocused(true);
        props.onFocus?.(e);
    }

    const onBlur = (e: BlurEvent) => {
        setIsFocused(false);
        props.onBlur?.(e);
    }

    return (
        <>
            <View style={style}>
                {label && <Text style={isFocused ? [styles.inputLabel, styles.inputLabelFocused] : styles.inputLabel}>{label}</Text>}

                <View style={isFocused ? [styles.inputWrapper, styles.focusedShadow] : [styles.inputWrapper, styles.shadow]}>
                    <ReactInput {...props} value={value} style={styles.input} onFocus={onFocus} onBlur={onBlur}/>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    inputWrapper: {
        height: 40,
        borderWidth: 3,
        borderColor: theme.borderColor,
        marginTop: 5,
        paddingLeft: 10
    },
    input: {
        outlineStyle: "none" as any,
        flex: 1
    },
    inputLabel: {
        fontWeight: 400,
        fontSize: 16
    },
    inputLabelFocused: {
        fontWeight: 600
    },
    shadow: {
        boxShadow: [{
            offsetX: 5,
            offsetY: 5,
            blurRadius: 0,
            spreadDistance: 0,
            color: theme.shadow,
        }]
    },
    focusedShadow: {
        boxShadow: [{
            offsetX: 2,
            offsetY: 2
        }]
    }
});

export default TextInput;