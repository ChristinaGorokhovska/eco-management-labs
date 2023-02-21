import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div>
      <Typography variant={"h5"}>Unauthorized</Typography>
      <Button onClick={goBack}>Go back</Button>
    </div>
  );
}
