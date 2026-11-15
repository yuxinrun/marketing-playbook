const UNSPLASH = "https://images.unsplash.com/";

export function unsplash(id: string, width = 1600, quality = 80) {
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

export const photos = {
  heroStrategy: unsplash("photo-1552664730-d307ca884978", 1800),
  heroAlternate: unsplash("photo-1531403009284-440f080d1e12", 1800),
  team: unsplash("photo-1521737711867-e3b97375f902", 1200),
  analytics: unsplash("photo-1460925895917-afdab827c52f", 1200),
  brand: unsplash("photo-1558655146-9f40138edfeb", 1200),
  creative: unsplash("photo-1504384308090-c894fdcc538d", 1200),
  content: unsplash("photo-1499750310107-5fef28a66643", 1200),
  search: unsplash("photo-1573164713988-8665fc963095", 1200),
  social: unsplash("photo-1553877522-43269d4ea984", 1200),
  growth: unsplash("photo-1551288049-bebda4e38f71", 1200),
  ecommerce: unsplash("photo-1556742049-0cfed4f6a45d", 1200),
  b2b: unsplash("photo-1542744173-8e7e53415bb0", 1200),
  coffee: unsplash("photo-1442512595331-e89e73853f31", 1200),
  strategyDesk: unsplash("photo-1454165804606-c3d57bc86b40", 1200),
  notebook: unsplash("photo-1531403009284-440f080d1e12", 1200),
  workshop: unsplash("photo-1531482615713-2afd69097998", 1200),
  library: unsplash("photo-1507842217343-583bb7270b66", 1200),
  globe: unsplash("photo-1451187580459-43490279c0fa", 1200),
  lab: unsplash("photo-1581091226825-a6a2a5aee158", 1200),
  apple: unsplash("photo-1521976631-8d9d9c9c1f9f", 1200),
  nike: unsplash("photo-1542291026-7eec264c27ff", 1200),
  ikea: unsplash("photo-1555041469-a586c61ea9bc", 1200),
  airbnb: unsplash("photo-1522708323590-d24dbb6b0267", 1200),
  starbucks: unsplash("photo-1554118811-1e0d58224f24", 1200),
  duolingo: unsplash("photo-1509062522246-3755977927d7", 1200),
  tesla: unsplash("photo-1617704548623-340376564e68", 1200),
  netflix: unsplash("photo-1574375927938-d5a98e8ffe85", 1200),
  cocacola: unsplash("photo-1554866585-cd94860890b7", 1200),
};
