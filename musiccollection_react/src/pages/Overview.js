import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Card,
  Box,
  AppBar,
  Toolbar,
} from "@mui/material";
import musicApi from "../services/music";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../redux/loader/actions";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

const Overview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  const fetchMusicList = useCallback(
    (filterType, search) => {
      dispatch(showLoader());
      musicApi
        .getAllMusicList(filterType, search)
        .then((res) => {
          dispatch(hideLoader());
          setData(res?.data);
        })
        .catch(() => {
          console.error("Failed to fetch data");
          dispatch(hideLoader());
        });
    },
    [dispatch]
  );

  useEffect(() => {
    fetchMusicList(filterType, search);
  }, [filterType, search]);

  const handleDetails = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          color: "black",
          boxShadow: 1,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Typography variant="h6" fontWeight="bold">
            Overview
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ backgroundColor: "#f5f5f5", py: 4, mt: 7 }}>
        <Container maxWidth="xl">
          <Card sx={{ pt: 2, px: 3, boxShadow: 3 }}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mb: 2,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <TextField
                label="Search"
                variant="outlined"
                size="small"
                sx={{
                  width: { xs: "100%", sm: "25%" },
                }}
                onChange={(e) => setSearch(e.target.value)}
              />
              <TextField
                select
                label="Type"
                variant="outlined"
                size="small"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                sx={{
                  width: { xs: "100%", sm: "15%" },
                  minWidth: 150,
                  background: "#E1E4E9",
                }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="EP">EP</MenuItem>
                <MenuItem value="Album">Album</MenuItem>
                <MenuItem value="Single">Single</MenuItem>
              </TextField>
            </Box>

            <TableContainer
              component={Paper}
              sx={{ maxHeight: "70vh", overflowY: "auto" }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#eeeeee" }}>
                    <TableCell
                      sx={{
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#eeeeee",
                        zIndex: 2,
                      }}
                    >
                      <b>Collection Name</b>
                    </TableCell>
                    <TableCell
                      sx={{
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#eeeeee",
                        zIndex: 2,
                      }}
                    >
                      <b>Type</b>
                    </TableCell>
                    <TableCell
                      sx={{
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#eeeeee",
                        zIndex: 2,
                      }}
                    >
                      <b>Song Count</b>
                    </TableCell>
                    <TableCell
                      sx={{
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#eeeeee",
                        zIndex: 2,
                      }}
                    >
                      <b>Duration</b>
                    </TableCell>
                    <TableCell
                      sx={{
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#eeeeee",
                        zIndex: 2,
                      }}
                    >
                      <b>Size</b>
                    </TableCell>
                    <TableCell
                      sx={{
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#eeeeee",
                        zIndex: 2,
                      }}
                    >
                      <b>Released On</b>
                    </TableCell>
                    <TableCell
                      sx={{
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#eeeeee",
                        zIndex: 2,
                      }}
                    >
                      <b>Action</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {row.name} <br />
                        <small style={{ color: "#ada6a5" }}>
                          {row.artist}
                        </small>
                      </TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.songCount}</TableCell>
                      <TableCell>{row.durationInSeconds}</TableCell>
                      <TableCell>{row.sizeInBytes}</TableCell>
                      <TableCell>{row.releasedOn}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "primary.main",
                            cursor: "pointer",
                            "&:hover": { color: "#0f5dab" },
                          }}
                          onClick={() => handleDetails(row.id)}
                        >
                          <VisibilityIcon sx={{ fontSize: 20, mr: 1 }} />
                          <Typography variant="subtitle2">View Details</Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Overview;
