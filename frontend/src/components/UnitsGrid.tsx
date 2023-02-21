import { Container, Box, Typography, Grid, Paper, Card, CardActionArea, CardContent } from "@mui/material";
import { padding } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

export default function UnitsGrid({ factoryUnits }: any) {
  const redirectTo: any = (id: any) => {};
  return (
    <>
      <Container>
        <Box justifyContent={"center"}>
          <Typography m={2} variant="h6" textAlign={"center"} color="grey">
            Units
          </Typography>
          <Box>
            <Grid container spacing={12}>
              {factoryUnits ? (
                factoryUnits.map((unit: any, key: any) => {
                  return (
                    <Grid item xs={4} key={key}>
                      <Card
                        color="green"
                        sx={{
                          backgroundImage: "linear-gradient( 135deg, #97ABFF 10%, #123597 100%)",
                          borderRadius: 4,
                        }}
                      >
                        <Link to={`/units/${unit._id}`} style={{ textDecoration: "none" }}>
                          <CardActionArea onClick={redirectTo(unit._id)}>
                            <CardContent>
                              <Typography color={"white"} variant="h5" py={2} textAlign={"center"}>
                                {unit.name}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Link>
                      </Card>
                    </Grid>
                  );
                })
              ) : (
                <Grid xs={12} item>
                  <Typography variant="body2" textAlign={"center"}>
                    You do not have units
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
