import { View, StyleSheet, StyleProp, ViewStyle, TextInput as ReactText } from "react-native";
import { theme } from "../../themes/themes";
import { useState, ComponentProps } from "react";
import React from "react";

export type TextInputProps {
    style?: StyleProp<ViewStyle>;
    value?: string;
} & ComponentProps<typeof TextInput>;

const TextInput = ({ value, style }: TextInputProps) => {
    const [tmpValue, setTmpValue] = useState(value);

    const commit = (e: React.InputEvent<HTMLInputElement>) => {

    }

    const onKeyPressed = (e: React.InputEvent<HTMLInputElement>) => {

    }
    
    const onValueChanged = (e: React.InputEvent<HTMLInputElement>) => {

    }
    return (
        <>
            <View style={[styles.wrapper, style]}>
                <ReactText style={styles.input} value={tmpValue} onBlur={commit} onKeyPress={onKeyPressed} onChange={onValueChanged} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: theme.background,
        borderColor: theme.borderColor,
        borderWidth: theme.borderThickness
    },
    input: {
        padding: 5,
        margin: 0,
        flex: 1,
        borderWidth: 0,
        outlineWidth: 0,
        outlineStyle: undefined
    }
});

export default TextInput;