const routes = [
  '/',
  '/category/all',
  '/category/hoodies',
  '/category/oversized-tees',
  '/category/cargos-denim',
  '/category/tracksuits',
  '/category/jackets',
  '/product/bx-001',
  '/product/bx-002',
  '/product/bx-003',
  '/product/bx-004',
];

async function runTests() {
  console.log('Testing Brand X Store Routes:');
  for (const r of routes) {
    try {
      const res = await fetch(`http://localhost:3000${r}`);
      console.log(`✓ ${r.padEnd(26)} -> Status: ${res.status} OK`);
    } catch (err) {
      console.error(`✗ ${r} -> Error: ${err.message}`);
    }
  }
}

runTests();
