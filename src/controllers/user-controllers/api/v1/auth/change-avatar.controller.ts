import { Request, Response } from "express";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { dtoMapper } from "infrastructure/service-utils/dto-mapper";
import { AuthViewProfileDto } from "services/auth/DTOs/view-profile.dto";
import { authChangeAvatarService } from "services/auth/users/change-avatar.service";
import { logger } from "services/winston-logger/logger.service";

export async function authChangeAvatarController(req: Request, res: Response) {
  const user = await authChangeAvatarService({
    userId: req.currentUser!.id,
    updatedBy: req.currentUser!.id,
    updatedByIp: req.ip,
    userAgent: req.get("User-Agent") ?? "unknown_agent",
  });
  const profileDto = dtoMapper(user, AuthViewProfileDto);
  res.send(profileDto);
  logger.info(
    `${user.email} avatar changed successfully`,
    logSerializer(req, res, AuthLocaleEnum.INFO_AVATAR_CHANGED, {
      user: { id: user.id },
    })
  );
}
