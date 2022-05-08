import os


def link_str(s):
    date = s.split('_')[-1].split(".")[0]
    ws_str = date
    ws_sol_str = ws_str + "sol"
    ws_link_str = f"[{ws_str}](worksheets/{s})"
    ws_sol_link_str = f"[{ws_sol_str}](worksheets/{s.replace('.', '_sol.')})"
    return ws_link_str, ws_sol_link_str


if __name__ == "__main__":
    ws_files = os.listdir(".")
    ws_files = [f for f in ws_files if f.endswith("pdf")]
    ws_files = [f for f in ws_files if "sol" not in f and "Final" not in f]
    ws_files.sort()
    table = "| | Tue | Tue (sol) | Thu | Thu (sol) |\n"
    table += "| --- | :---: | :---: | :---: | :---: |\n"
    table += f"| Week1 \t| \t| \t| {link_str(ws_files[0])[0]} \t| {link_str(ws_files[0])[1]} \t|\n"
    for i in range(2, 16):
        if i == 10:
            table += f"Week{i} \t| 🏖 | SPRING | BREAK | 🏝 |\n"
        else:
            if i < 10:
                i_ = i
            else:
                i_ = i - 1
            ws1, ws1sol = link_str(ws_files[2 * i_ - 3])
            ws2, ws2sol = link_str(ws_files[2 * i_ - 2])
            table += f"| Week{i} \t| {ws1} \t| {ws1sol} \t| {ws2} \t| {ws2sol} \t|\n"
    table += "| Week16 \t| [FinalReview1](FinalReview1.pdf) | | [FinalReview2](FinalReview2.pdf) | |"
    print(table)
