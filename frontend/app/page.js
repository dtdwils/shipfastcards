"use client";
import { useMedusa } from "medusa-react";  // Fixed: Unscoped package
import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "../api/uploadthing/core";  // UploadThing config
import Papa from "papaparse";
import { Button } from "@medusajs/ui";  // UI component example

export default function Home() {
  const { client } = useMedusa();  // Now works with correct package

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">ShipFastCards</h1>
        <p className="text-xl text-center mb-12">Upload list + design → We print & mail in 7 days!</p>
        
        {/* Product Grid - Fetches from Medusa */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">100 Cards - $1.50/ea</h2>
            <p className="text-gray-600 mb-4">Festive Christmas design.</p>
            <Button variant="primary" className="w-full">Select Tier</Button>
          </div>
          {/* Add more tiers similarly */}
        </div>

        {/* Upload Sections */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Pick or Upload Design</h3>
            <UploadDropzone 
              endpoint="imageUploader" 
              onClientUploadComplete={(res) => alert("Design uploaded! File: " + res[0].fileUrl)} 
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Upload Mailing List (CSV/Excel)</h3>
            <UploadDropzone 
              endpoint="csvUploader" 
              onClientUploadComplete={(res) => {
                // Parse & validate with PapaParse
                fetch(res[0].fileUrl)
                  .then(r => r.text())
                  .then(csvText => {
                    Papa.parse(csvText, { 
                      header: true, 
                      complete: (results) => {
                        const validRows = results.data.filter(row => row.name && row.address && row.city && row.state && row.zip);
                        alert(`Total: ${results.data.length} rows | Valid: ${validRows.length}`);
                      }
                    });
                  });
              }} 
            />
          </div>
        </div>

        {/* Checkout Button */}
        <Button variant="secondary" className="w-full bg-green-500 text-white py-4 mt-8 rounded">Proceed to Checkout →</Button>
      </div>
    </main>
  );
}
