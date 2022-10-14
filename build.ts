#!/usr/bin/env deno run --allow-write
import { stringify as yamlStringify } from "https://deno.land/std@0.82.0/encoding/yaml.ts";
import { labels, variants } from "https://esm.sh/@catppuccin/palette";

Deno.mkdirSync(`./dist`, { recursive: true });

for (let [flavour, colors] of Object.entries(variants)) {
  colors = Object.fromEntries(
    Object.entries(colors).map(([key, value]) => [key, value.hex]),
  );

  const isLatte = flavour === "latte";

  const theme = {
    "background": colors.base,
    "accent": colors.rosewater,
    "foreground": colors.text,
    "details": isLatte ? "lighter" : "darker",
    "terminal_colors": {
      "normal": {
        "black": isLatte ? colors.subtext1 : colors.surface1,
        "red": colors.red,
        "green": colors.green,
        "yellow": colors.yellow,
        "blue": colors.blue,
        "magenta": colors.pink,
        "cyan": colors.teal,
        "white": isLatte ? colors.surface2 : colors.subtext1,
      },
      "bright": {
        "black": isLatte ? colors.subtext0 : colors.surface2,
        "red": colors.red,
        "green": colors.green,
        "yellow": colors.yellow,
        "blue": colors.blue,
        "magenta": colors.pink,
        "cyan": colors.teal,
        "white": isLatte ? colors.surface1 : colors.subtext0,
      },
    },
  };
  Deno.writeTextFileSync(
    `./dist/catppuccin_${flavour}.yml`,
    yamlStringify(theme),
  );
}
