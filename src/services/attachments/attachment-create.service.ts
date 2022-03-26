import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { clearCache } from "infrastructure/cache/clear-cache";
import {
  Attachment,
  AttachmentPolicyEnum,
} from "models/attachments/attachment.model";

export interface IAttachmentCreateServvice {
  url: string;
  policy: AttachmentPolicyEnum;
  fileName: string;
  size: number;
  caption: string;
  createdBy: string;
  createdByIp: string;
  userAgent: string;
}

export async function attachmentCreateService(
  params: IAttachmentCreateServvice
) {
  const {
    url,
    policy,
    fileName,
    size,
    caption,
    createdBy,
    createdByIp,
    userAgent,
  } = params;
  const attachment = Attachment.build({
    url,
    policy,
    fileName,
    size,
    caption,
    createdBy,
    createdByIp,
    userAgent,
  });

  await attachment.save();
  clearCache(CacheOptionServiceEnum.ATTACHMENT);

  return attachment;
}
