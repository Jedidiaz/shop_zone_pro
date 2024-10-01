import validateJWT from "./validate-jwt";
import validateFields from "./validate-fields";

export default {
  ...validateJWT,
  ...validateFields,
};
