import csv from 'csv-parser';
import fs from 'fs';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { fileUrl } = req.body; // From UploadThing
    // Download & parse CSV (pseudo – use medusa file service in prod)
    const results = [];
    fs.createReadStream(fileUrl).pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        const valid = results.filter(row => row.name && row.address && row.city && row.state && row.zip);
        res.json({ total: results.length, valid: valid.length, errors: results.length - valid.length });
      });
  }
};
