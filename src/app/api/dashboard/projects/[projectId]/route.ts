import { NextResponse } from 'next/server'

// Legacy per-project mutation endpoint is retired. All booking changes must
// pass through /api/dashboard/projects for authorization and notifications.
export async function PUT() {
  return NextResponse.json({ error: 'Use /api/dashboard/projects to update bookings' }, { status: 410 })
}
