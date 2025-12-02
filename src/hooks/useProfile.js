import {useEffect, useState} from "react";
import {GetProfile} from "../usecases/profile/getProfile";
import {UpdateMyProfile} from "../usecases/profile/updateProfile";

export function useProfile() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const data = await GetProfile();
      setProfile(data);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };


  const updateProfile = async (dto) => {
    setLoading(true);
    try {
      const updated = await UpdateMyProfile(dto);
      setProfile(updated);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    loadProfile();
  }, []);

  return {
    profile,
    loading,
    updateProfile
  };
}
