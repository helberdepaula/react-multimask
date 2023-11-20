# Guia de Utilização do React-Multimask

O React-Multimask foi criado para simplificar a vida dos desenvolvedores front-end ao lidar com o uso de máscaras. Certifique-se de possuir a versão mínima do Node.js 18 antes de começar.

## Commands

Instalação

```bash
npm install react-multimask  # ou yarn add react-multimask
```
## Como Utilizar

Importe o pacote:
```JSX
import MultiMask from 'react-multimask';
```

## Exemplos de Máscaras:
```JSX
- Máscaras para CPF e CNPJ:
 <MultiMask masks={['###.###.###.##','##.###.###/####-##']} />

- Máscara para telefone:
 <MultiMask masks={['(##) # ####-####']} />

- Máscara para CEP:
<MultiMask masks={['#####-###']} />

- Máscara para Número de Cartão de Crédito:
<MultiMask masks={['#### #### #### ####']} />

- Máscara para Código de Segurança (CVV) de Cartão de Crédito:
<MultiMask masks={['###']} />

- Máscara para data:
<MultiMask masks={['##/##/##','##/##/####']} />

- Máscara para Código de Barras:
<MultiMask masks={['###############']} />

- Máscara para Número de Conta Bancária:
<MultiMask masks={['####-#']} />
```
Certifique-se de ajustar a importação e as máscaras conforme necessário para atender às especificidades do seu projeto. Simplifique sua experiência de desenvolvimento front-end com o React-Multimask!

## License
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)