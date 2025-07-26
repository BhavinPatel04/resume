import { route, type RouteConfig } from "@react-router/dev/routes";

export default [
  route(
    "/.well-known/appspecific/com.chrome.devtools.json",
    "routes/[com.chrome.devtools.json].tsx"
  ),
] satisfies RouteConfig;
