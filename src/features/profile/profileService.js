import {api} from "../../app/api";
import {ProfileEntity} from "../../entities/profile/profileEntity";

class ProfileService {
  async getProfile() {
    const res = await api.get("/profile");
    return ProfileEntity(res.data);
  }

  async updateMyProfile(dto) {
    const res = await api.put("/profile", dto);
    return ProfileEntity(res.data);
  }
}

export const profileService = new ProfileService();