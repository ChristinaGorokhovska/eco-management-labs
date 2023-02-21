import { Box, Typography } from "@mui/material";
import Axios from "../config/axiosConfig";
import { useEffect, useState } from "react";
import Header from "../components/Header";

import { useAuthContext } from "../context/AuthProvider";
import UnitsGrid from "../components/UnitsGrid";
import AddUnit from "../components/AddUnit";
import { Container } from "@mui/system";

export default function Home() {
  const [factoryId, setFactoryId] = useState<string>("");
  const [factoryName, setFactoryName] = useState<string>("");
  const [factoryUnits, setFactoryUnits] = useState<any>();
  const { auth } = useAuthContext();

  useEffect(() => {
    (async () => {
      const res = await Axios.get(`/api/units`, { withCredentials: true });
      setFactoryId(res.data.id);
      setFactoryName(res.data.factoryName);
      setFactoryUnits(res.data.units);
    })();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Box marginTop={12}>
          <Typography variant="h5" color={"grey"}>
            Hello, {auth.name.firstName}
          </Typography>
        </Box>

        <Box>
          {factoryName ? (
            <Typography p={2} variant="h4" color={"primary"} textAlign={"center"}>
              {factoryName}
            </Typography>
          ) : (
            <Typography variant="body1">You do not have companies</Typography>
          )}
        </Box>

        <UnitsGrid factoryUnits={factoryUnits}></UnitsGrid>
        {auth.roles.includes(2002) ? <AddUnit factoryId={factoryId}></AddUnit> : null}
      </Container>
    </>
  );
}
