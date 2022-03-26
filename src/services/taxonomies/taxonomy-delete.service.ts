import { NotFoundError } from "infrastructure/errors/not-found-error";
import { Taxonomy } from "models/taxonomies/taxonomy.model";
import mongoose from "mongoose";
import { post } from "request";

export async function taxonomyDeleteService(slug: string) {
  const taxonomy = await Taxonomy.findOne({ slug });
  if (!taxonomy) {
    throw new NotFoundError();
  }

  const session = await mongoose.startSession(); //Transaction session started
  session.startTransaction();
}
