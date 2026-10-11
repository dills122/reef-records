# Offline harness correction

Two local harness attempts failed before evaluating launcher logic: raw vm script rejected CommonJS top-level return; CommonJS wrapping then exposed shebang inside function. No package install, provider call or real child process occurred.

Focused alignment: Node CommonJS modules wrap source in function after removing hashbang. Correction matches that loader framing, retains complete launcher code after first hashbang line, and keeps process/fs/child_process mocks. This is harness correction, not evidence of an upstream runtime defect.

Failed commands: node .planning/calcify-p3-overnight/delivery/ocr-install-spike/offline-launcher-proof.cjs; both exit 1, Node v22.23.3. First SyntaxError Illegal return statement; second SyntaxError Invalid or unexpected token at hashbang.
