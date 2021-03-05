// Shared types and functionality related to styling

export type ButtonVariant =
  | "primary"
  | "secondary";

export function ellipsed(x: string, length: number = 10): string {
  return `${x.slice(0, length + 2)}...${x.slice(-length)}`;
}
