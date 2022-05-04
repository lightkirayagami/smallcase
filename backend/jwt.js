import jwt from "jsonwebtoken";
export const createAuthToken = (authId) => {
  const secret = "goalfi_effae5f46d734f7583ba17463e3fe8a7";
  const expiresIn = "1d";
  if (authId) {
    return jwt.sign(
      {
        smallcaseAuthId: authId,
      },
      secret,
      {expiresIn}
    );
  }
  return jwt.sign(
    {
      guest: true,
    },
    secret,
    {expiresIn}
  );
};
