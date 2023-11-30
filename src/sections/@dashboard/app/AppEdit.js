import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm, Controller, get } from "react-hook-form";
import {
  Card,
  Stack,
  Divider,
  CardHeader,
  Box,
  Button,
  Grid,
  styled,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
  MenuItem,
  Typography,
  Autocomplete,
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import { CardLaunch, MoveToTopDelayed, Opacity } from "src/animated";
import getCodeTableByName from "src/api/getCodeTableByName";
import useResponsive from "src/hooks/useResponsive";

AppEdit.propTypes = {
  title: PropTypes.string,
  disableAction: PropTypes.bool,
  layout: PropTypes.number,
  subheader: PropTypes.string,
  list: PropTypes.array,
  newFlag: PropTypes.bool,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  onAdd: PropTypes.func,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),

  color: theme.palette.text.secondary,
}));

export default function AppEdit({
  title,
  onUpdate,
  onDelete,
  onAdd,
  newFlag = false,
  disableAction = false,
  layout = 6,
  subheader,
  items,
  itemID,
  disableButtons = false,
  ...other
}) {
  const [itemsLocal, setItemsLocal] = useState(items);
  const [personName] = useState([]);
  const [confOpen, setConfOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useResponsive("up", "lg");
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    if (newFlag) onAdd(data);
    else onUpdate(data);
  };

  useEffect(() => {
    setItemsLocal(items);
  }, [items]);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 224,
        width: 250,
      },
    },
  };

  const getStyles = (name, personName, theme) => ({
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  });

  const filterOptions = (options, { inputValue }) => {
    if (options) {
      return options?.filter((option) =>
        option.name.toLowerCase().includes(inputValue.toLowerCase())
      );
    }
    return options;
  };

  const getCodeTable = async (codeTableName) => {
    const codeTable = await getCodeTableByName(codeTableName);
    return codeTable;
  };

  return (
    <CardLaunch>
      <Box boxShadow={" 0px 0px 0px 0px #00000052"} borderRadius={"15px"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card {...other}>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              marginBottom={"1rem"}
            >
              <MoveToTopDelayed>
                <CardHeader
                  sx={{ color: theme.palette.primary.main }}
                  title={title}
                  subheader={``}
                />
              </MoveToTopDelayed>
              {!disableAction && (
                <Box>
                  {!newFlag && (
                    <Box
                      component={Button}
                      color={theme.palette.error.light}
                      onClick={() => {
                        setConfOpen(true);
                      }}
                    >
                      <DeleteIcon />
                    </Box>
                  )}
                </Box>
              )}
            </Box>
            <Box>
              <Grid container spacing={1}>
                {itemsLocal?.map((item, index) => (
                  <Grid key={index} item xs={12} md={layout}>
                    <Item sx={{ background: "transparent !important" }}>
                      <Stack
                        direction="row"
                        sx={{
                          px: 2,
                          py: 0.75,
                        }}
                      >
                        <Box sx={{ flexGrow: 1 }}>
                          <MoveToTopDelayed>
                            <Controller
                              name={item.label}
                              control={control}
                              rules={
                                item.required
                                  ? {
                                      required: "This field is required",
                                    }
                                  : {}
                              }
                              defaultValue={item.value}
                              render={({ field }) => (
                                <div>
                                  {(item.type === "string" ||
                                    item.type === "number") && (
                                    <TextField
                                      inputProps={
                                        item.type === "number"
                                          ? {
                                              inputMode: "numeric",
                                              pattern: "[0-9]*",
                                            }
                                          : {}
                                      }
                                      {...field}
                                      sx={{
                                        width: `${isDesktop ? "80%" : "100%"}`,
                                      }}
                                      label={item.label}
                                      variant="outlined"
                                      value={item.value}
                                      onChange={(e) => {
                                        setValue(
                                          e.target.name,
                                          e.target.value,
                                          true
                                        );
                                        const itemsTemp = [...itemsLocal];
                                        itemsTemp[index].value = e.target.value;
                                        setItemsLocal(itemsTemp);
                                      }}
                                      error={Boolean(get(errors, item.label))}
                                      helperText={
                                        get(errors, item.label)?.message
                                      }
                                    />
                                  )}
                                  {item.type === "boolean" && (
                                    <>
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            label={item.label}
                                            {...field}
                                            checked={item.value}
                                            onChange={(event) => {
                                              const itemsTemp = [...itemsLocal];
                                              itemsTemp[index].value =
                                                event.target.checked;
                                              setValue(
                                                event.target.name,
                                                event.target.checked,
                                                true
                                              );
                                              setItemsLocal(itemsTemp);
                                            }}
                                            error={Boolean(
                                              get(errors, item.id)
                                            )}
                                          />
                                        }
                                        label={item.label}
                                      />
                                    </>
                                  )}
                                  {item.type === "m_select" && (
                                    <FormControl
                                      sx={{
                                        width: `${isDesktop ? "80%" : "100%"}`,
                                      }}
                                    >
                                      <InputLabel id="demo-multiple-chip-label">
                                        {item.label}
                                      </InputLabel>
                                      <Select
                                        {...field}
                                        labelId="demo-multiple-chip-label"
                                        id="demo-multiple-chip"
                                        multiple
                                        value={item.value}
                                        onChange={(event) => {
                                          const selectedList =
                                            typeof event.target.value ===
                                            "string"
                                              ? event.target.value.split(",")
                                              : event.target.value;
                                          const itemsTemp = [...itemsLocal];
                                          itemsTemp[index].value = selectedList;
                                          setValue(
                                            event.target.name,
                                            selectedList,
                                            true
                                          );
                                          setItemsLocal(itemsTemp);
                                        }}
                                        input={
                                          <OutlinedInput
                                            id="select-multiple-chip"
                                            label={item.label}
                                          />
                                        }
                                        renderValue={(selected) => (
                                          <Box
                                            sx={{
                                              display: "flex",
                                              flexWrap: "wrap",
                                              gap: 0.5,
                                            }}
                                          >
                                            {selected.map((value) => (
                                              <Chip key={value} label={value} />
                                            ))}
                                          </Box>
                                        )}
                                        MenuProps={MenuProps}
                                      >
                                        {item.codeTable.map((name) => (
                                          <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(
                                              name,
                                              personName,
                                              theme
                                            )}
                                          >
                                            {name}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  )}
                                  {item.type === "select" && (
                                    <FormControl
                                      sx={{
                                        width: `${isDesktop ? "80%" : "100%"}`,
                                      }}
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                        {item.label}
                                      </InputLabel>
                                      <Select
                                        variant="outlined"
                                        {...field}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={item.value}
                                        label={item.label}
                                        onChange={(event) => {
                                          const itemsTemp = [...itemsLocal];
                                          itemsTemp[index].value =
                                            event.target.value;
                                          setValue(
                                            event.target.name,
                                            event.target.value,
                                            true
                                          );
                                          setItemsLocal(itemsTemp);
                                        }}
                                      >
                                        {item.codeTable?.map((name) => (
                                          <MenuItem key={name} value={name}>
                                            {name}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                      <Typography
                                        color={"#FF4842"}
                                        paddingLeft={"1rem"}
                                        fontSize={"0.75rem"}
                                      >
                                        {get(errors, item.label)?.message}
                                      </Typography>
                                    </FormControl>
                                  )}
                                  {item.type === "auto_select" && (
                                    <>
                                      <Autocomplete
                                        {...field}
                                        disabled={item.disabled}
                                        disablePortal={false}
                                        id="combo-box-demo"
                                        options={item.codeTable}
                                        getOptionLabel={(option) =>
                                          String(option.name)
                                        }
                                        sx={{
                                          width: `${
                                            isDesktop ? "80%" : "100%"
                                          }`,
                                        }}
                                        value={item.value}
                                        label={item.label}
                                        onOpen={async () => {
                                          const itemsTemp = [...itemsLocal];
                                          if (
                                            !itemsTemp[index].codeTable.length
                                          ) {
                                            const codeTable =
                                              await getCodeTable(
                                                item.codeTableName
                                              );
                                            itemsTemp[index].codeTable =
                                              codeTable;
                                            setItemsLocal(itemsTemp);
                                          }
                                        }}
                                        filterOptions={filterOptions}
                                        onChange={(e, newValue) => {
                                          setValue(item.label, newValue, true);
                                          const itemsTemp = [...itemsLocal];
                                          itemsTemp[index].value = newValue;
                                          setItemsLocal(itemsTemp);
                                        }}
                                        renderInput={(params, option) => (
                                          <TextField
                                            {...params}
                                            value={item.value}
                                            label={item.label}
                                          />
                                        )}
                                      />
                                      <Typography
                                        color={"#FF4842"}
                                        paddingLeft={"1rem"}
                                        fontSize={"0.75rem"}
                                      >
                                        {get(errors, item.label)?.message}
                                      </Typography>
                                    </>
                                  )}
                                  {item.type === "readonly" && (
                                    <Typography fontWeight={"500"}>
                                      {item.value}
                                    </Typography>
                                  )}
                                </div>
                              )}
                            />
                          </MoveToTopDelayed>
                        </Box>
                      </Stack>
                    </Item>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Divider
              sx={{
                border: "none",
                height: `${items?.length === 1 ? "4rem" : "0px"}`,
              }}
            />
            {(!disableButtons || newFlag) && (
              <Box
                sx={{
                  pb: 1,
                  pr: 1,
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >
                <Button type="submit" size="large" color="primary">
                  {!newFlag ? "UPDATE" : "ADD"}
                </Button>
              </Box>
            )}
          </Card>
        </form>
      </Box>
      <Modal
        open={confOpen}
        onClose={() => {
          setConfOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Opacity>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: `${isDesktop ? "40%" : "95%"}`,
                min: "300",
                bgcolor: "background.paper",
                borderRadius: "10px",
                boxShadow: 24,
                p: 4,
                pb: 2,
                pr: 3,
                "&:focus-visible": {
                  outline: "none",
                },
              }}
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                paddingBottom={2}
              >
                Are you sure you want to delete this item?
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={() => setConfOpen(false)}>CANCEL</Button>
                <Button
                  color="error"
                  size="large"
                  onClick={() => {
                    onDelete(itemID);
                    setConfOpen(false);
                  }}
                >
                  YES
                </Button>
              </Box>
            </Box>
          </Opacity>
        </>
      </Modal>
    </CardLaunch>
  );
}
