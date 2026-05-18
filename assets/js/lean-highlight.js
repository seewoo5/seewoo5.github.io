(function () {
  var keywords = {
    theorem: true,
    lemma: true,
    def: true,
    class: true,
    structure: true,
    instance: true,
    example: true,
    inductive: true,
    axiom: true,
    variable: true,
    variables: true,
    universe: true,
    import: true,
    open: true,
    namespace: true,
    section: true,
    end: true,
    by: true,
    where: true,
    match: true,
    with: true,
    fun: true,
    have: true,
    haveI: true,
    let: true,
    if: true,
    then: true,
    else: true,
    calc: true,
    show: true,
    from: true,
    exact: true
  };

  var tactics = {
    apply: true,
    change: true,
    constructor: true,
    convert: true,
    ext: true,
    grind: true,
    intro: true,
    intros: true,
    norm_cast: true,
    norm_num: true,
    omega: true,
    rcases: true,
    refine: true,
    ring: true,
    rintro: true,
    rw: true,
    simp: true,
    simp_all: true
  };

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

        if (isWordStart(ch)) {
          var wordEnd = i + 1;
          while (wordEnd < line.length && isWord(line[wordEnd])) {
            wordEnd += 1;
          }

          var word = line.slice(i, wordEnd);
          if (word === "sorry" || word === "admit") {
            out += span("lean-sorry", word);
          } else if (keywords[word]) {
            out += span("lean-keyword", word);
          } else if (tactics[word]) {
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
