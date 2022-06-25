import { main } from "./main";

main().catch((e) => {
  console.error(e);
  process.kill(process.pid, "SIGINT");
});
