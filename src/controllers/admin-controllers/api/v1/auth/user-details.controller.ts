import { Request, Response } from "express";
import { authUserDetailsService } from "services/auth/users/details.service";

export async function adminAuthUserDetailsController (req:Request, res:Response) {
const userDetails = await authUserDetailsService(req.params.id);
res.send(userDetails);
}