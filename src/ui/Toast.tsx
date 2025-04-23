import { Toaster } from "react-hot-toast";

function Toast() {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{ margin: "8px" }}
      toastOptions={{
        success: { duration: 3000 },
        error: { duration: 5000 },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "16px 24px",
        },
        className: `
bg-neutral-03 text-color-grey-800
dark:bg-neutral-07 dark:text-grey-200
transition-all duration-200
`,
      }}
    />
  );
}

export default Toast;
