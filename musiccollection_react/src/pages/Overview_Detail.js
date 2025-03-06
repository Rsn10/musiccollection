import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  AppBar,
  Toolbar,
  Box,
} from "@mui/material";
import musicApi from "../services/music";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../redux/loader/actions";
import { useParams, Link } from "react-router-dom";

const OverviewDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [albumData, setAlbumData] = useState(null);

  const fetchMusicDetails = useCallback(
    (id) => {
      dispatch(showLoader());
      musicApi
        .getMusicDetails(id)
        .then((res) => {
          setAlbumData(res?.data);
          dispatch(hideLoader());
        })
        .catch(() => {
          console.error("Failed to fetch data");
          dispatch(hideLoader());
        });
    },
    [dispatch]
  );

  useEffect(() => {
    fetchMusicDetails(id);
  }, [fetchMusicDetails, id]);

  if (!albumData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Box px={3} py={0.5} sx={{ background: "#f5f5f5" }}>
        <Typography variant="caption" color="textSecondary">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Overview
          </Link>
          &nbsp; &gt; {albumData?.name}
        </Typography>
      </Box>

      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          color: "black",
          boxShadow: 1,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
          >
            {albumData?.name}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <TableContainer component={Paper} sx={{ p: 0, mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ borderBottom: "none", py: 1 }}>
                  <strong>Artist</strong>
                </TableCell>
                <TableCell sx={{ borderBottom: "none", py: 1 }}>
                  <strong>Type</strong>
                </TableCell>
                <TableCell sx={{ borderBottom: "none", py: 1 }}>
                  <strong>Song Count</strong>
                </TableCell>
                <TableCell sx={{ borderBottom: "none", py: 1 }}>
                  <strong>Total Size</strong>
                </TableCell>
                <TableCell sx={{ borderBottom: "none", py: 1 }}>
                  <strong>Total Duration</strong>
                </TableCell>
                <TableCell sx={{ borderBottom: "none", py: 1 }}>
                  <strong>Released On</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ borderBottom: "none", py: 1 }}>
                  {albumData?.artist}
                </TableCell>
                <TableCell sx={{ borderBottom: "none", py: 1 }}>
                  {albumData?.type}
                </TableCell>
                <TableCell sx={{ borderBottom: "none", py: 1 }}>
                  {albumData?.songcount}
                </TableCell>
                <TableCell sx={{ borderBottom: "none", py: 1 }}>
                  {albumData?.sizeInBytes}
                </TableCell>
                <TableCell sx={{ borderBottom: "none", py: 1 }}>
                  {albumData?.durationInSeconds}
                </TableCell>
                <TableCell sx={{ borderBottom: "none", py: 1 }}>
                  {albumData?.released_on}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#F1F5F9" }}>
                <TableCell sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                  <b>Song</b>
                </TableCell>
                <TableCell sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                  <b>Performers</b>
                </TableCell>
                <TableCell sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                  <b>Duration (seconds)</b>
                </TableCell>
                <TableCell sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                  <b>Size</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {albumData?.songs?.map((song, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                    {song?.title}
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                    {song?.performers?.join(", ")}
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                    {song?.durationInSeconds}
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                    {song?.sizeInBytes}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default OverviewDetails;
