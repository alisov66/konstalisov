import Button, { type ButtonProps } from "./Button";

export type ButtonSecondaryProps = ButtonProps;
export default function ButtonSecondary(props: ButtonSecondaryProps) {
  return <Button {...props} variant="secondary" />;
}
