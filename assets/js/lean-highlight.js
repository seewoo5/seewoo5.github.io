(function () {
  function toSet(words) {
    var set = Object.create(null);
    words.forEach(function (word) {
      set[word] = true;
    });
    return set;
  }

  var keywords = toSet([
    // declarations
    "theorem", "lemma", "def", "abbrev", "class", "structure", "instance",
    "example", "inductive", "axiom", "opaque", "variable", "variables",
    "universe", "universes",
    // commands
    "import", "open", "namespace", "section", "end", "export", "attribute",
    "set_option", "mutual", "deriving", "extends", "notation", "infix",
    "infixl", "infixr", "prefix", "postfix", "macro", "macro_rules", "syntax",
    "elab", "elab_rules", "termination_by", "decreasing_by",
    // modifiers
    "noncomputable", "private", "protected", "partial", "unsafe", "local",
    "scoped",
    // terms
    "by", "where", "match", "with", "fun", "λ", "have", "haveI", "let", "letI",
    "if", "then", "else", "calc", "show", "from", "exact", "suffices", "obtain",
    "do", "return", "for", "in", "at", "using", "only", "generalizing"
  ]);

  var tactics = toSet([
    "abel", "aesop", "all_goals", "any_goals", "apply", "apply_fun",
    "assumption", "bound", "by_cases", "by_contra", "case", "cases", "change",
    "choose", "clear", "congr", "constructor", "continuity", "contradiction",
    "conv", "convert", "decide", "dsimp", "done", "erw", "exact_mod_cast",
    "exacts", "exfalso", "ext", "field_simp", "filter_upwards", "fin_cases",
    "first", "fun_prop", "funext", "gcongr", "generalize", "grind", "group",
    "induction", "infer_instance", "interval_cases", "intro", "intros",
    "iterate", "left", "lia", "lift", "linarith", "linear_combination",
    "measurability", "module", "native_decide", "next", "nlinarith",
    "norm_cast", "norm_num", "nth_rewrite", "nth_rw", "omega", "polyrith",
    "positivity", "push_cast", "push_neg", "rcases", "refine", "rename_i",
    "repeat", "rfl", "right", "ring", "ring_nf", "rintro", "rw", "rwa", "set",
    "simp", "simp_all", "simp_rw", "simpa", "skip", "specialize", "split",
    "subst", "swap", "symm", "tauto", "trans", "trivial", "try", "unfold",
    "use"
  ]);

  function escapeHtml(value) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function span(className, value) {
    return '<span class="' + className + '">' + escapeHtml(value) + '</span>';
  }

  function isWordStart(ch) {
    var code = ch.charCodeAt(0);
    return /[A-Za-z_]/.test(ch) ||
      (code >= 0x0370 && code <= 0x03ff) ||
      (code >= 0x2100 && code <= 0x214f);
  }

  function isWord(ch) {
    return /[A-Za-z0-9_']/.test(ch) || isWordStart(ch);
  }

  function readWord(line, start) {
    var i = start + 1;
    while (i < line.length && isWord(line[i])) {
      i += 1;
    }
    return i;
  }

  function readString(line, start) {
    var i = start + 1;
    while (i < line.length) {
      if (line[i] === "\\" && i + 1 < line.length) {
        i += 2;
      } else if (line[i] === '"') {
        return i + 1;
      } else {
        i += 1;
      }
    }
    return i;
  }

  function highlightLean(code) {
    return code.split("\n").map(function (line) {
      var out = "";
      var i = 0;

      while (i < line.length) {
        var ch = line[i];
        var next = line.slice(i, i + 2);

        if (next === "--") {
          out += span("lean-comment", line.slice(i));
          break;
        }

        if (ch === '"') {
          var stringEnd = readString(line, i);
          out += span("lean-string", line.slice(i, stringEnd));
          i = stringEnd;
          continue;
        }

        if (/[0-9]/.test(ch)) {
          var numberEnd = i + 1;
          while (numberEnd < line.length && /[0-9]/.test(line[numberEnd])) {
            numberEnd += 1;
          }
          out += span("lean-number", line.slice(i, numberEnd));
          i = numberEnd;
          continue;
        }

        // #check, #eval, #print, ...
        if (ch === "#" && i + 1 < line.length && isWordStart(line[i + 1])) {
          var commandEnd = readWord(line, i + 1);
          out += span("lean-keyword", line.slice(i, commandEnd));
          i = commandEnd;
          continue;
        }

        if (isWordStart(ch)) {
          var wordEnd = readWord(line, i);
          var word = line.slice(i, wordEnd);
          // `h.symm`, `Nat.le`: a name after a dot is a projection or
          // namespace member, never a keyword or tactic.
          var afterDot = i > 0 && line[i - 1] === ".";

          if (word === "sorry" || word === "admit") {
            out += span("lean-sorry", word);
          } else if (!afterDot && keywords[word]) {
            out += span("lean-keyword", word);
          } else if (!afterDot && tactics[word]) {
            out += span("lean-tactic", word);
          } else if (/^[A-Z]/.test(word)) {
            out += span("lean-type", word);
          } else {
            out += escapeHtml(word);
          }
          i = wordEnd;
          continue;
        }

        if (/\s/.test(ch)) {
          out += ch;
        } else {
          out += span("lean-operator", ch);
        }
        i += 1;
      }

      return out;
    }).join("\n");
  }

  document.querySelectorAll("pre code.language-lean, pre code.language-lean4").forEach(function (block) {
    if (block.dataset.leanHighlighted === "true") {
      return;
    }
    block.innerHTML = highlightLean(block.textContent);
    block.dataset.leanHighlighted = "true";
    block.classList.add("lean-highlighted");
  });
}());
