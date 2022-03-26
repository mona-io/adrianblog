import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { User } from "models/auth/auth-user.model";

export async function authUserDetailsService(userId: string) {
  const user = await User.findById(userId).cache(CacheOptionServiceEnum.USER);
  if (!user) throw new NotFoundError();
  return user;
}
