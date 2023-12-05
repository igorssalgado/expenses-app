import { UnorderedList, ListItem, HStack } from "@chakra-ui/react";
import { Expenses, currencyFormat } from "../App";
import "./FixedExpenses.css";

interface Props {
  fixedExpensesList: Expenses[];
}

const FixedExpensesList = ({ fixedExpensesList }: Props) => {
  return (
    <UnorderedList className="expensesList">
      {fixedExpensesList.map((expense) => (
        <HStack key={expense.id} className="expensesList">
          <ListItem key={expense.id}>
            {expense.name} {currencyFormat(expense.amount)}
          </ListItem>
        </HStack>
      ))}
    </UnorderedList>
  );
};

export default FixedExpensesList;
