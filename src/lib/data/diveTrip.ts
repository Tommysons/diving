export const diveTrip = {
  slug: 'maldives-mahibadhoo',
  guesthouse: 'Scuba Therapy Maldives',
  island: 'Mahibadhoo',
  nights: 7,
  dives: 14,
  rooms: 13,
  doublePrice: 1725,
  singlePrice: 2275,
  extras: [{name:'Full equipment rental',price:175},{name:'Additional dive',price:60},{name:'Nitrox (one week)',price:120}],
  // Public selling prices only. Never store supplier prices in a client bundle.
  season: 'February–April (year and availability to be confirmed)',
} as const
