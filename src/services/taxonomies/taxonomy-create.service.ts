import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { clearCache } from "infrastructure/cache/clear-cache";
import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { LangEnum } from "infrastructure/locales/i18next-config";
import { CoreLocaleEnum } from "infrastructure/locales/service-locale-keys/core.locale";
import { TaxonomyLocaleEnum } from "infrastructure/locales/service-locale-keys/taxonomies.locale";
import { Taxonomy, TaxonomyTypeEnum } from "models/taxonomies/taxonomy.model";
import mongoose from "mongoose";
import slugify from "slugify";

export interface ITaxonomyCreateService {
  lang: LangEnum;
  type: TaxonomyTypeEnum;
  description: string;
  term: string;
  parent?: string;
  createdBy: string;
  createdByIp: string;
  userAgent: string;
}

export async function taxonomyCreateService(data: ITaxonomyCreateService) {
  const {
    lang,
    type,
    description,
    term,
    parent,
    createdBy,
    createdByIp,
    userAgent,
  } = data;

  const slug = slugify(term);
  const taxonomy = Taxonomy.build({
    lang,
    type,
    description,
    term,
    slug,
    parent,
    createdBy,
    createdByIp,
    userAgent,
  });
  if (parent && !mongoose.isValidObjectId(parent)) {
    throw new BadRequestError(
      "Something went wrong with parent taxonomy",
      CoreLocaleEnum.ERROR_400_MSG
    );
  }

  const parentTaxonomy = parent ? await Taxonomy.findById(parent) : null;
  if (parent && !parentTaxonomy) {
    throw new BadRequestError(
      "Something went wrong getting parent taxonomy",
      CoreLocaleEnum.ERROR_400_MSG
    );
  }

  const duplicateTaxonomy = await Taxonomy.findOne({ type, term });
  if (duplicateTaxonomy) {
    throw new BadRequestError(
      "Duplicate taxonomy is not allowed",
      TaxonomyLocaleEnum.ERROR_DUPLICATE_TAXONOMY
    );
  }

  const session = await mongoose.startSession(); //transaction session started
  session.startTransaction();
  await taxonomy.save({ session });

  if (parentTaxonomy) {
    parentTaxonomy.set({
      children: parentTaxonomy.children
        ? [...parentTaxonomy.children, taxonomy.id]
        : [taxonomy.id],
    });
    await parentTaxonomy.save({ session });
  }
  clearCache(CacheOptionServiceEnum.TAXONOMY);
  await session.commitTransaction();
  session.endSession(); //Transaction session ended

  return taxonomy;
}
