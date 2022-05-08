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
    table += "| Week1 \t| \t| \t| \t| \t|\n"
    for i in range(2, 16):
        if i == 10:
            table += f"Week{i} \t| 🏖 | SPRING | BREAK | 🏝 |\n"
        else:
            if i < 10:
                i_ = i - 1
            else:
                i_ = i - 2
            q1 = f"[Quiz{i_}(1)](quizzes/Quiz{i_}(1).pdf)"
            q1sol = f"[Quiz{i_}(1)sol](quizzes/Quiz{i_}(1)_sol.pdf)"
            q2 = f"[Quiz{i_}(2)](quizzes/Quiz{i_}(2).pdf)"
            q2sol = f"[Quiz{i_}(2)sol](quizzes/Quiz{i_}(2)_sol.pdf)"
            table += f"| Week{i} \t| {q1} \t| {q1sol} \t| {q2} \t| {q2sol} \t|\n"

    print(table)
