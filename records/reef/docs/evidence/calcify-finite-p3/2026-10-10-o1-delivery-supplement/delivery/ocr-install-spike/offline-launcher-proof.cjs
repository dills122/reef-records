"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("node:assert/strict");
const source = fs.readFileSync(path.join(__dirname, "npm__package__bin__ocr.js"), "utf8");
function simulate(env) {
  const launches = [];
  const mod = { exports: {} };
  const requireMock = (name) => {
    if (name === "child_process") return { spawn: (binary, args, options) => {
      launches.push({binary, args, detached: options.detached === true, env: options.env});
      return {unref() {}, on() {}, kill() {}};
    }};
    if (name === "path") return path;
    if (name === "fs") return {readFileSync() { throw Error("no hint"); }, statSync() { throw Error("no cooldown"); }, unlinkSync() {}};
    if (name === "os") return {homedir: () => "/mock-home", constants: {signals: {}}};
    if (name === "../scripts/platform") return {resolveNativeBinary: () => ({path: "/mock-native-binary"})};
    if (name === "../package.json") return {version: "1.12.9"};
    if (name === "../scripts/version") return {shouldShowUpdateHint: () => false};
    throw Error("unexpected require " + name);
  };
  requireMock.main = mod;
  vm.runInNewContext("(function(){\n" + source.replace(/^#![^\n]*\n/, "") + "\n})()", {require: requireMock, module: mod, __dirname: "/mock-package/bin", console,
    process: {env, execPath: "/mock-node", argv: ["/mock-node", "/mock-package/bin/ocr.js", "version"], platform: "linux", on() {}, removeListener() {}, exit() {throw Error("unexpected exit"); }}}, {timeout: 1000});
  return launches;
}
const uncontrolled = simulate({});
const pinned = simulate({OCR_NO_UPDATE: "1"});
assert.equal(uncontrolled.length, 2);
assert.equal(uncontrolled[0].detached, true);
assert.equal(uncontrolled[0].args[0], "/mock-package/scripts/update.js");
assert.equal(uncontrolled[0].env.OCR_NO_UPDATE, "1");
assert.equal(pinned.length, 1);
assert.equal(pinned[0].binary, "/mock-native-binary");
assert.equal(pinned[0].env.OCR_NO_UPDATE, "1");
console.log(JSON.stringify({providerCalls: 0, realChildProcesses: 0, networkCalls: 0, defaultLaunches: uncontrolled.length, pinnedLaunches: pinned.length, updaterSuppressed: true}));
