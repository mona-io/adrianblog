import { authRefreshTokenDetailsService } from "./details.service";

export interface IRevokeTokenService {
  token: string;
  ipAddress: string;
}

export async function revokeTokenService({
  token,
  ipAddress,
}: IRevokeTokenService) {
  const refreshToken = await authRefreshTokenDetailsService(token);

  // revoke token and save
  refreshToken.revoked = new Date();
  refreshToken.revokedByIp = ipAddress;
  await refreshToken.save();
}
