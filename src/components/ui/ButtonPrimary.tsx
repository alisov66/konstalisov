import Button, { type ButtonProps } from "./Button";

export type ButtonPrimaryProps = ButtonProps;
export default function ButtonPrimary(props: ButtonPrimaryProps) {
  return <Button {...props} variant="primary" />;
}
