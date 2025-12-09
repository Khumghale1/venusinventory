import { createFileRoute, redirect } from '@tanstack/react-router'
import Header from '../components/Header'
import { storage } from '../lib/utils/storage'

export const Route = createFileRoute('/inventory')({
  beforeLoad: () => {
    const token = storage.getToken()
    if (!token) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: InventoryPage,
})

function InventoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Inventory Management</h1>
        <p className="text-gray-600">Loading inventory...</p>
      </main>
    </div>
  )
}
