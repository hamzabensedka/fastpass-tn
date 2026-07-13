export type StatCardProps = {
  label: string;
  value: string | number;
  helper?: string;
};

export function formatStatCard({ label, value, helper }: StatCardProps): string {
  return helper ? `${label}: ${value} (${helper})` : `${label}: ${value}`;
}
