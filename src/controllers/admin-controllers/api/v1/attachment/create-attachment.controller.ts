import { Request, Response } from "express";
import { AttachmentLocaleEnum } from "infrastructure/locales/service-locale-keys/attachment.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { attachmentCreateService } from "services/attachments/attachment-create.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminAttachmentCreateController(
  req: Request,
  res: Response
) {
  const attachment = await attachmentCreateService({
    ...req.body,
    createdBy: req.currentUser!.id,
    createdByIp: req.ip,
    userAgent: req.get("User-Agent") || "unknown_agent",
  });

  res.send(attachment);
  logger.info(
    `Admin <${req.currentUser!.id}> created ${
      req.body.fileName
    } attachment successfully`,
    logSerializer(req, res, AttachmentLocaleEnum.INFO_CREATE, {
      attachment: { id: attachment.id },
    })
  );
}
