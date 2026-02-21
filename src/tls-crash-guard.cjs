// Preload guard: catch the undici@7.22.0 TLS session resumption crash.
// undici calls TLSSocket.setSession() after the socket handle has been destroyed,
// causing "Cannot read properties of null (reading 'setSession')".
// This is a race condition in undici's connection pool — harmless to suppress.
"use strict";

process.on("uncaughtException", (err) => {
  if (
    err instanceof TypeError &&
    err.message === "Cannot read properties of null (reading 'setSession')" &&
    err.stack &&
    err.stack.includes("_tls_wrap")
  ) {
    // Swallow the TLS session resumption race — the connection will retry.
    console.warn("[tls-crash-guard] Suppressed undici TLS setSession race condition");
    return;
  }
  // Re-throw anything else so the process still crashes on real errors.
  console.error("[uncaughtException]", err);
  process.exit(1);
});
