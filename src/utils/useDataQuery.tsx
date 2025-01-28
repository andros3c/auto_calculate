import { useMutation } from "@tanstack/react-query";

export const useMutateData = (mutationFn, config = {}) => {
  const mutation = useMutation({ mutationFn, ...config });

  return mutation;
};

//   export const defaultErrorHandler = async error => {
//     const errorMessage = error?.message || "Failed to process data";
//     // if error is 401 (auth related), then do nothing
//     // since it is handled via request.js
//     if (error?.statusCode === 401) {
//       clearToken();
//       await router.push("/");
//       createErrorToast(errorMessage, { toastId: "AUTH_FAILED" });
//       return;
//     }
//     createErrorToast(errorMessage);
//   };
