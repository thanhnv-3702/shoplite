import { RoutePlaceholder } from "@/components/RoutePlaceholder";

export default function LoginPage() {
  console.log("[server] LoginPage render");

  return (
    <RoutePlaceholder
      title="Đăng nhập"
      description="Khung đăng nhập — Auth.js sẽ gắn ở Day 17."
    />
  );
}
