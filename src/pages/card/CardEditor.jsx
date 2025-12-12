// CardEditor.jsx
import React, { useState } from "react";
import {
  TextField, Typography, Box, AvatarGroup, Avatar, Tooltip,
  Stack, Checkbox, IconButton, Button, Chip
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SubjectIcon from '@mui/icons-material/Subject';
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { colorsPriority, getTextColor } from "../../utils/colorUtils";
import { MenuItem, Select } from "@mui/material";

const labelColors = ["#1976d2", "#388e3c", "#f57c00", "#d32f2f", "#7b1fa2"];

const CardEditor = ({ editableCard, setEditableCard }) => {
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [newLabelName, setNewLabelName] = useState("");
  const [newLabelColor, setNewLabelColor] = useState(labelColors[0]);

  const handleChangeField = (field, value) => setEditableCard(prev => ({ ...prev, [field]: value }));

  const handleAddChecklistItem = () => {
    if (!newChecklistItem.trim()) return;
    const tempId = `temp-${Date.now()}`;
    const newItems = editableCard.checklist?.items
        ? [...editableCard.checklist.items, { tempId, text: newChecklistItem, isCompleted: false, position: editableCard.checklist.items.length }]
        : [{ tempId, text: newChecklistItem, isCompleted: false, position: 0 }];
    setEditableCard(prev => ({ ...prev, checklist: { ...prev.checklist, items: newItems } }));
    setNewChecklistItem("");
  };

  const getDraggableId = (item) => item.id ?? item.tempId;

  const handleDragEnd = (result) => {
    if (!result.destination || !editableCard.checklist?.items) return;
    const items = Array.from(editableCard.checklist.items);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    items.forEach((it, idx) => it.position = idx);
    setEditableCard(prev => ({ ...prev, checklist: { ...prev.checklist, items } }));
  };

  const handleAddLabel = () => {
    if (!newLabelName.trim()) return;
    if ((editableCard.labels || []).some(l => l.name === newLabelName.trim())) return;
    const newLabel = { name: newLabelName.trim(), color: newLabelColor };
    setEditableCard(prev => ({ ...prev, labels: prev.labels ? [...prev.labels, newLabel] : [newLabel] }));
    setNewLabelName("");
  };

  const removeLabel = (idx) => setEditableCard(prev => ({ ...prev, labels: prev.labels.filter((_, i) => i !== idx) }));

  return (
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <TextField
              fullWidth
              variant="standard"
              value={editableCard.title}
              onChange={e => handleChangeField("title", e.target.value)}
          />
        </Box>

        {/* Assignees */}
        <Box display="flex" alignItems="center" mb={2}>
          <Typography sx={{ mr: 1 }}>Участники:</Typography>
          <AvatarGroup max={4}>
            {editableCard.assignees?.map(user => (
                <Tooltip key={user.id} title={user.username}>
                  <Box position="relative">
                    <Avatar sx={{ width: 30, height: 30 }}>{user.username[0]}</Avatar>
                    <IconButton
                        size="small"
                        sx={{ position: "absolute", top: -5, right: -5, bgcolor: "error.main", color: "#fff" }}
                        onClick={() => handleChangeField("assignees", editableCard.assignees.filter(u => u.id !== user.id))}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Tooltip>
            ))}
            <Tooltip title="Добавить участника">
              <Avatar sx={{ width: 30, height: 30, bgcolor: "grey.300", cursor: "pointer" }}>
                <AddIcon fontSize="small" />
              </Avatar>
            </Tooltip>
          </AvatarGroup>
        </Box>

        {/* Description */}
        <Box display="flex" alignItems="center" mb={1}>
          <SubjectIcon sx={{ mr: 1 }} />
          <Typography variant="subtitle2">Описание:</Typography>
        </Box>
        <TextField
            fullWidth
            multiline
            minRows={3}
            variant="outlined"
            value={editableCard.description || ""}
            onChange={e => handleChangeField("description", e.target.value)}
            sx={{ mb: 2 }}
        />

        {/* Priority & Due date */}
        {/* Priority & Due Date (editable) */}
        <Stack direction="row" spacing={3} mb={2}>

          {/* Priority */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Приоритет:</Typography>
            <Select
                size="small"
                value={editableCard.priority || ""}
                onChange={(e) => handleChangeField("priority", e.target.value)}
                sx={{ minWidth: 140 }}
            >
              <MenuItem value="Low">Низкий</MenuItem>
              <MenuItem value="Normal">Средний</MenuItem>
              <MenuItem value="High">Высокий</MenuItem>
            </Select>
          </Box>

          {/* Due date */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Срок выполнения:</Typography>
            <TextField
                size="small"
                type="datetime-local"
                value={editableCard.dueDate ? editableCard.dueDate.split("T")[0] : ""}
                onChange={(e) => handleChangeField("dueDate", e.target.value)}
            />
          </Box>

        </Stack>


        {/* Checklist (editable) */}
        <Typography variant="subtitle2" gutterBottom><CheckBoxOutlinedIcon /> Чеклист:</Typography>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="checklist">
            {(provided) => (
                <Stack spacing={1} ref={provided.innerRef} {...provided.droppableProps}>
                  {(editableCard.checklist?.items || []).map((item, idx) => (
                      <Draggable key={getDraggableId(item)} draggableId={getDraggableId(item).toString()} index={idx}>
                        {(prov) => (
                            <Box ref={prov.innerRef} {...prov.draggableProps} sx={{ display: "flex", alignItems: "center", bgcolor: "grey.100", p: 1, borderRadius: 1 }}>
                              <Box {...prov.dragHandleProps} sx={{ mr: 1, cursor: "grab" }}>
                                <DragIndicatorIcon fontSize="small" />
                              </Box>
                              <Checkbox checked={item.isCompleted}
                                        onChange={() => {
                                          const newItems = [...editableCard.checklist.items];
                                          newItems[idx].isCompleted = !newItems[idx].isCompleted;
                                          setEditableCard(prev => ({ ...prev, checklist: { ...prev.checklist, items: newItems } }));
                                        }}
                              />
                              <TextField variant="standard" fullWidth value={item.text}
                                         onChange={e => {
                                           const newItems = [...editableCard.checklist.items];
                                           newItems[idx].text = e.target.value;
                                           setEditableCard(prev => ({ ...prev, checklist: { ...prev.checklist, items: newItems } }));
                                         }}
                                         sx={{ textDecoration: item.isCompleted ? "line-through" : "none" }}
                              />
                              <IconButton onClick={() => {
                                const newItems = editableCard.checklist.items.filter((_, i) => i !== idx);
                                setEditableCard(prev => ({ ...prev, checklist: { ...prev.checklist, items: newItems } }));
                              }}>
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            </Box>
                        )}
                      </Draggable>
                  ))}
                  {provided.placeholder}
                </Stack>
            )}
          </Droppable>
        </DragDropContext>

        <Stack direction="row" spacing={1} mt={1}>
          <TextField size="small" variant="outlined" placeholder="Добавить задачу" value={newChecklistItem} onChange={e => setNewChecklistItem(e.target.value)} fullWidth />
          <Button variant="contained" onClick={handleAddChecklistItem}>+</Button>
        </Stack>

        {/* Labels (editable) */}
        <Box mt={2} display="flex" gap={0.5} flexWrap="wrap">
          {(editableCard.labels || []).map((label, idx) => (
              <Box key={label.id ?? idx} sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
                <Chip label={label.name} sx={{ backgroundColor: label.color, color: getTextColor(label.color) }} size="small" />
                <IconButton size="small" sx={{ p: 0.5 }} onClick={() => removeLabel(idx)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
          ))}
        </Box>

        <Stack direction="row" spacing={1} mt={2} alignItems="center">
          <TextField size="small" variant="outlined" placeholder="Новая метка" value={newLabelName} onChange={e => setNewLabelName(e.target.value)} />
          <Stack direction="row" spacing={0.5}>
            {labelColors.map(color => (
                <Box key={color} sx={{ width: 24, height: 24, bgcolor: color, borderRadius: "50%", border: newLabelColor === color ? "2px solid black" : "1px solid grey", cursor: "pointer" }} onClick={() => setNewLabelColor(color)} />
            ))}
          </Stack>
          <Button variant="contained" onClick={handleAddLabel}>+</Button>
        </Stack>
      </Box>
  );
};

export default CardEditor;
