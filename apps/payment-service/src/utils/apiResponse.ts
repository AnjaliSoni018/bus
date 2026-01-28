export const apiResponse = {
  success: (res: any, data: any, message = 'Success', status = 200) =>
    res.status(status).json({ success: true, message, data }),

  error: (res: any, message = 'Something went wrong', status = 500) =>
    res.status(status).json({ success: false, message }),

  unauthorized: (res: any, message = 'Unauthorized') =>
    res.status(401).json({ success: false, message }),
};
