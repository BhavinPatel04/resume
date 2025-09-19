import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  // index("routes/home/index.tsx"),
  route("resume", "./routes/home/index.tsx"),
] satisfies RouteConfig;
