// Force dynamic rendering (uses cookies for Supabase auth)
export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-green-900 mb-2">✅ Admin Dashboard Loaded!</h2>
        <p className="text-green-700">
          Authentication is working. Dashboard data loading will be restored in next update.
        </p>
      </div>
    </div>
  )
}
