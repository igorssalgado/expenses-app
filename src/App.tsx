import { useRef, useState } from "react";
import FixedExpensesList from "./components/FixedExpenses";
import {
  VStack,
  Input,
  HStack,
  Button,
  Text,
  Box,
  Stack,
  Heading,
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
  const [fixedExpensesList, setFixedExpensesList] = useState<Expenses[]>([
    { id: 0, name: "item item item item item", amount: 2 },
    { id: 1, name: "item 2", amount: 2 },
  ]);
  const [buttonDisabled, setButtonDisabled] = useState(true);

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

  const fieldsEmpty = () => {
    if (
      inputFixedExpenseName.current!.value === "" ||
      inputFixedExpenseAmount.current!.value === "0"
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };

  return (
    <VStack>
      <Text>{fixedExpensesTotal()}</Text>
      <HStack>
        <Input
          type="text"
          autoFocus
          width="auto"
          ref={inputFixedExpenseName}
          onChange={fieldsEmpty}
        />
        <Input
          type="number"
          width="auto"
          ref={inputFixedExpenseAmount}
          onChange={fieldsEmpty}
        />
        <Button
          isDisabled={buttonDisabled}
          onClick={(e) => {
            addExpense();
            inputFixedExpenseName.current!.value = "";
            inputFixedExpenseName.current!.focus();
            inputFixedExpenseAmount.current!.value = "0";
            fieldsEmpty();
          }}
        >
          Add
        </Button>
      </HStack>
      <Stack direction={["column", "row"]} spacing="24px">
        <Box w="100%" h="100%" bg="yellow">
          <Heading>Fixed Expenses</Heading>
          <FixedExpensesList fixedExpensesList={fixedExpensesList} />
        </Box>
      </Stack>
    </VStack>
  );
}

export default App;
