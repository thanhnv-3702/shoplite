import { useNavigate, useParams } from "react-router-dom";
import { ProductDetail } from "../components/ProductDetail";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = Number(id);

  if (!Number.isFinite(productId) || productId <= 0) {
    return (
      <section className="rounded-xl border border-line bg-surface px-4 py-10 text-center">
        <p className="text-sm text-ink-soft">Sản phẩm không hợp lệ.</p>
        <button
          type="button"
          onClick={() => void navigate("/")}
          className="mt-4 text-sm font-semibold text-ink hover:underline"
        >
          ← Về trang chủ
        </button>
      </section>
    );
  }

  return (
    <ProductDetail
      productId={productId}
      onBack={() => {
        void navigate(-1);
      }}
    />
  );
}
