import { useRef, useState } from "react";
import FixedExpensesList from "./components/FixedExpenses";
import {
  VStack,
  Input,
  HStack,
  Button,
  NumberInput,
  NumberInputField,
  Text,
  Box,
  Stack,
} from "@chakra-ui/react";

export interface Expenses {
  id: number;
  name: string;
  amount: number;
}

let RealBR = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const currencyFormat = (amount: number) => {
  return RealBR.format(amount);
};

function App() {
  const [fixedExpensesList, setFixedExpensesList] = useState<Expenses[]>([]);

  const inputFixedExpenseName = useRef<HTMLInputElement>(null);
  const inputFixedExpenseAmount = useRef<HTMLInputElement>(null);

  const addExpense = () => {
    const name = inputFixedExpenseName.current!.value;
    const amount = inputFixedExpenseAmount.current!.value;
    setFixedExpensesList((prevExpenses) => {
      return [
        ...prevExpenses,
        { id: idGen(), name: name, amount: Number(amount) },
      ];
    });
  };

  const idGen = () => {
    return fixedExpensesList.length === 0
      ? 1
      : fixedExpensesList[fixedExpensesList.length - 1].id + 1;
  };

  const fixedExpensesTotal = () => {
    return RealBR.format(
      fixedExpensesList.reduce((a, b) => a + (b["amount"] || 0), 0)
    );
  };

  return (
    <VStack>
      <Text>{fixedExpensesTotal()}</Text>
      <HStack>
        <Input ref={inputFixedExpenseName}></Input>
        <NumberInput>
          <NumberInputField ref={inputFixedExpenseAmount} />
        </NumberInput>
        <Button onClick={addExpense}>Add</Button>
      </HStack>
      <Stack direction={["column", "row"]} spacing="24px">
        <Box w="100%" h="100%" bg="yellow">
          <FixedExpensesList fixedExpensesList={fixedExpensesList} />
        </Box>
      </Stack>
    </VStack>
  );
}

export default App;
