import React from "react";
import { useProfile } from "../../hooks/useProfile";
import ProfileForm from "./ProfileForm";
import {Box, Typography} from "@mui/material";

export const ProfilePage = () => {
  const { profile, loading, updateProfile } = useProfile();

  if (loading) return <div>Загрузка...</div>;
  if (!profile) return <div>Профиль не найден</div>;

  return (
      <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
      >
        <Typography variant="h5" mb={3}>Мой профиль</Typography>

        {/*<img*/}
        {/*    src={profile.avatarUrl || "https://via.placeholder.com/150"}*/}
        {/*    alt="avatar"*/}
        {/*    style={{ width: 120, height: 120, borderRadius: "50%" }}*/}
        {/*/>*/}

        <ProfileForm profile={profile} onSave={updateProfile} />
      </Box>
  );
}
