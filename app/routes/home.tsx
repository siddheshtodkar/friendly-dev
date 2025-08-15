import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Freindly Dev" },
    { name: "description", content: "Portfolio Website" },
  ];
}

export default function Home() {
  return <>My App</>;
}