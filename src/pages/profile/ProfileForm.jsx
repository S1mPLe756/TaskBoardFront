import {useState} from "react";
import {Box, Paper, TextField} from "@mui/material";
import {MuiTelInput} from "mui-tel-input";

export default function ProfileForm({profile, onSave}) {
  const [fullName, setFullName] = useState(profile.fullName);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [phone, setPhone] = useState(profile.phone);
  const [bio, setBio] = useState(profile.bio);

  const submit = (e) => {
    e.preventDefault();
    onSave({fullName, phone, bio, avatarUrl});
  };

  return (<Paper
      elevation={10}
      sx={{
        p: 4, width: 360, borderRadius: 3, textAlign: "center",
      }}
  >
    <form onSubmit={submit} style={{marginTop: 20}}>
      <div>
        <TextField
            type="text"
            value={fullName}
            label="Имя"
            onChange={(e) => setFullName(e.target.value)}
            style={{width: "100%"}}
        />
      </div>

      <div>
        <label>Телефон:</label>
        <MuiTelInput
            type="phone"
            value={phone}
            onChange={setPhone}
            style={{width: "100%"}}
        />
      </div>

      <div>
        <label>Био:</label>
        <input
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            style={{width: "100%"}}
        />
      </div>

      <div style={{marginTop: 10}}>
        <label>Аватар URL:</label>
        <input
            type="text"
            value={avatarUrl ?? ""}
            onChange={(e) => setAvatarUrl(e.target.value)}
            style={{width: "100%"}}
        />
      </div>


      <button type="submit" style={{marginTop: 20}}>
        Сохранить
      </button>
    </form>
  </Paper>);
}
