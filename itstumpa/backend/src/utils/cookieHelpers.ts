// import { Response } from 'express';

// const cookieOptions = {
//   httpOnly: true,
//   secure: true,
//   sameSite: 'none' as const,
//   path: '/',
// };

// export function setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
//   res.cookie('accessToken', accessToken, {
//     ...cookieOptions,
//     maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
//   });
//   res.cookie('refreshToken', refreshToken, {
//     ...cookieOptions,
//     maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//   });
// }

// export function clearAuthCookies(res: Response) {
//   res.clearCookie('accessToken', { path: '/' });
//   res.clearCookie('refreshToken', { path: '/' });
// }


import { Response, CookieOptions } from "express";

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  path: "/",
};

export function setAuthCookies(
  res: Response,
  accessToken: string,
  refreshToken: string
): void {
  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
}

export function clearAuthCookies(res: Response): void {
  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);
}