// E-5: Firestore 月次バックアップ (動的に全トップレベルコレクション取得)
// 実行: GOOGLE_APPLICATION_CREDENTIALS=sa-key.json BACKUP_OUT_DIR=/tmp/out node backup-firestore.js
// 出力: $BACKUP_OUT_DIR/backup-YYYY-MM-DD.json (UTC 日付)
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const OUT_DIR = process.env.BACKUP_OUT_DIR || '/tmp/backup-out';
const PROJECT_ID = 'project-4253359140668035575';

admin.initializeApp({ credential: admin.credential.applicationDefault() });
const db = admin.firestore();

// Firestore 固有型は JSON 復元可能な形に変換 (__firestore__ タグで後から識別可能)
function normalize(v) {
  if (v === null || v === undefined) return v;
  if (v instanceof admin.firestore.Timestamp) {
    return { __firestore__: 'Timestamp', iso: v.toDate().toISOString(), seconds: v.seconds, nanoseconds: v.nanoseconds };
  }
  if (v instanceof admin.firestore.GeoPoint) {
    return { __firestore__: 'GeoPoint', latitude: v.latitude, longitude: v.longitude };
  }
  if (v instanceof admin.firestore.DocumentReference) {
    return { __firestore__: 'DocumentReference', path: v.path };
  }
  if (v instanceof Buffer) {
    return { __firestore__: 'Bytes', base64: v.toString('base64') };
  }
  if (Array.isArray(v)) return v.map(normalize);
  if (typeof v === 'object') {
    const out = {};
    for (const [k, val] of Object.entries(v)) out[k] = normalize(val);
    return out;
  }
  return v;
}

async function main() {
  const collections = await db.listCollections();
  console.log('Found ' + collections.length + ' top-level collections');

  const result = {
    backedUpAt: new Date().toISOString(),
    projectId: PROJECT_ID,
    collectionCount: collections.length,
    documentTotal: 0,
    collections: {}
  };

  for (const coll of collections) {
    const name = coll.id;
    const snap = await coll.get();
    const docs = [];
    snap.forEach(function(d) { docs.push(Object.assign({ id: d.id }, normalize(d.data()))); });
    result.collections[name] = docs;
    result.documentTotal += docs.length;
    console.log('  ' + name + ': ' + docs.length + ' docs');
  }

  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(now.getUTCDate()).padStart(2, '0');
  const fileName = 'backup-' + yyyy + '-' + mm + '-' + dd + '.json';
  const outPath = path.join(OUT_DIR, fileName);

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2));

  const stats = fs.statSync(outPath);
  console.log('\nWrote ' + outPath + ' (' + (stats.size / 1024).toFixed(1) + ' KB, ' + result.documentTotal + ' docs across ' + result.collectionCount + ' collections)');
}

main().catch(function(e) {
  console.error('Backup failed:', e);
  process.exit(1);
});
