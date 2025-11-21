import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await currentUser(); // Or your auth
      if (!user) throw new Error("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      // Save to Medusa product variant
    }),
  csvUploader: f({ csv: { maxFileSize: "1MB" } })
    .middleware(async () => ({ userId: "anon" }))
    .onUploadComplete(async ({ file }) => {
      // Trigger validation API
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
