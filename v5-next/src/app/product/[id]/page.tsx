import { RoutePlaceholder } from "@/components/RoutePlaceholder";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  console.log("[server] ProductPage render", id);

  return (
    <RoutePlaceholder
      title={`Sản phẩm #${id}`}
      description="Trang chi tiết — sẽ fetch theo id ở các ngày sau."
    />
  );
}
