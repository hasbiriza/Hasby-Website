import { spawn } from "node:child_process";
import { emitKeypressEvents } from "node:readline";
import process from "node:process";

const devArgs = process.argv.slice(2);
const port = getOptionValue(devArgs, ["-p", "--port"]) ?? process.env.PORT ?? "3000";
const url = `http://localhost:${port}`;

const child = spawn(
  process.execPath,
  ["./node_modules/next/dist/bin/next", "dev", ...devArgs],
  {
    cwd: process.cwd(),
    env: process.env,
    stdio: ["inherit", "inherit", "inherit"],
  }
);

let rawModeEnabled = false;

if (process.stdin.isTTY) {
  emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  rawModeEnabled = true;

  process.stdin.on("keypress", (_str, key) => {
    if (!key) {
      return;
    }

    if (key.ctrl && key.name === "c") {
      child.kill("SIGINT");
      return;
    }

    if (key.name === "t") {
      openUrl(url);
    }
  });

  process.stdout.write(`\n[dev-helper] Tekan "t" untuk buka ${url}\n\n`);
}

child.on("exit", (code, signal) => {
  cleanup();

  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});

process.on("SIGINT", () => {
  child.kill("SIGINT");
});

process.on("SIGTERM", () => {
  child.kill("SIGTERM");
});

function cleanup() {
  if (rawModeEnabled && process.stdin.isTTY) {
    process.stdin.setRawMode(false);
    rawModeEnabled = false;
  }
}

function getOptionValue(args, flags) {
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (flags.includes(arg)) {
      return args[index + 1];
    }

    const flag = flags.find((item) => arg.startsWith(`${item}=`));
    if (flag) {
      return arg.slice(flag.length + 1);
    }
  }

  return null;
}

function openUrl(targetUrl) {
  const command =
    process.platform === "darwin"
      ? "open"
      : process.platform === "win32"
        ? "cmd"
        : "xdg-open";

  const args =
    process.platform === "darwin"
      ? [targetUrl]
      : process.platform === "win32"
        ? ["/c", "start", "", targetUrl]
        : [targetUrl];

  const opener = spawn(command, args, {
    detached: true,
    stdio: "ignore",
  });

  opener.on("error", () => {
    process.stderr.write(`[dev-helper] Gagal buka browser otomatis untuk ${targetUrl}\n`);
  });

  opener.unref();
}
