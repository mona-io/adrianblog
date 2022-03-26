import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { clearCache } from "infrastructure/cache/clear-cache";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { GenderEnum, User } from "models/auth/auth-user.model";

export interface IAuthEditUserParams {
  userId: string;
  firstName: string;
  lastName: string;
  bio?: string;
  address?: string;
  country?: string;
  postalCode?: number;
  city?: string;
  mobilePhone?: number;
  phone?: number;
  gender?: GenderEnum;
  birthDate?: Date;
  displayName?: string;
  job?: string;
  lastIp: string;
  updatedBy: string;
  updatedByIp: string;
  userAgent: string;
}

export async function authEditUserService(params: IAuthEditUserParams) {
  const user = await User.findById(params.userId);
  if (!user) throw new NotFoundError();
  user.set({
    firstName: params.firstName || user.firstName,
    lastName: params.lastName || user.lastName,
    bio: params.bio,
    address: params.address,
    country: params.country,
    postalCode: params.postalCode,
    city: params.city,
    mobilePhone: params.mobilePhone,
    phone: params.phone,
    gender: params.gender,
    birthDate: params.birthDate,
    displayName: params.displayName,
    job: params.job,
    lastIp: params.lastIp,
    updatedBy: params.updatedBy,
    updatedByIp: params.updatedByIp,
    userAgent: params.userAgent,
  });

  await user.save();
  clearCache(CacheOptionServiceEnum.USER);
  return user;
}
