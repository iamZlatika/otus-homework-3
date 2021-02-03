// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UserOrderState = Exclude<OrderState, "buyingSupplies" | "producing">;

const orderStates = [
  "initial",
  "inWork",
  "buyingSupplies",
  "producing",
  "fullfilled",
] as const;

type OrderState = typeof orderStates[number];

// Hint: type guards
// Type guard можно применить только изменив код.
export const getUserOrderStates = (orderStates: OrderState[]): UserOrderState[] =>
  orderStates.filter(
    (state) : state is UserOrderState => state !== "buyingSupplies" && state !== "producing"
  );
