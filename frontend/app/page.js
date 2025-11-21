"use client";
import { useMedusa } from "@medusajs/medusa-react";
import { OurFileRouter } from "@/app/api/uploadthing/core"; // See below for UploadThing setup
import { UploadDropzone } from "@uploadthing/react";

export default function Home() {
  const { client } = useMedusa(process.env.MEDUSA_BACKEND_URL);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">ShipFastCards</h1>
        <p className="text-xl text-center mb-12">Upload list + design → We print & mail in 7 days!</p>
        
        {/* Product Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Fetch & render products via Medusa */}
          <div className="bg-white p-6 rounded-lg shadow"> {/* Example card */}
            <h2>100 Cards - $1.50/ea</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Select</button>
          </div>
          {/* Repeat for other tiers */}
        </div>

        {/* Upload Sections */}
        <div className="space-y-8">
          <div>
            <h3>Pick or Upload Design</h3>
            <UploadDropzone endpoint="imageUploader" onClientUploadComplete={() => alert("Design uploaded!")} />
          </div>
          <div>
            <h3>Upload Mailing List (CSV/Excel)</h3>
            <UploadDropzone 
              endpoint="csvUploader" 
              onClientUploadComplete={(res) => {
                // Validate with PapaParse
                Papa.parse(res[0].fileUrl, { header: true, complete: (results) => {
                  alert(`${results.data.length} rows validated!`);
                }});
              }} 
            />
          </div>
        </div>

        {/* Checkout Button – Integrates Medusa Cart */}
        <button className="w-full bg-green-500 text-white py-4 mt-8 rounded">Proceed to Checkout →</button>
      </div>
    </main>
  );
}
