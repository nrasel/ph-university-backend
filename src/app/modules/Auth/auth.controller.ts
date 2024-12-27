import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import catchAsync from '../../utility/catchAsync';
import sendResponse from '../../utility/sendResponse';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  const { refreshToken, accessToken, needsPasswordChange } = result;
  console.log(refreshToken);

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in succesfully!',
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const result = await AuthService.changedPassword(req.user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed succesfully!',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is reterived succesfully!',
    data: result,
  });
});
const forgetPassword = catchAsync(async (req, res) => {
  const { id } = req.body;

  const result = await AuthService.forgetPassword(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset link generated succesfully!',
    data: result,
  });
});
const resetPassword = catchAsync(async (req, res) => {
  const token = req?.headers?.authorization;
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorised');
  }
  const result = await AuthService.resetPassword(req.body, token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset succesfully!',
    data: result,
  });
});

export const authController = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
