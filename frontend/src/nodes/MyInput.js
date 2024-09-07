import React, { useState } from "react";
import { Position, useReactFlow } from "reactflow";
import MyTextInput from "../utils/MyTextInput";

import {
  Box,
  Typography,
  TextField,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
  TextareaAutosize,
  FormControl,
  Grid2,
  IconButton,
  Tooltip,
  InputLabel,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CustomHandle from "../utils/CustomHandle";

const MyInput = ({
  id,
  data: {
    inputType = "Text",
    inputNameProp = "Input_",
    inputInitValue = "",
    showInputCtrl,
    handleNameChangeProp,
    handleCtrlInputValChangeProp,
    ctrlInputProps,
    handleType,
    handlePosition,
  },
}) => {
  const [inputName, setInputName] = useState(inputNameProp);
  const [ctrlInputValue, setCtrlInputValue] = useState(
    inputInitValue
      ? inputInitValue
      : ctrlInputProps.controlerType === "checkbox"
      ? false
      : ""
  );

  console.log("909 ctrlInputValue", ctrlInputValue);

  const { setNodes } = useReactFlow();

  const handleCtrlInputValueChange = (event) => {
    let val;
    switch (event.target.type) {
      case "checkbox":
        val = event.target.checked;
        break;
      case "radio":
        val = event.target.value;
        break;
      default:
        val = event.target.value;
    }
    setCtrlInputValue(val);
    handleCtrlInputValChangeProp && handleCtrlInputValChangeProp(val);
  };

  const handleInputNameChange = (event) => {
    setInputName(event.target.value);
    handleNameChangeProp && handleNameChangeProp(event);
  };

  if (!ctrlInputProps) {
    throw new Error("Please provide control input props");
  }

  return (
    <Grid2
      sx={{
        width: "250px",
        minHeight: "100px",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: "10px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        border: "2px solid",
        borderColor: "primary.light",
      }}
      onClick={(event) => {
        console.log("909 clicked parent");
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{inputType}</Typography>
        <Tooltip title={"Remove Node"}>
          <IconButton
            onClick={() =>
              setNodes((prev) => prev.filter((el) => el.id !== id))
            }
          >
            <CancelIcon sx={{ color: "icon.error" }} />
          </IconButton>
        </Tooltip>
      </Box>
      {showInputCtrl && (
        <TextField
          label="Name"
          value={inputName}
          onChange={handleInputNameChange}
          size="small"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "primary.main",
              },
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
              },
            },
          }}
        />
      )}

      <div className="nopan nodrag">
        <MyCtrlInputs
          {...ctrlInputProps}
          ctrlInputValue={ctrlInputValue}
          setCtrlInputValue={setCtrlInputValue}
          handleCtrlInputValueChange={handleCtrlInputValueChange}
        />
      </div>

      {ctrlInputProps.controlerType === "slateText" &&
        ctrlInputValue
          ?.filter((elem) => elem.id)
          ?.map((el, index) => (
            <CustomHandle
              key={el.id}
              type="target"
              position={Position.Left}
              id={el.id}
              style={{ top: (index + 1) * 20 }}
            />
          ))}

      <CustomHandle
        type={handleType}
        position={
          handlePosition === "Right"
            ? Position.Right
            : handlePosition === "Left"
            ? Position.Left
            : handlePosition === "Top"
            ? Position.Top
            : Position.Bottom
        }
        id={`${id}-value`}
      />
    </Grid2>
  );
};

const MyCtrlInputs = ({
  label,
  controlerType,
  ctrlInputValue,
  handleCtrlInputValueChange,
  setCtrlInputValue,
  ...rest
}) => {
  switch (controlerType) {
    case "simpleText":
      return (
        <TextField
          label={label}
          value={ctrlInputValue}
          onChange={handleCtrlInputValueChange}
          fullWidth
          size="small"
        />
      );
    case "slateText":
      return (
        <Box>
          <Typography variant="body2">{label}</Typography>
          <MyTextInput value={ctrlInputValue} setValue={setCtrlInputValue} />
        </Box>
      );
    case "password":
      return (
        <TextField
          type="password"
          label={label}
          value={ctrlInputValue}
          onChange={handleCtrlInputValueChange}
          fullWidth
          size="small"
        />
      );
    case "number":
      return (
        <TextField
          type="number"
          label={label}
          value={ctrlInputValue}
          onChange={handleCtrlInputValueChange}
          inputProps={{ min: rest.min, max: rest.max, step: rest.step }}
          fullWidth
          size="small"
        />
      );
    case "date":
      return (
        <TextField
          type="date"
          label={label}
          value={ctrlInputValue}
          onChange={handleCtrlInputValueChange}
          fullWidth
          size="small"
          InputLabelProps={{ shrink: true }}
        />
      );
    case "checkbox":
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={ctrlInputValue}
              onChange={handleCtrlInputValueChange}
            />
          }
          label={label}
        />
      );
    case "radio":
      return (
        <FormControl component="fieldset">
          {label && <Typography variant="body2">{label}</Typography>}
          <RadioGroup
            value={ctrlInputValue}
            onChange={handleCtrlInputValueChange}
          >
            {rest.options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      );
    case "dropdown":
      return (
        <FormControl fullWidth size="small">
          <InputLabel>{label}</InputLabel>
          <Select
            size={"small"}
            value={ctrlInputValue}
            onChange={handleCtrlInputValueChange}
            label={label}
          >
            {rest.options.map((elem) => (
              <MenuItem value={elem.value} key={elem.value}>
                {elem.displayValue}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    case "textarea":
      return (
        <Box>
          <Typography variant="body2">{label}</Typography>
          <TextareaAutosize
            value={ctrlInputValue}
            onChange={handleCtrlInputValueChange}
            minRows={rest.rows || 3}
            style={{ width: "100%" }}
          />
        </Box>
      );
    default:
      return null;
  }
};

export default MyInput;
