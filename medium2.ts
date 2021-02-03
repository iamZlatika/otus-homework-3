// Задание второго уровня 2
// Есть функция которая достает из реакт компонента (любого, и Functional и Class) его defaultProps
// Нужно заменить FIXME на правильный тип

type DefaultProps<T> = T extends React.ComponentType<infer P> ? React.ComponentType<P>["defaultProps"] : never;

// Hint: infer
export const getDefaultProps = <T>(
  component: React.ComponentType<T>
): DefaultProps<React.ComponentType<T>> => {
  return component.defaultProps;
};