'use client'
import React, { useState, ChangeEvent, InputHTMLAttributes, KeyboardEvent, FocusEvent } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    masks: string[];
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    defaultValue?: string
}

const MultiMask: React.FC<Props> = ({ masks, onChange, defaultValue, ...rest }: Props) => {
    const [maskedValue, setMaskedValue] = useState<string | undefined>();

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
            setMaskedValue(String(maskedValue).slice(0, -1));
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
        setMaskedValue(combinedResult.replaceAll(/#/g, "_"));
        event.target.value = combinedResult.replaceAll(/#/g, "")
        onChange ? onChange(event) : '';
    };

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
        // Quando o campo recebe foco, definimos o valor como o valor mascarado
        setMaskedValue(event.target.value)
    };


    return <input  {...rest} onChange={handleChanger} onFocus={handleFocus} onKeyDown={handleKeyDown} defaultValue={defaultValue} value={maskedValue} />;
};

export default MultiMask;
