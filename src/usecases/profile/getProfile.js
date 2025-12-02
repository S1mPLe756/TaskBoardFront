import {profileService} from "../../features/profile/profileService";

export const GetProfile = async () => {
  return await profileService.getProfile();
};
