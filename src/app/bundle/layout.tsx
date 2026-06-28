import BundlePageShell from "./BundlePageShell";

export default function BundleLayout({ children }: { children: React.ReactNode }) {
  return <BundlePageShell>{children}</BundlePageShell>;
}
