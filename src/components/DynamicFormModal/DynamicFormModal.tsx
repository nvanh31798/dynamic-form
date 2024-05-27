import React from "react";
import { DynamicForm } from "../../features/DynamicForm/DynamicForm/DynamicForm";
import { Box, Button, Modal } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { openForm } from "../../redux/slice/dynamicForm/dynamicFormSlice";
import CloseIcon from "@mui/icons-material/Close";

export const DynamicFormModal = () => {
  const { isFormOpen, fetchStatus, dymaicForm } = useAppSelector(
    (state) => state.dynamicForm
  );
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(openForm(false));
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "600px",
    maxHeight: "90%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 5,
    pt: 8,
    overflowY: "scroll",
  };

  return (
    <Modal onClose={handleClose} open={isFormOpen}>
      <Box sx={style}>
        <Button
          sx={{ position: "absolute", top: 5, right: 3 }}
          onClick={handleClose}
        >
          <CloseIcon color="error"/>
        </Button>
        <DynamicForm dynamicForm={dymaicForm} fetchStatus={fetchStatus} />
      </Box>
    </Modal>
  );
};
