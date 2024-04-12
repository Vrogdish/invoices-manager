import ProtectedRoute from "@/modules/auth/ProtectedRoute";
import ProductsContainer from "@/modules/products/containers/products-container/ProductsContainer";

export default function pages() {
  return (
    <main>
      <ProtectedRoute>
        <ProductsContainer />
      </ProtectedRoute>
    </main>
  );
}
