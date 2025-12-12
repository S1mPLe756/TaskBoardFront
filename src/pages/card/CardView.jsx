// CardView.jsx
import React from "react";
import { Typography, Box, AvatarGroup, Avatar, Tooltip, Stack, Checkbox, Chip } from "@mui/material";
import SubjectIcon from '@mui/icons-material/Subject';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { getTextColor } from "../../utils/colorUtils";

const CardView = ({ editableCard }) => {
  return (
      <Box>
        <Typography variant="h6" mb={2}>{editableCard.title}</Typography>

        <Box display="flex" alignItems="center" mb={2}>
          <Typography sx={{ mr: 1 }}>Участники:</Typography>
          <AvatarGroup max={4}>
            {editableCard.assignees?.map(u => (
                <Tooltip key={u.id} title={u.username}>
                  <Avatar sx={{ width: 30, height: 30 }}>{u.username[0]}</Avatar>
                </Tooltip>
            ))}
          </AvatarGroup>
        </Box>

        <Box display="flex" alignItems="center" mb={1}>
          <SubjectIcon sx={{ mr: 1 }} />
          <Typography variant="subtitle2">Описание:</Typography>
        </Box>
        <Typography sx={{ mb: 2, whiteSpace: "pre-wrap" }}>{editableCard.description || "—"}</Typography>

        <Stack direction="row" spacing={2} mb={2}>
          {editableCard.priority && <Box sx={{ px: 1, py: 0.5, borderRadius: 1, bgcolor: editableCard.priority ? "grey.300" : "transparent" }}>
            <Typography variant="body2">Priority: {editableCard.priority}</Typography>
          </Box>}
          {editableCard.dueDate && <Box><Typography variant="body2">Срок: {new Date(editableCard.dueDate).toLocaleString()}</Typography></Box>}
        </Stack>

        <Box mb={2}>
          <Typography variant="subtitle2" gutterBottom><CheckBoxOutlinedIcon /> Чеклист:</Typography>
          <Stack spacing={1}>
            {(editableCard.checklist?.items || []).map((item, idx) => (
                <Box key={idx} sx={{ display: "flex", alignItems: "center", bgcolor: "grey.100", p: 1, borderRadius: 1 }}>
                  <Checkbox checked={item.isCompleted} disabled />
                  <Typography sx={{ textDecoration: item.isCompleted ? "line-through" : "none" }}>{item.text}</Typography>
                </Box>
            ))}
          </Stack>
        </Box>

        <Box mt={2} display="flex" gap={0.5} flexWrap="wrap">
          {(editableCard.labels || []).map((label, idx) => (
              <Chip key={label.id ?? idx} label={label.name} sx={{ backgroundColor: label.color, color: getTextColor(label.color) }} size="small" />
          ))}
        </Box>
      </Box>
  );
};

export default CardView;
