import ProtectedRoute from "@/core/auth/ProtectedRoute";
import CustomersContainer from "@/modules/customers/containers/customers-container/CustomersContainer";

export default function page() {
  return (
    <main>
      <ProtectedRoute>
        <CustomersContainer />
      </ProtectedRoute>
    </main>
  );
}
