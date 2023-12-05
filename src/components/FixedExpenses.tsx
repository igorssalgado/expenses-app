import { UnorderedList, ListItem } from "@chakra-ui/react";
import { Expenses, currencyFormat } from "../App";

interface Props {
  fixedExpensesList: Expenses[];
}

const FixedExpensesList = ({ fixedExpensesList }: Props) => {
  return (
    <UnorderedList>
      {fixedExpensesList.map((expense) => (
        <ListItem paddingRight={20} key={expense.id}>
          {expense.name} {currencyFormat(expense.amount)}
        </ListItem>
      ))}
    </UnorderedList>
  );
};

export default FixedExpensesList;
