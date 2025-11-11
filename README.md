# tree-sitter-rue

Rue grammar for tree-sitter.

## Usage with helix

```toml
# ~/.config/helix/languages.toml

[[language]]
name = "rue"
scope = "source.rue"
injection-regex = "rue"
file-types = ["rue"]
comment-tokens = ["//"]
indent = { tab-width = 4, unit = "    " }

[[grammar]]
name = "rue"
source = { path = "/path/to/tree-sitter-rue" }
```

```sh
tree-sitter generate --abi 14
helix -g build
mkdir -vp ~/.config/helix/runtime/queries/rue
cp -uv queries/* ~/.config/helix/runtime/queries/rue
```
