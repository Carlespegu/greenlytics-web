import React from 'react'

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Visió general de Greenlytics</h1>
        <p className="text-gray-500">Estat actual de plantes, sensors i lectures reals de la plataforma.</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="card">Plantes totals</div>
        <div className="card">Plantes actives</div>
        <div className="card">Sensors online</div>
        <div className="card">Lectures recents</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="card h-80">Tendència de lectures</div>
        <div className="card h-80">Estat de les plantes</div>
      </div>
    </div>
  )
}
