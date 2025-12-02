import {profileService} from "../../features/profile/profileService";

export const UpdateMyProfile = async (data) => {
  return await profileService.updateMyProfile(data);
};