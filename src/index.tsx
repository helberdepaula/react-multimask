import React, { useState, ChangeEvent, InputHTMLAttributes, KeyboardEvent } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    masks: string[];
}

const MultiMask = ({ masks, ...rest }: Props) => {
    const [maskedValue, setMaskedValue] = useState("");

    const applyMask = (inputValue: string, mask: string) => {
        let result = "";
        let inputIndex = 0;

        for (let i = 0; i < mask.length; i++) {
            const maskChar = mask[i];

            if (maskChar === "#" && inputIndex < inputValue.length) {
                result += inputValue[inputIndex];
                inputIndex++;
            } else {
                result += maskChar;
            }
        }

        return result;
    };

    const clear = (value: string) => {
        return value && value.replace(/[^0-9]/g, "");
    }

    const getMask = (str: string) => {
        return masks.find((item: string) => {
            return str.length <= (item.match(/#/g) || []).length;
        })
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Backspace") {
            // Trata o comportamento específico do "Backspace" na máscara
            event.preventDefault();
            setMaskedValue(maskedValue.slice(0, -1));
        }
    };

    const handleChanger = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = clear(event.target.value);

        const mask = getMask(inputValue)
        if (mask === undefined) return

        // Aplica a máscara combinada ao input
        let combinedResult = inputValue;
        combinedResult = applyMask(combinedResult, String(mask));

        // Atualiza o estado com o valor mascarado
        setMaskedValue(combinedResult.replaceAll(/#/g, ""));
        event.target.value = combinedResult.replaceAll(/#/g, "")
    };

    return <input value={maskedValue} onChange={handleChanger}  onKeyDown={handleKeyDown} {...rest} />;
};

export default MultiMask;