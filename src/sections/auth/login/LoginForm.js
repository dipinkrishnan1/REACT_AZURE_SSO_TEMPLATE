import { useMsal } from "@azure/msal-react";
import { useState } from "react";
// @mui
import { Button } from "@mui/material";

// components
import { loginRequest } from "src/auth/authConfig";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const [buttonLabel, setButtonLabel] = useState(
    "Login with Mastech Infotrellis Account"
  );
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { instance } = useMsal();

  const handleLogin = () => {
    const loginType = "redirect";
    setButtonLabel("We are signing you in, please wait...");
    setButtonDisabled(true);
    if (loginType === "popup") {
      instance.loginPopup(loginRequest).catch((e) => {
        console.log(e);
      });
    } else if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).catch((e) => {
        console.log(e);
      });
    }
  };

  return (
    <>
      {/* <Stack spacing={3}>
        <TextField name="email" label="Email address" />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack> */}

      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

      <Button
        disabled={buttonDisabled}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleLogin}
      >
        {buttonLabel}
      </Button>
    </>
  );
}
